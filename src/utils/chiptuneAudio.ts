import { BubbleVoiceEffect } from '../types/game';
import { getAssetUrl } from './assetPath';

/**
 * Web Audio API による シリアスSF・観測コンソール SE シンセサイザー ＆ BGM マネージャー
 * - セリフ音はピッチ変化による「ニュン」感を完全に排除し、単一周波数の極短エンベロープ（約10ms）で「カッ」と乾いた打鍵・ノック音で鳴らす
 * - バグ時のノイズは「カシュカシュ」したホワイトノイズを使わず、ノコギリ波の高速ゲートによる「ジジジ」という電気的パルスで表現
 * - 感情ノイズパージは「パシューン」というスイープをやめ、機械的なスイッチタップ音（「カチッ」）に変更
 * - 強制解除（OVERRIDE）は低音の「ブブー」ではなく、可愛くない緊張感のある高めの警告音（「ビーーッ！」）で表現
 */

const DEFAULT_BGM_URL = getAssetUrl('audio/iwashiro_tamashii_no_nitsuke.mp3');
const FIXED_BGM_VOLUME = 0.1; // 10% 固定
const FIXED_SE_VOLUME = 0.45; // 45% 固定

class ChiptuneAudioEngine {
  private ctx: AudioContext | null = null;
  private muted = false;
  private readonly seVolume = FIXED_SE_VOLUME;
  private readonly bgmVolume = FIXED_BGM_VOLUME;

  // BGM (Web Audio API バッファ再生 ＆ HTMLAudioElement バックアップ)
  private currentBgmUrl: string = DEFAULT_BGM_URL;
  private rawBgmArrayBuffer: ArrayBuffer | null = null;
  private bgmAudioBuffer: AudioBuffer | null = null;
  private bgmBufferSource: AudioBufferSourceNode | null = null;
  private bgmGainNode: GainNode | null = null;
  private isFetchingBgm = false;
  private isDecodingBgm = false;

  private bgmAudioEl: HTMLAudioElement | null = null;
  private isPlayingPhase = false;

