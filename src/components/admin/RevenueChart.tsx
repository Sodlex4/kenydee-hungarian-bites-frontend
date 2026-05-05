
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { day: 'Mon', revenue: 1400, orders: 4 },
  { day: 'Tue', revenue: 2100, orders: 6 },
  { day: 'Wed', revenue: 1800, orders: 5 },
  { day: 'Thu', revenue: 2800, orders: 8 },
  { day: 'Fri', revenue: 3500, orders: 10 },
  { day: 'Sat', revenue: 4200, orders: 12 },
  { day: 'Sun', revenue: 3100, orders: 9 },
];

const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
const totalOrders = revenueData.reduce((sum, d) => sum + d.orders, 0);
const bestDay = revenueData.reduce((max, d) => d.revenue > max.revenue ? d : max, revenueData[0]);

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded-lg border shadow-lg" style={{
        background: 'hsl(var(--card))',
        borderColor: 'hsl(var(--border))'
      }}>
        <p className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>{payload[0].payload.day}</p>
        <p style={{ color: 'hsl(var(--primary))' }}>Revenue: Ksh {payload[0].value.toLocaleString()}</p>
        <p style={{ color: 'hsl(var(--muted-foreground))' }}>Orders: {payload[0].payload.orders}</p>
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  return (
    <div className="backdrop-blur-sm border rounded-xl p-6" style={{
      background: 'hsl(var(--card))',
      borderColor: 'hsl(var(--border))'
    }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
            Revenue This Week
          </h3>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Mon - Sun overview
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold" style={{ color: 'hsl(var(--primary))' }}>
            Ksh {totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {totalOrders} orders • Best: {bestDay.day} (Ksh {bestDay.revenue.toLocaleString()})
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={revenueData}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(330 80% 60%)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(330 80% 60%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
          <XAxis
            dataKey="day"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <YAxis
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            tickFormatter={(value: number) => `Ksh ${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
