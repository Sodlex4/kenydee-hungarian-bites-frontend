import { api, ApiClientError, setRefreshHandler } from './api-client';
import { API_URL } from './env';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: { email: string; role: string };
}

function decodeToken(token: string): { exp: number } | null {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await api.post<LoginResponse>('/auth/login', { email, password });
    sessionStorage.setItem('api-token', res.accessToken);
    sessionStorage.setItem('refresh-token', res.refreshToken);
    return { success: true };
  } catch (err) {
    if (err instanceof ApiClientError) {
      return { success: false, error: err.message };
    }
    return { success: false, error: 'Network error. Check your connection.' };
  }
}

export async function refreshAccessToken(): Promise<string | null> {
  const token = sessionStorage.getItem('refresh-token');
  if (!token) return null;
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: token }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    sessionStorage.setItem('api-token', data.accessToken);
    sessionStorage.setItem('refresh-token', data.refreshToken);
    return data.accessToken;
  } catch {
    return null;
  }
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  await api.post('/auth/change-password', { currentPassword, newPassword });
}

export function isAuthenticated(): boolean {
  const token = sessionStorage.getItem('api-token');
  if (token) {
    const payload = decodeToken(token);
    if (payload && payload.exp * 1000 > Date.now()) return true;
  }
  return !!sessionStorage.getItem('refresh-token');
}

export function logout(): void {
  sessionStorage.removeItem('api-token');
  sessionStorage.removeItem('refresh-token');
}

setRefreshHandler(refreshAccessToken);
