import React from 'react';
import { Bell, Package, User, AlertCircle } from 'lucide-react';

const NotificationPanel = () => {
  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'Order #1234 from John Doe - 5 Hot Dog Rolls',
      time: '2 minutes ago',
      icon: Package,
      unread: true
    },
    {
      id: 2,
      type: 'user',
      title: 'New Customer Registration',
      message: 'Sarah Wilson just signed up',
      time: '10 minutes ago',
      icon: User,
      unread: true
    },
    {
      id: 3,
      type: 'alert',
      title: 'Low Stock Alert',
      message: 'Hungarian Hot Dog Rolls - Only 5 left',
      time: '1 hour ago',
      icon: AlertCircle,
      unread: false
    }
  ];

  return (
    <div className="backdrop-blur-sm border rounded-xl p-6" style={{
      background: 'hsl(var(--card))',
      borderColor: 'hsl(var(--border))'
    }}>
      <div className="flex items-center space-x-2 mb-6">
        <Bell className="w-5 h-5" style={{ color: 'hsl(var(--accent))' }} />
        <h3 className="text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
          Recent Notifications
        </h3>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start space-x-3 p-4 rounded-lg transition-colors cursor-pointer hover:scale-105 ${
              notification.unread ? 'border' : ''
            }`}
            style={{
              background: notification.unread ? 'hsl(var(--accent) / 0.1)' : 'hsl(var(--muted) / 0.3)',
              borderColor: notification.unread ? 'hsl(var(--accent) / 0.3)' : 'transparent'
            }}
          >
            <div 
              className="p-2 rounded-full flex-shrink-0"
              style={{ background: 'hsl(var(--accent) / 0.2)' }}
            >
              <notification.icon className="w-4 h-4" style={{ color: 'hsl(var(--accent))' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                {notification.title}
              </p>
              <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {notification.message}
              </p>
              <p className="text-xs mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {notification.time}
              </p>
            </div>
            {notification.unread && (
              <div 
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: 'hsl(var(--accent))' }}
              />
            )}
          </div>
        ))}
      </div>

      <button 
        className="w-full mt-4 py-2 text-sm font-medium rounded-lg transition-colors hover:scale-105"
        style={{
          background: 'hsl(var(--accent) / 0.1)',
          color: 'hsl(var(--accent))'
        }}
      >
        View All Notifications
      </button>
    </div>
  );
};

export default NotificationPanel;