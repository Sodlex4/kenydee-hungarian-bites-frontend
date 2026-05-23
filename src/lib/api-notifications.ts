import { api } from './api-client';

export interface Notification {
  id: number;
  type: 'order' | 'user' | 'alert' | 'payment';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface ApiNotification {
  id: number;
  type: 'order' | 'info' | 'alert';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const typeMap: Record<string, 'order' | 'user' | 'alert' | 'payment'> = {
  order: 'order',
  info: 'user',
  alert: 'alert',
};

export async function getNotifications(): Promise<Notification[]> {
  const notifications = await api.get<ApiNotification[]>('/notifications');
  return notifications.map(n => ({
    ...n,
    type: typeMap[n.type] || 'alert',
  }));
}

export async function markNotificationRead(id: number): Promise<void> {
  await api.patch(`/notifications/${id}/read`);
}

export async function markAllNotificationsRead(): Promise<void> {
  await api.patch('/notifications/read-all');
}

export async function deleteNotification(id: number): Promise<void> {
  await api.delete(`/notifications/${id}`);
}

export async function addNotification(notification: Omit<Notification, 'id'>): Promise<void> {
  const revType: Record<string, 'order' | 'info' | 'alert'> = {
    order: 'order',
    user: 'info',
    alert: 'alert',
    payment: 'order',
  };
  await api.post('/notifications', {
    ...notification,
    type: revType[notification.type] || 'info',
  });
}
