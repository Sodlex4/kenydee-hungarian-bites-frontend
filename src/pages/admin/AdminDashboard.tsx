import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import DashboardCards from '../../components/admin/DashboardCards';
import NotificationPanel from '../../components/admin/NotificationPanel';

const AdminDashboard = () => {
  return (
    <AdminLayout title="Dashboard Overview" description="Welcome back! Here's what's happening with your Hungarian Hot Dog business in Murang'a.">
      <div className="space-y-8">
        <DashboardCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <NotificationPanel />

          <div className="backdrop-blur-sm border rounded-xl p-6" style={{
            background: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))'
          }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>
              Recent Orders
            </h3>
            <div className="space-y-3">
              {[1, 2, 3].map((order) => (
                <div key={order} className="flex items-center justify-between p-3 rounded-lg" style={{
                  background: 'hsl(var(--muted) / 0.3)'
                }}>
                  <div>
                    <p className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                      Order #{1000 + order}
                    </p>
                    <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {order === 1 ? '5 Hot Dog Rolls' : order === 2 ? '3 Chorizo Rolls' : '2 Premium Rolls'}
                    </p>
                  </div>
                  <span className="text-sm font-medium px-2 py-1 rounded" style={{
                    background: 'hsl(var(--accent) / 0.2)',
                    color: 'hsl(var(--accent))'
                  }}>
                    Pending
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
