import { useState, useEffect, useRef } from 'react';
import { API_URL } from '@/lib/env';

export interface SSENotification {
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

interface MappedNotification {
  id: number;
  type: 'order' | 'user' | 'alert' | 'payment';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function useNotificationSSE() {
  const [notifications, setNotifications] = useState<MappedNotification[]>([]);
  const [connected, setConnected] = useState(false);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('api-token');
    if (!token) return;

    const url = `${API_URL}/notifications/stream?token=${encodeURIComponent(token)}`;
    const es = new EventSource(url);
    esRef.current = es;

    es.addEventListener('update', (event) => {
      try {
        const data: SSENotification[] = JSON.parse(event.data);
        setNotifications(
          data.map((n) => ({
            ...n,
            type: typeMap[n.type] || 'alert',
          }))
        );
        setConnected(true);
      } catch {
        // ignore parse errors
      }
    });

    es.addEventListener('error', () => {
      setConnected(false);
    });

    return () => {
      es.close();
      esRef.current = null;
      setConnected(false);
    };
  }, []);

  return { notifications, connected };
}
