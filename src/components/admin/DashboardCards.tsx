import React from 'react';
import { Users, ShoppingBag, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

interface DashboardCardsProps {
  totalCustomers: number;
  ordersToday: number;
  revenue: number;
  growth: number;
  pendingOrders: number;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ totalCustomers, ordersToday, revenue, growth, pendingOrders }) => {
  const stats = [
    {
      title: 'Total Customers',
      value: totalCustomers.toLocaleString(),
      change: 'Registered',
      icon: Users,
      color: 'hsl(var(--primary))'
    },
    {
      title: 'Orders Today',
      value: ordersToday.toString(),
      change: `${pendingOrders} pending`,
      icon: ShoppingBag,
      color: 'hsl(var(--accent))'
    },
    {
      title: 'Revenue',
      value: `Ksh ${revenue.toLocaleString()}`,
      change: 'From completed orders',
      icon: DollarSign,
      color: 'hsl(var(--primary))'
    },
    {
      title: 'Growth',
      value: `${growth}%`,
      change: 'This month',
      icon: TrendingUp,
      color: 'hsl(var(--primary))'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{
            background: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {stat.title}
              </p>
              <p className="text-2xl font-bold mt-1" style={{ color: 'hsl(var(--foreground))' }}>
                {stat.value}
              </p>
              <p className="text-sm mt-1 flex items-center gap-1" style={{ color: pendingOrders > 0 && index === 1 ? '#fbbf24' : 'hsl(var(--accent))' }}>
                {index === 1 && pendingOrders > 0 && <AlertCircle className="w-3 h-3" />}
                {stat.change}
              </p>
            </div>
            <div 
              className="p-3 rounded-lg"
              style={{ background: `${stat.color} / 0.1` }}
            >
              <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
