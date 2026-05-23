import { api } from './api-client';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  amount: number;
  date: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  method?: 'M-Pesa' | 'Cash';
  deliveryAddress: string;
}

export async function getOrders(): Promise<Order[]> {
  return api.get<Order[]>('/orders');
}

export async function getOrder(id: string): Promise<Order> {
  return api.get<Order>(`/orders/${id}`);
}

export async function addOrder(order: Order): Promise<Order> {
  return api.post<Order>('/orders', order);
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<void> {
  await api.patch(`/orders/${id}/status`, { status });
}

export async function deleteOrder(id: string): Promise<void> {
  await api.delete(`/orders/${id}`);
}

export async function getCustomerOrders(customerName: string): Promise<Order[]> {
  return api.get<Order[]>(`/orders/customer/${encodeURIComponent(customerName)}`);
}

export async function exportOrdersToCSV(): Promise<void> {
  const orders = await getOrders();
  const headers = ['Order ID', 'Customer', 'Email', 'Phone', 'Items', 'Amount', 'Date', 'Status', 'Method', 'Delivery Address'];
  const rows = orders.map(o => [
    o.id, o.customer.name, o.customer.email, o.customer.phone,
    o.items.map(i => `${i.quantity}x ${i.name}`).join('; '),
    o.amount.toString(), o.date, o.status, o.method || '', o.deliveryAddress,
  ]);
  const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(','))].join('\n');
  downloadCSV(csv, `orders-${new Date().toISOString().split('T')[0]}.csv`);
}

function downloadCSV(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
