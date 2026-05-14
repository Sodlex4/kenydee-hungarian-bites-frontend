import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Package, User, AlertCircle, DollarSign } from 'lucide-react';
import { getNotifications } from '@/lib/api';
import type { Notification } from '@/lib/api';

const iconMap: Record<string, React.ElementType> = {
  order: Package,
  user: User,
  alert: AlertCircle,
  payment: DollarSign,
};

const NotificationPanel = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    getNotifications().then(result => setNotifications(result.slice(0, 3)));
  }, []);

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
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            const Icon = iconMap[notification.type] || Bell;
            return (
              <div
                key={notification.id}
                className={`flex items-start space-x-3 p-4 rounded-lg transition-colors cursor-pointer hover:scale-105 ${
                  !notification.read ? 'border' : ''
                }`}
                style={{
                  background: !notification.read ? 'hsl(var(--accent) / 0.1)' : 'hsl(var(--muted) / 0.3)',
                  borderColor: !notification.read ? 'hsl(var(--accent) / 0.3)' : 'transparent'
                }}
              >
                <div 
                  className="p-2 rounded-full flex-shrink-0"
                  style={{ background: 'hsl(var(--accent) / 0.2)' }}
                >
                  <Icon className="w-4 h-4" style={{ color: 'hsl(var(--accent))' }} />
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
                {!notification.read && (
                  <div 
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: 'hsl(var(--accent))' }}
                  />
                )}
              </div>
            );
          })
        ) : (
          <p className="text-sm text-center py-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
            No notifications yet
          </p>
        )}
      </div>

      <button 
        onClick={() => navigate('/admin/notifications')}
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