  // PROTECTロック解除の長押し中に鳴り続ける無機質な高音「ピー」用ノード
  private holdOscMain: OscillatorNode | null = null;
  private holdOscSub: OscillatorNode | null = null;
  private holdGainNode: GainNode | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.preloadBgmData(DEFAULT_BGM_URL);
    }
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if (this.ctx && this.rawBgmArrayBuffer && !this.bgmAudioBuffer && !this.isDecodingBgm) {
      this.decodeLoadedBgmBuffer();
    }
    return this.ctx;
  }

  /**
   * タイトル画面表示中からBGMファイルをバックグラウンドでfetchしてメモリに保持する
   */
  private preloadBgmData(url: string) {
    if (typeof window === 'undefined' || this.isFetchingBgm) return;
    this.isFetchingBgm = true;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.arrayBuffer();
      })
      .then((buf) => {
        this.isFetchingBgm = false;
        if (buf.byteLength > 0) {
          this.rawBgmArrayBuffer = buf;
          if (this.ctx) {
            this.decodeLoadedBgmBuffer();
          }
        }
      })
      .catch(() => {
        this.isFetchingBgm = false;
      });

    if (!this.bgmAudioEl && typeof Audio !== 'undefined') {
      const audio = new Audio(url);
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = this.muted ? 0 : this.bgmVolume;
      this.bgmAudioEl = audio;
    }
  }

  /**
   * 取得したMP3バイナリをWeb Audio APIのAudioBufferにデコードし、PLAYING中なら即再生開始
   */
  private decodeLoadedBgmBuffer() {
    if (!this.ctx || !this.rawBgmArrayBuffer || this.bgmAudioBuffer || this.isDecodingBgm) {
      return;
    }
    this.isDecodingBgm = true;
    const bufferCopy = this.rawBgmArrayBuffer.slice(0);
    this.ctx
      .decodeAudioData(bufferCopy)
      .then((decoded) => {
        this.isDecodingBgm = false;
        this.bgmAudioBuffer = decoded;
        this.syncBgmPlayback();
      })
      .catch(() => {
        this.isDecodingBgm = false;
      });
  }

  /**
   * 滑らかなホワイトノイズバッファ（端末を「サッ」と取り出す動作音専用）
   */
  private createSmoothNoiseBuffer(ctx: AudioContext, durationSec: number): AudioBuffer {
    const length = Math.max(1, Math.floor(ctx.sampleRate * durationSec));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  /**
   * 端末を取り出す・しまうときの「サッ」という衣擦れ・スライド動作音ヘルパー
   */
  private playRustleSwoosh(
    startFreqHz: number,
    peakFreqHz: number,
    endFreqHz: number,
    durationSec = 0.095,
    gainLevel = 0.22
  ) {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const noiseBuffer = this.createSmoothNoiseBuffer(ctx, durationSec);
    const source = ctx.createBufferSource();
    source.buffer = noiseBuffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.Q.setValueAtTime(1.6, now);
    bandpass.frequency.setValueAtTime(startFreqHz, now);
    bandpass.frequency.exponentialRampToValueAtTime(peakFreqHz, now + durationSec * 0.42);
    bandpass.frequency.exponentialRampToValueAtTime(endFreqHz, now + durationSec);

    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(550, now);

    const gain = ctx.createGain();
    const peak = Math.min(1, gainLevel * this.seVolume * 1.9);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(peak, now + durationSec * 0.22);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    source.connect(bandpass);
    bandpass.connect(highpass);
    highpass.connect(gain);
    gain.connect(ctx.destination);

    source.start(now);
    source.stop(now + durationSec + 0.01);
  }

  /**
   * 「ニュン」というピッチ変動を起こさない、「カッ／カチッ」という硬質な単発打鍵・タップ音ヘルパー
   * - 周波数を途中で一切動かさず、0msアタック → 約10msの急峻な指数減衰で「カッ」と切る
   */
  private playHardClack(
    baseHz: number,
    clickResonanceHz: number,
    durationSec = 0.011,
    gainLevel = 0.16
  ) {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const peak = Math.min(1, gainLevel * this.seVolume * 2.0);

    // 1) 音程の芯を作る極短パルス（周波数固定で「ニュン」にならない）
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    bodyOsc.type = 'square';
    bodyOsc.frequency.setValueAtTime(baseHz, now);

    bodyGain.gain.setValueAtTime(peak, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    bodyOsc.connect(bodyGain);
    bodyGain.connect(ctx.destination);
    bodyOsc.start(now);
    bodyOsc.stop(now + durationSec + 0.004);

    // 2) 「カッ」という硬いアタックの輪郭を作る極短インパルス（約5ms）
    const clickOsc = ctx.createOscillator();
    const clickFilter = ctx.createBiquadFilter();
    const clickGain = ctx.createGain();

    clickOsc.type = 'sawtooth';
    clickOsc.frequency.setValueAtTime(clickResonanceHz, now);

    clickFilter.type = 'bandpass';
    clickFilter.frequency.setValueAtTime(clickResonanceHz, now);
    clickFilter.Q.setValueAtTime(2.5, now);

    clickGain.gain.setValueAtTime(peak * 0.85, now);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.0055);

    clickOsc.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start(now);
    clickOsc.stop(now + 0.007);
  }

  // ============================================================================
  // 各種 SE (効果音)
  // ============================================================================

  /** 1. タイトル画面クリック（機械的な2連スイッチ音「カッ・カッ」） */
  public playTitleStart() {
    if (this.muted) return;
    this.playHardClack(466.16, 1500, 0.013, 0.16);
    window.setTimeout(() => {
      this.playHardClack(466.16, 1500, 0.016, 0.18);
    }, 42);
  }

  /** 2. プロローグ・エンディングのテキスト送り音（乾いた「カッ」音） */
  public playTextAdvance() {
    if (this.muted) return;
    this.playHardClack(493.88, 1550, 0.011, 0.13);
  }

  /**
   * 3. セリフ枠（吹き出し）出現時のSE
   * - 周波数を途中で変えない硬質な「カッ」という鳴り方に統一（「ニュン」を排除）
   * - 高さはアッシュ（B4: 493.88Hz）＞ ガイ（F4: 349.23Hz）を維持
   * - ホワイトノイズ（「カシュカシュ」）は一切混ぜず、バグ時のみ「ジジジ」を重ねる
   */
  public playBubblePop(speaker: 'ASCH' | 'GUY', voiceEffect: BubbleVoiceEffect = 'normal') {
    if (this.muted) return;
    const isGlitch =
      voiceEffect === 'glitch' ||
      voiceEffect === 'shout_glitch' ||
      voiceEffect === 'tremble_glitch';
    const isShout = voiceEffect === 'shout' || voiceEffect === 'shout_glitch';
    const isTremble = voiceEffect === 'tremble' || voiceEffect === 'tremble_glitch';

    if (speaker === 'GUY') {
      // ガイ：低めの落ち着いた「カッ／コッ」 (349.23Hz固定)
      this.playHardClack(349.23, 1100, 0.012, 0.16);
      return;
    }

    // アッシュ：ガイより少し高めの硬質な「カッ」 (493.88Hz基準、ホワイトノイズなし)
    if (isShout) {
      // 大声：強く鋭い「カッ！」（カシュカシュ音なし）
      this.playHardClack(554.37, 1850, 0.014, 0.22);
    } else if (isTremble) {
      // 小声・震え：細く控えめな「カッ」
      this.playHardClack(440.0, 1350, 0.01, 0.11);
    } else {
      // 通常のアッシュ：キレのある「カッ」 (493.88Hz固定)
      this.playHardClack(493.88, 1580, 0.011, 0.16);
    }

    // バグ表示（glitch系）のときは「ジジジ」という電気ノイズを重ねる
    if (isGlitch) {
      this.playGlitchDecode();
    }
  }

  /**
   * 4. バグ（glitch）発生時の「ジジジ」という電気接触不良ノイズ
   * - ホワイトノイズ（「カシュカシュ」）を一切使わず、ノコギリ波の細かいパルス断続で「ジジジ」を表現
   */
  public playGlitchDecode() {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    // 18msの細かい電気バズパルスを3連（ジ・ジ・ジ）で鳴らす
    const offsetsMs = [0, 26, 52];
    offsetsMs.forEach((delayMs, idx) => {
      window.setTimeout(() => {
        if (this.muted) return;
        const c = this.ensureContext();
        if (!c) return;

        const now = c.currentTime;
        const dur = 0.017;

        const osc1 = c.createOscillator();
        const osc2 = c.createOscillator();
        const filter = c.createBiquadFilter();
        const gain = c.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'square';

        // 260Hzと278Hzの干渉で「ジッ」という電気的な粒立ちを作る
        const base = idx === 1 ? 240 : 270;
        osc1.frequency.setValueAtTime(base, now);
        osc2.frequency.setValueAtTime(base + 19, now);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1150, now);
        filter.Q.setValueAtTime(2.0, now);

        const peak = Math.min(1, 0.11 * this.seVolume * 1.8);
        gain.gain.setValueAtTime(peak, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(c.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + dur + 0.004);
        osc2.stop(now + dur + 0.004);
      }, delayMs);
    });
  }

  /** 5. ガイの思考選択肢クリック音（不要のため無音） */
  public playChoiceSelect(_mode: 'normal' | 'override' | 'decision' = 'normal') {
    // 選択肢を選んだときの効果音は鳴らさない
  }

  /** 6. データ端末の展開音（「サッ」と端末を取り出す動作音） */
  public playTerminalOpen() {
    if (this.muted) return;
    this.playRustleSwoosh(850, 2100, 1250, 0.095, 0.24);
  }

  /** 7. データ端末の収納音（「サッ」と端末をしまう動作音） */
  public playTerminalClose() {
    if (this.muted) return;
    this.playRustleSwoosh(1800, 1150, 680, 0.09, 0.21);
  }

  /** 8. 端末内のページ切替・ログ開閉クリック（機械的なタップ音「カチッ」） */
  public playTerminalTab() {
    if (this.muted) return;
    this.playHardClack(587.33, 1750, 0.009, 0.12);
  }

  /**
   * 8b. PROTECTロック解除の長押し開始時：長押ししている間ずっと高い音で「ピー」と無機質な音を鳴らし続ける
   */
  public startProtectHoldTone() {
    this.stopProtectHoldTone();
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    const oscMain = ctx.createOscillator();
    const oscSub = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    // 無機質でフラットな高音「ピー」（1174.66Hz [D6] のサイン波＋極薄の矩形波倍音）
    oscMain.type = 'sine';
    oscMain.frequency.setValueAtTime(1174.66, now);

    oscSub.type = 'square';
    oscSub.frequency.setValueAtTime(1174.66, now);

    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.18, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, now);

    const targetGain = Math.min(1, 0.12 * this.seVolume * 1.8);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(targetGain, now + 0.015);

    oscMain.connect(filter);
    oscSub.connect(subGain);
    subGain.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    oscMain.start(now);
    oscSub.start(now);

    this.holdOscMain = oscMain;
    this.holdOscSub = oscSub;
    this.holdGainNode = gain;
  }

  /**
   * 8c. PROTECTロック解除の長押し中断・終了時に「ピー」音を止める
   */
  public stopProtectHoldTone() {
    if (this.holdGainNode && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.holdGainNode.gain. cancelScheduledValues(now);
        this.holdGainNode.gain.setValueAtTime(0.0001, now);
      } catch {
        // ignore
      }
    }
    if (this.holdOscMain) {
      try {
        this.holdOscMain.stop();
        this.holdOscMain.disconnect();
      } catch {
        // ignore
      }
      this.holdOscMain = null;
    }
    if (this.holdOscSub) {
      try {
        this.holdOscSub.stop();
        this.holdOscSub.disconnect();
      } catch {
        // ignore
      }
      this.holdOscSub = null;
    }
    if (this.holdGainNode) {
      try {
        this.holdGainNode.disconnect();
      } catch {
        // ignore
      }
      this.holdGainNode = null;
    }
  }

  /**
   * 8d. PROTECTロック画面の長押しが完了（100%到達）して開いたときの音
   * - 長押し中の高音「ピー」（1174.66Hz）を止め、同じ高さの音で「ビピッ！」と鳴らす
   */
  public playProtectScreenUnlock() {
    this.stopProtectHoldTone();
    if (this.muted) return;

    // 「ピー」が止まったことがはっきり分かるよう極小の隙間（25ms）を空けて、同じ高さ(1174.66Hz)で「ビピッ！」を鳴らす
    window.setTimeout(() => {
      if (this.muted) return;
      const ctx = this.ensureContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const targetHz = 1174.66; // 長押し中の「ピー」と同じ高さ (D6)

      // 1音目：「ビ」（少しエッジのある短いパルス 32ms）
      const osc1Main = ctx.createOscillator();
      const osc1Sub = ctx.createOscillator();
      const filter1 = ctx.createBiquadFilter();
      const gain1 = ctx.createGain();

      osc1Main.type = 'square';
      osc1Main.frequency.setValueAtTime(targetHz, now);
      osc1Sub.type = 'sawtooth';
      osc1Sub.frequency.setValueAtTime(targetHz * 0.96, now); // わずかな干渉で「ビ」の質感を作る

      filter1.type = 'lowpass';
      filter1.frequency.setValueAtTime(2800, now);

      const peak1 = Math.min(1, 0.14 * this.seVolume * 1.8);
      gain1.gain.setValueAtTime(peak1, now);
      gain1.gain.setValueAtTime(peak1 * 0.85, now + 0.024);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);

      osc1Main.connect(filter1);
      osc1Sub.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(ctx.destination);

      osc1Main.start(now);
      osc1Sub.start(now);
      osc1Main.stop(now + 0.035);
      osc1Sub.stop(now + 0.035);

      // 2音目：「ピッ！」（同じ高さ 1174.66Hz のクリアでキレのあるパルス 45ms）
      const secondStart = now + 0.052;
      const osc2Main = ctx.createOscillator();
      const osc2Sub = ctx.createOscillator();
      const subGain2 = ctx.createGain();
      const filter2 = ctx.createBiquadFilter();
      const gain2 = ctx.createGain();

      osc2Main.type = 'sine';
      osc2Main.frequency.setValueAtTime(targetHz, secondStart);
      osc2Sub.type = 'square';
      osc2Sub.frequency.setValueAtTime(targetHz, secondStart);
      subGain2.gain.setValueAtTime(0.28, secondStart);

      filter2.type = 'lowpass';
      filter2.frequency.setValueAtTime(2800, secondStart);

      const peak2 = Math.min(1, 0.16 * this.seVolume * 1.8);
      gain2.gain.setValueAtTime(peak2, secondStart);
      gain2.gain.setValueAtTime(peak2 * 0.9, secondStart + 0.032);
      gain2.gain.exponentialRampToValueAtTime(0.0001, secondStart + 0.045);

      osc2Main.connect(filter2);
      osc2Sub.connect(subGain2);
      subGain2.connect(filter2);
      filter2.connect(gain2);
      gain2.connect(ctx.destination);

      osc2Main.start(secondStart);
      osc2Sub.start(secondStart);
      osc2Main.stop(secondStart + 0.048);
      osc2Sub.stop(secondStart + 0.048);
    }, 25);
  }

  /** 9. 強制解除／パージボタンへのマウスホバー */
  public playHesitationHover() {
    if (this.muted) return;
    this.playHardClack(440.0, 1300, 0.007, 0.07);
  }

  /** 10. 新しいプロテクト発言が端末に記録された時のモニター記録音 */
  public playProtectCaptured() {
    if (this.muted) return;
    this.playHardClack(659.25, 1900, 0.01, 0.13);
    window.setTimeout(() => {
      this.playHardClack(659.25, 1900, 0.012, 0.13);
    }, 34);
  }

  /**
   * 11. プロテクト強制解除（OVERRIDE）実行時の音（通常の選択音と同じにする）
   */
  public playOverrideExecute() {
    if (this.muted) return;
    this.playTerminalTab();
  }

  /**
   * 内部ヘルパー：いまの「ビーーッ！」の質感（矩形波＋ノコギリ波の半音干渉）を維持したまま少し低くしたロック解除・警告ビープ
   */
  private playLoweredWarningBeep(freq1Hz: number, freq2Hz: number, duration = 0.25) {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const beepGain = ctx.createGain();

    osc1.type = 'square';
    osc2.type = 'sawtooth';

    osc1.frequency.setValueAtTime(freq1Hz, now);
    osc2.frequency.setValueAtTime(freq2Hz, now);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(980, now);
    filter.Q.setValueAtTime(1.2, now);

    const peak = Math.min(1, 0.16 * this.seVolume * 1.8);
    beepGain.gain.setValueAtTime(peak, now);
    beepGain.gain.setValueAtTime(peak * 0.9, now + duration * 0.82);
    beepGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(beepGain);
    beepGain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.01);
    osc2.stop(now + duration + 0.01);
  }

  /**
   * 12. 感情ノイズパージ（PURGE）実行時の機械的なタップ音（「カチッ・カッ」）
   * - 「パシューン！」というスイープ音を廃止し、ノイズ低減スイッチを押したような機械的タップ音にする
   */
  public playPurgeExecute() {
    if (this.muted) return;
    this.playHardClack(523.25, 1650, 0.01, 0.16);
    window.setTimeout(() => {
      this.playHardClack(415.3, 1300, 0.013, 0.18);
    }, 30);
  }

  /**
   * 13. 実績解除時の控えめで澄んだ2音システムチャイム
   */
  public playAchievementUnlock() {
    if (this.muted) return;
    this.playHardClack(659.25, 2200, 0.014, 0.16);
    window.setTimeout(() => {
      this.playHardClack(880.0, 2600, 0.018, 0.18);
    }, 55);
  }

  // ============================================================================
  // BGM・SE 一括 ON/OFF 管理（BGM 10%固定・SE 45%固定）
  // ============================================================================

  public setBgmUrl(url: string | null) {
    const targetUrl = url ? getAssetUrl(url) : DEFAULT_BGM_URL;
    if (this.currentBgmUrl === targetUrl && (this.rawBgmArrayBuffer || this.bgmAudioBuffer)) {
      return;
    }
    this.currentBgmUrl = targetUrl;
    this.stopBgmNodes();
    this.rawBgmArrayBuffer = null;
    this.bgmAudioBuffer = null;

    if (this.bgmAudioEl) {
      this.bgmAudioEl.pause();
      this.bgmAudioEl.src = '';
      this.bgmAudioEl = null;
    }

    this.preloadBgmData(targetUrl);
    this.syncBgmPlayback();
  }

  public getBgmUrl(): string | null {
    return this.currentBgmUrl;
  }

  public setPlayingPhase(isPlaying: boolean) {
    if (this.isPlayingPhase === isPlaying) {
      if (isPlaying) {
        this.syncBgmPlayback();
      }
      return;
    }
    this.isPlayingPhase = isPlaying;
    this.syncBgmPlayback();
  }

  /** BGMとSEを一括でミュート／解除する */
  public setAllMuted(muted: boolean) {
    this.muted = muted;
    if (muted) {
      this.stopProtectHoldTone();
    }
    this.updateActiveBgmGain();
    this.syncBgmPlayback();
  }

  public getAllMuted(): boolean {
    return this.muted;
  }

  private updateActiveBgmGain() {
    const targetVol = this.muted ? 0 : this.bgmVolume;
    if (this.bgmGainNode && this.ctx) {
      this.bgmGainNode.gain.setValueAtTime(targetVol, this.ctx.currentTime);
    }
    if (this.bgmAudioEl) {
      this.bgmAudioEl.volume = targetVol;
    }
  }

  private stopBgmNodes() {
    if (this.bgmBufferSource) {
      try {
        this.bgmBufferSource.stop();
        this.bgmBufferSource.disconnect();
      } catch {
        // ignore
      }
      this.bgmBufferSource = null;
    }
    if (this.bgmGainNode) {
      try {
        this.bgmGainNode.disconnect();
      } catch {
        // ignore
      }
      this.bgmGainNode = null;
    }
    if (this.bgmAudioEl) {
      this.bgmAudioEl.pause();
    }
  }

  /**
   * PLAYINGフェーズ中にWeb Audio APIのAudioBufferSourceNodeでBGM（音量10%固定）をループ再生する
   */
  public syncBgmPlayback() {
    if (!this.isPlayingPhase || this.muted) {
      this.stopBgmNodes();
      return;
    }

    const ctx = this.ensureContext();

    if (ctx && this.bgmAudioBuffer) {
      if (this.bgmAudioEl && !this.bgmAudioEl.paused) {
        this.bgmAudioEl.pause();
      }

      if (this.bgmBufferSource && this.bgmGainNode) {
        this.bgmGainNode.gain.setValueAtTime(this.bgmVolume, ctx.currentTime);
        return;
      }

      const source = ctx.createBufferSource();
      source.buffer = this.bgmAudioBuffer;
      source.loop = true;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(this.bgmVolume, ctx.currentTime);

      source.connect(gain);
      gain.connect(ctx.destination);
      source.start(0);

      this.bgmBufferSource = source;
      this.bgmGainNode = gain;
      return;
    }

    if (ctx && this.rawBgmArrayBuffer && !this.isDecodingBgm) {
      this.decodeLoadedBgmBuffer();
    } else if (!this.rawBgmArrayBuffer && !this.isFetchingBgm) {
      this.preloadBgmData(this.currentBgmUrl);
    }

    if (this.bgmAudioEl && this.bgmAudioEl.paused) {
      this.bgmAudioEl.volume = this.bgmVolume;
      this.bgmAudioEl.play().catch(() => {});
    }
  }

  /**
   * ユーザーのクリック操作時にAudioContextを確実に再開し、PLAYING中ならBGMを即座に鳴らす
   */
  public unlockOnUserInteraction() {
    this.ensureContext();
    if (this.isPlayingPhase && !this.muted) {
      this.syncBgmPlayback();
    }
  }
}

export const soundEngine = new ChiptuneAudioEngine();
