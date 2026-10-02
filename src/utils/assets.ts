/**
 * Centralized Asset URL Resolver
 * Resolves static asset paths safely whether running on localhost or GitHub Pages sub-path.
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  let cleanPath = path.trim();
  while (cleanPath.startsWith('./') || cleanPath.startsWith('/')) {
    if (cleanPath.startsWith('./')) {
      cleanPath = cleanPath.slice(2);
    } else if (cleanPath.startsWith('/')) {
      cleanPath = cleanPath.slice(1);
    }
  }

  // Vite base path is typically './' or '/National-Land-Governance-Platform/'
  const base = (import.meta as any).env?.BASE_URL || './';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${cleanPath}`;
}
