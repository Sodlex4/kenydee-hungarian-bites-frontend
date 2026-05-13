import React, { useState, useMemo, useCallback } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import DashboardCards from '../../components/admin/DashboardCards';
import RevenueChart from '../../components/admin/RevenueChart';
import NotificationPanel from '../../components/admin/NotificationPanel';
import OrderDetailDialog from '@/components/admin/OrderDetailDialog';
import { useApiData } from '@/hooks/useApiData';
import { getDashboardStats, getNotifications } from '@/lib/api';
import type { Order, DashboardStats } from '@/lib/api';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: stats, refresh: refreshStats } = useApiData(getDashboardStats, {} as DashboardStats);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const refreshData = useCallback(async () => {
    await refreshStats();
    const allNotifications = await getNotifications();
    const unread = allNotifications.filter(n => !n.read).length;
    setNotificationCount(unread);
  }, [refreshStats]);

  const filteredOrders = useMemo(() => {
    const orders = stats.recentOrders;
    if (!searchTerm) return orders;
    const term = searchTerm.toLowerCase();
    return orders.filter(order =>
      order.items.some(i => i.name.toLowerCase().includes(term)) ||
      order.id.toLowerCase().includes(term) ||
      order.status.toLowerCase().includes(term)
    );
  }, [searchTerm, stats.recentOrders]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  return (
    <AdminLayout
      title="Dashboard Overview"
      description="Welcome back! Here's what's happening with your Hungarian Hot Dog business in Murang'a."
      onSearch={handleSearch}
      notificationCount={notificationCount}
    >
      <div className="mb-4 p-4 rounded-xl border flex items-center gap-3" style={{
        background: 'hsl(var(--accent) / 0.1)',
        borderColor: 'hsl(var(--accent) / 0.3)'
      }}>
        <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'hsl(var(--accent))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm font-medium" style={{ color: 'hsl(var(--accent))' }}>
          Demo Mode: Data is stored locally. Connect a backend to sync real orders, customers, and revenue.
        </p>
      </div>

      <div className="space-y-8">
        <DashboardCards
          totalCustomers={stats.totalCustomers}
          ordersToday={stats.ordersToday}
          revenue={stats.revenue}
          growth={stats.growth}
          pendingOrders={stats.pendingOrders}
        />

        <RevenueChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <NotificationPanel />

          <div className="backdrop-blur-sm border rounded-xl p-6" style={{
            background: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))'
          }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-between" style={{ color: 'hsl(var(--foreground))' }}>
              <span>Recent Orders</span>
              <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {searchTerm ? `${filteredOrders.length} found` : `${stats.recentOrders.length} total`}
              </span>
            </h3>
            <div className="space-y-3">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const statusColors: Record<string, string> = {
                    Pending: 'bg-amber-500/80',
                    Processing: 'bg-blue-500/80',
                    Completed: 'bg-emerald-500/80',
                    Cancelled: 'bg-red-500/80',
                  };
                  return (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      style={{ background: 'hsl(var(--muted) / 0.3)' }}
                      onClick={() => handleViewOrder(order)}
                    >
                      <div>
                        <p className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                          Order {order.id}
                        </p>
                        <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          {order.customer.name} • {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold" style={{ color: 'hsl(var(--primary))' }}>Ksh {order.amount}</span>
                        <Badge className={statusColors[order.status]}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-center py-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  No orders found matching "{searchTerm}"
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <OrderDetailDialog
        order={selectedOrder}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onStatusChange={refreshData}
      />
    </AdminLayout>
  );
};

export default AdminDashboard;
