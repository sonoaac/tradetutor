const API_BASE = import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD ? 'https://api.tradetutor.academy' : '');

export function apiUrl(path: string) {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${API_BASE}${path}`;
}
