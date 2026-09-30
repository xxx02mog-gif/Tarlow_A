/**
 * GitHub Pagesや任意のサブパス環境でも静的アセット（画像・音声）を正しく参照するためのURL解決ユーティリティ
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('data:') || path.startsWith('blob:') || path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
};
