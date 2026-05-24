import { api, ApiClientError } from './api-client';

interface LoginResponse {
  token: string;
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
    sessionStorage.setItem('api-token', res.token);
    return { success: true };
  } catch (err) {
    if (err instanceof ApiClientError) {
      return { success: false, error: err.message };
    }
    return { success: false, error: 'Network error. Check your connection.' };
  }
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  await api.post('/auth/change-password', { currentPassword, newPassword });
}

export function isAuthenticated(): boolean {
  const token = sessionStorage.getItem('api-token');
  if (!token) return false;
  const payload = decodeToken(token);
  if (!payload) return false;
  return payload.exp * 1000 > Date.now();
}

export function logout(): void {
  sessionStorage.removeItem('api-token');
}
