import { api } from './api-client';
import type { Order } from './api-orders';

export interface DashboardStats {
  totalCustomers: number;
  ordersToday: number;
  revenue: number;
  growth: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  recentOrders: Order[];
}

interface ApiDashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  pendingOrders: number;
  revenueData: { date: string; revenue: number }[];
  orderStatusData: { status: string; count: number }[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const stats = await api.get<ApiDashboardStats>('/dashboard');
  const orders = await api.get<Order[]>('/orders');
  const today = new Date().toISOString().split('T')[0];
  const ordersToday = orders.filter(o => o.date === today).length;
  const completedOrders = orders.filter(o => o.status === 'Completed').length;
  const cancelledOrders = orders.filter(o => o.status === 'Cancelled').length;

  return {
    totalCustomers: stats.totalCustomers,
    ordersToday,
    revenue: stats.totalRevenue,
    growth: 0,
    pendingOrders: stats.pendingOrders,
    completedOrders,
    cancelledOrders,
    recentOrders: orders.slice(0, 5),
  };
}
