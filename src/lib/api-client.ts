import { API_URL } from './env';

interface ApiError {
  status: number;
  message: string;
  details?: { path: string; message: string }[];
}

class ApiClientError extends Error {
  public status: number;
  public details?: { path: string; message: string }[];

  constructor(err: ApiError) {
    super(err.message);
    this.name = 'ApiClientError';
    this.status = err.status;
    this.details = err.details;
  }
}

let onUnauthorized: (() => void) | null = null;

export function setOnUnauthorized(cb: () => void): void {
  onUnauthorized = cb;
}

function getToken(): string | null {
  try {
    return sessionStorage.getItem('api-token');
  } catch {
    return null;
  }
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const url = `${API_URL}${path}`;
  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let err: ApiError = { status: res.status, message: res.statusText };
    try {
      const parsed = await res.json();
      err = { status: res.status, message: parsed.error || res.statusText, details: parsed.details };
    } catch {}
    if (res.status === 401) {
      sessionStorage.removeItem('api-token');
      onUnauthorized?.();
    }
    throw new ApiClientError(err);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
  put: <T>(path: string, body?: unknown) => request<T>('PUT', path, body),
  patch: <T>(path: string, body?: unknown) => request<T>('PATCH', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),
};

export { ApiClientError };
export type { ApiError };
