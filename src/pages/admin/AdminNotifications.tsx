import React, { useState, useMemo } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Bell, Package, User, AlertCircle, DollarSign } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const notifications = [
  { id: 1, type: 'order', title: 'New Order Received', message: 'Order #1234 from John Doe - 5 Hot Dog Rolls', time: '2 min ago', read: false },
  { id: 2, type: 'user', title: 'New Customer Registration', message: 'Sarah Wilson just signed up for an account', time: '10 min ago', read: false },
  { id: 3, type: 'alert', title: 'Low Stock Alert', message: 'Hungarian Hot Dog Rolls (20 Pack) - Only 15 left', time: '1 hour ago', read: false },
  { id: 4, type: 'order', title: 'Order Completed', message: 'Order #1230 delivered successfully', time: '2 hours ago', read: true },
  { id: 5, type: 'payment', title: 'Payment Received', message: 'Ksh 650 from David Mwangi via M-Pesa', time: '3 hours ago', read: true },
  { id: 6, type: 'alert', title: 'Product Review', message: 'New 5-star review on Hungarian Hot Dog Rolls', time: '5 hours ago', read: true },
  { id: 7, type: 'user', title: 'Customer Feedback', message: 'Grace Wanjiku left a comment: "Amazing quality!"', time: '6 hours ago', read: true },
  { id: 8, type: 'order', title: 'Order Cancelled', message: 'Order #1237 was cancelled by the customer', time: '1 day ago', read: true },
];

const iconMap: Record<string, React.ElementType> = {
  order: Package,
  user: User,
  alert: AlertCircle,
  payment: DollarSign,
};

const AdminNotifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationsData, setNotificationsData] = useState(notifications);

  const filteredNotifications = useMemo(() => {
    if (!searchTerm) return notificationsData;
    const term = searchTerm.toLowerCase();
    return notificationsData.filter(notification =>
      notification.title.toLowerCase().includes(term) ||
      notification.message.toLowerCase().includes(term) ||
      notification.type.toLowerCase().includes(term) ||
      notification.time.toLowerCase().includes(term)
    );
  }, [searchTerm, notificationsData]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const markAsRead = (id: number) => {
    setNotificationsData(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotificationsData(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationsData(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notificationsData.filter(n => !n.read).length;

  return (
    <AdminLayout
      title={`Notifications ${searchTerm ? `(${filteredNotifications.length} found)` : `(${unreadCount} unread)`}`}
      description="View all system notifications and customer interactions."
      onSearch={handleSearch}
      notificationCount={unreadCount}
    >
      <div className="flex justify-end mb-4">
        <button
          onClick={markAllAsRead}
          className="text-sm px-4 py-2 rounded-lg transition-colors hover:bg-muted"
          style={{ color: 'hsl(var(--primary))' }}
          disabled={unreadCount === 0}
        >
          Mark all as read
        </button>
      </div>
      <div className="backdrop-blur-sm border rounded-xl overflow-hidden" style={{
        background: 'hsl(var(--card))',
        borderColor: 'hsl(var(--border))'
      }}>
        <div className="overflow-x-auto" role="region" aria-label="Notifications table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead className="min-w-[120px]">Notification</TableHead>
                <TableHead className="hidden sm:table-cell min-w-[180px]">Message</TableHead>
                <TableHead className="hidden md:table-cell">Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => {
                  const Icon = iconMap[notification.type] || Bell;
                  return (
                    <TableRow
                      key={notification.id}
                      className={!notification.read ? 'font-medium bg-muted/30' : ''}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(var(--primary))' }} />
                          <span className="capitalize hidden sm:inline" style={{ color: 'hsl(var(--muted-foreground))' }}>{notification.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>{notification.title}</TableCell>
                      <TableCell className="hidden sm:table-cell" style={{ color: 'hsl(var(--muted-foreground))', maxWidth: '250px' }}>{notification.message}</TableCell>
                      <TableCell className="hidden md:table-cell" style={{ color: 'hsl(var(--muted-foreground))', fontSize: '12px' }}>{notification.time}</TableCell>
                      <TableCell>
                        <Badge className={!notification.read ? 'bg-pink-500/80 hover:bg-pink-500' : 'bg-gray-500/80 hover:bg-gray-500'}>
                          {!notification.read ? 'Unread' : 'Read'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs px-2 py-1 rounded hover:bg-muted transition-colors"
                              style={{ color: 'hsl(var(--primary))' }}
                            >
                              Mark read
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-xs px-2 py-1 rounded hover:bg-destructive/20 transition-colors"
                            style={{ color: 'hsl(var(--destructive))' }}
                          >
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    No notifications found matching "{searchTerm}"
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNotifications;
