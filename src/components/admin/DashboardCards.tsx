import React from 'react';
import { Users, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';

const DashboardCards = () => {
  const stats = [
    {
      title: 'Total Customers',
      value: '1,204',
      change: '+12%',
      icon: Users,
      trend: 'up'
    },
    {
      title: 'Orders Today',
      value: '45',
      change: '+8%',
      icon: ShoppingBag,
      trend: 'up'
    },
    {
      title: 'Revenue',
      value: 'Ksh 89,240',
      change: '+23%',
      icon: DollarSign,
      trend: 'up'
    },
    {
      title: 'Growth',
      value: '15.2%',
      change: '+5%',
      icon: TrendingUp,
      trend: 'up'
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
              <p className="text-sm mt-1" style={{ color: 'hsl(var(--accent))' }}>
                {stat.change} from last month
              </p>
            </div>
            <div 
              className="p-3 rounded-lg"
              style={{ background: 'hsl(var(--accent) / 0.1)' }}
            >
              <stat.icon className="w-6 h-6" style={{ color: 'hsl(var(--accent))' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;