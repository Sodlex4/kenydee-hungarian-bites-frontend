import React, { useState, useMemo } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import DashboardCards from '../../components/admin/DashboardCards';
import RevenueChart from '../../components/admin/RevenueChart';
import NotificationPanel from '../../components/admin/NotificationPanel';

const recentOrders = [
  { id: 1001, items: '5 Hot Dog Rolls', status: 'Pending' },
  { id: 1002, items: '3 Chorizo Rolls', status: 'Pending' },
  { id: 1003, items: '2 Premium Rolls', status: 'Pending' },
];

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = useMemo(() => {
    if (!searchTerm) return recentOrders;
    const term = searchTerm.toLowerCase();
    return recentOrders.filter(order =>
      order.items.toLowerCase().includes(term) ||
      order.id.toString().includes(term) ||
      order.status.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <AdminLayout
      title="Dashboard Overview"
      description="Welcome back! Here's what's happening with your Hungarian Hot Dog business in Murang'a."
      onSearch={handleSearch}
    >
      <div className="mb-4 p-4 rounded-xl border flex items-center gap-3" style={{
        background: 'hsl(var(--accent) / 0.1)',
        borderColor: 'hsl(var(--accent) / 0.3)'
      }}>
        <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'hsl(var(--accent))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm font-medium" style={{ color: 'hsl(var(--accent))' }}>
          Demo Mode: Showing sample data. Connect a backend to view real orders, customers, and revenue.
        </p>
      </div>

      <div className="space-y-8">
        <DashboardCards />

        <RevenueChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <NotificationPanel />

          <div className="backdrop-blur-sm border rounded-xl p-6" style={{
            background: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))'
          }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>
              Recent Orders {searchTerm && `(${filteredOrders.length} found)`}
            </h3>
            <div className="space-y-3">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-lg" style={{
                    background: 'hsl(var(--muted) / 0.3)'
                  }}>
                    <div>
                      <p className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                        Order #{order.id}
                      </p>
                      <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {order.items}
                      </p>
                    </div>
                    <span className="text-sm font-medium px-2 py-1 rounded" style={{
                      background: 'hsl(var(--accent) / 0.2)',
                      color: 'hsl(var(--accent))'
                    }}>
                      {order.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-center py-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  No orders found matching "{searchTerm}"
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
