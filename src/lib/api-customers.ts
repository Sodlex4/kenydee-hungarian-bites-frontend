import { api } from './api-client';
import type { Order } from './api-orders';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders: number;
  total: string;
  joined: string;
  status: 'Active' | 'Inactive';
}

interface ApiCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  joined: string;
}

function toFrontendCustomer(api: ApiCustomer, index: number): Customer {
  return {
    id: index + 1,
    name: api.name,
    email: api.email,
    phone: api.phone,
    orders: api.orders,
    total: `Ksh ${api.totalSpent.toLocaleString()}`,
    joined: api.joined,
    status: api.orders > 0 ? 'Active' : 'Inactive',
  };
}

export async function getCustomers(): Promise<Customer[]> {
  const customers = await api.get<ApiCustomer[]>('/customers');
  return customers.map(toFrontendCustomer);
}

export async function getCustomerOrders(name: string): Promise<Order[]> {
  return api.get<Order[]>(`/orders/customer/${encodeURIComponent(name)}`);
}

export async function exportCustomersToCSV(): Promise<void> {
  const customers = await getCustomers();
  const headers = ['Name', 'Email', 'Phone', 'Orders', 'Total Spent', 'Joined', 'Status'];
  const rows = customers.map(c => [c.name, c.email, c.phone, c.orders.toString(), c.total, c.joined, c.status]);
  const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `customers-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
