import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const ROOT_ALLOWED_FILENAMES = new Set([
  'test.png',
  'tanmatu.png',
  'test_look_away.png',
  'test_glare.png',
  'test_shock.png',
  'test_pain.png',
  'test_empty.png',
]);

const PART_FILENAME_REGEX =
  /^(base|brow_[a-z0-9_]+|eye_[a-z0-9_]+|mouth_[a-z0-9_]+|fx_[a-z0-9_]+)\.png$/;

const AUDIO_EXT_REGEX = /\.(mp3|ogg|wav|m4a)$/i;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  const publicDir = path.join(process.cwd(), 'public');
  const imagesDir = path.join(publicDir, 'images');
  const partsDir = path.join(imagesDir, 'parts');
  const audioDir = path.join(publicDir, 'audio');

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  if (!fs.existsSync(partsDir)) {
    fs.mkdirSync(partsDir, { recursive: true });
  }
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  // /public 配下の静的ファイル（/audio/*.mp3 や /images/*.png）を直接配信
  app.use(express.static(publicDir));

  // 実際に存在する画像・音声ファイル一覧を返すAPI（404による立ち絵のチラつき・遅延を防止＆BGM自動検出）
  app.get('/api/available-assets', (_req, res) => {
    try {
      const rootFiles = fs.existsSync(imagesDir)
        ? fs
            .readdirSync(imagesDir)
            .filter((f) => f.toLowerCase().endsWith('.png'))
        : [];
      const partFiles = fs.existsSync(partsDir)
        ? fs
            .readdirSync(partsDir)
            .filter((f) => f.toLowerCase().endsWith('.png'))
        : [];

      // /public/audio/、/public/、/public/images/ 内の有効な音声ファイル（0バイト以外）を検出
      const audioUrls: string[] = [];
      if (fs.existsSync(audioDir)) {
        fs.readdirSync(audioDir)
          .filter((f) => {
            if (!AUDIO_EXT_REGEX.test(f)) return false;
            try {
              return fs.statSync(path.join(audioDir, f)).size > 0;
            } catch {
              return false;
            }
          })
          .forEach((f) => audioUrls.push(`/audio/${f}`));
      }
      if (fs.existsSync(publicDir)) {
        fs.readdirSync(publicDir)
          .filter((f) => {
            if (!AUDIO_EXT_REGEX.test(f)) return false;
            try {
              return fs.statSync(path.join(publicDir, f)).size > 0;
            } catch {
              return false;
            }
          })
          .forEach((f) => audioUrls.push(`/${f}`));
      }
      if (fs.existsSync(imagesDir)) {
        fs.readdirSync(imagesDir)
          .filter((f) => {
            if (!AUDIO_EXT_REGEX.test(f)) return false;
            try {
              return fs.statSync(path.join(imagesDir, f)).size > 0;
            } catch {
              return false;
            }
          })
          .forEach((f) => audioUrls.push(`/images/${f}`));
      }

      // bgm.* という名前のファイルを最優先に並べる
      audioUrls.sort((a, b) => {
        const aIsBgm = a.toLowerCase().includes('bgm') ? 0 : 1;
        const bIsBgm = b.toLowerCase().includes('bgm') ? 0 : 1;
        return aIsBgm - bIsBgm;
      });

      res.json({ rootFiles, partFiles, audioUrls });
    } catch {
      res.json({
        rootFiles: ['test.png', 'tanmatu.png'],
        partFiles: [],
        audioUrls: [],
      });
    }
  });

  // BGM音声ファイルを /public/audio/bgm.mp3 等として保存するAPI
  app.post('/api/save-audio', (req, res) => {
    try {
      const { filename, dataUrl } = req.body as {
        filename?: string;
        dataUrl?: string;
      };

      if (!dataUrl || typeof dataUrl !== 'string') {
        res.status(400).json({ error: 'Missing dataUrl' });
        return;
      }

      const extMatch = (filename || 'bgm.mp3').match(/\.(mp3|ogg|wav|m4a)$/i);
      const ext = extMatch ? extMatch[1].toLowerCase() : 'mp3';
      const safeName = `bgm.${ext}`;

      const matches = dataUrl.match(/^data:audio\/[^;]+;base64,(.+)$/) ||
        dataUrl.match(/^data:application\/octet-stream;base64,(.+)$/);
      if (!matches || !matches[1]) {
        res.status(400).json({ error: 'Invalid audio dataUrl format' });
        return;
      }

      const buffer = Buffer.from(matches[1], 'base64');
      const targetPath = path.join(audioDir, safeName);
      fs.writeFileSync(targetPath, buffer);

      res.json({
        ok: true,
        path: `/audio/${safeName}`,
      });
    } catch (err) {
      console.error('Failed to save audio:', err);
      res.status(500).json({ error: 'Failed to save audio' });
    }
  });

  // 画像アセットをプロジェクト内の /public/images/ または /public/images/parts/ に直接保存するAPI
  app.post('/api/save-asset', (req, res) => {
    try {
      const { filename, dataUrl } = req.body as {
        filename?: string;
        dataUrl?: string;
      };

      if (!filename) {
        res.status(400).json({ error: 'Missing filename' });
        return;
      }

      const lowerName = filename.toLowerCase();
      const isRootAllowed = ROOT_ALLOWED_FILENAMES.has(lowerName);
      const isPartAllowed = PART_FILENAME_REGEX.test(lowerName);

      if (!isRootAllowed && !isPartAllowed) {
        res.status(400).json({ error: 'Invalid filename' });
        return;
      }

      if (!dataUrl || typeof dataUrl !== 'string') {
        res.status(400).json({ error: 'Missing dataUrl' });
        return;
      }

      const matches = dataUrl.match(/^data:image\/[a-zA-Z0-9.+-]+;base64,(.+)$/);
      if (!matches || !matches[1]) {
        res.status(400).json({ error: 'Invalid image dataUrl format' });
        return;
      }

      const buffer = Buffer.from(matches[1], 'base64');
      const targetPath = isPartAllowed
        ? path.join(partsDir, lowerName)
        : path.join(imagesDir, lowerName);

      fs.writeFileSync(targetPath, buffer);

      res.json({
        ok: true,
        path: isPartAllowed ? `/images/parts/${lowerName}` : `/images/${lowerName}`,
      });
    } catch (err) {
      console.error('Failed to save asset:', err);
      res.status(500).json({ error: 'Failed to save asset' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
