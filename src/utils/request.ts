import { API_KEY, API_REQUEST_TIMEOUT_SECS, API_URL } from '@/constants';

interface RequestOptions {
  path: `/${string}`;
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
}

export default async function request<T = void>({ path, method = 'GET', headers }: RequestOptions): Promise<T> {
  const options: RequestInit = {
    method,
    // AbortSignal.timeout is working for modern browsers,
    // if needed to support legacy we can use polyfill, AbortController or any alternative approaches
    signal: AbortSignal.timeout(API_REQUEST_TIMEOUT_SECS),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
  };

  return fetch(`${API_URL}${preparePath(path)}`, options)
    .then((response) => response.json());
}

function preparePath(path: string) {
  const separator = path.includes('?') ? '&' : '?';

  return `${path}${separator}api_key=${API_KEY}`;
}
