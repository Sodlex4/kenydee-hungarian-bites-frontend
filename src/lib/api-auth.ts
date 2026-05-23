import { api } from './api-client';

interface LoginResponse {
  token: string;
  user: { email: string; role: string };
}

export async function login(email: string, password: string): Promise<boolean> {
  try {
    const res = await api.post<LoginResponse>('/auth/login', { email, password });
    sessionStorage.setItem('api-token', res.token);
    sessionStorage.setItem('admin-auth', 'true');
    return true;
  } catch {
    return false;
  }
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  await api.post('/auth/change-password', { currentPassword, newPassword });
}

export function isAuthenticated(): boolean {
  return !!sessionStorage.getItem('api-token');
}

export function logout(): void {
  sessionStorage.removeItem('api-token');
  sessionStorage.removeItem('admin-auth');
}
