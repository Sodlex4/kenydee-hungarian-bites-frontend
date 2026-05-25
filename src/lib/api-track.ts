import { API_URL } from './env';
import type { Order } from './api-orders';

export async function trackOrder(id: string): Promise<Order> {
  const res = await fetch(`${API_URL}/orders/track/${encodeURIComponent(id)}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to look up order' }));
    throw new Error(err.error || 'Order not found');
  }
  return res.json();
}
