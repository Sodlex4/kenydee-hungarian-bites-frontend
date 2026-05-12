import React, { useState, useMemo, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/admin/AdminLayout';
import Pagination from '@/components/admin/Pagination';
import { getNotifications, markNotificationRead, markAllNotificationsRead, deleteNotification } from '@/data/orders';
import type { Notification } from '@/data/orders';
import { Bell, Package, User, AlertCircle, DollarSign, Check, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const ITEMS_PER_PAGE = 10;

const iconMap: Record<string, React.ElementType> = {
  order: Package,
  user: User,
  alert: AlertCircle,
  payment: DollarSign,
};

const iconColors: Record<string, string> = {
  order: 'hsl(var(--primary))',
  user: 'hsl(var(--accent))',
  alert: '#fbbf24',
  payment: '#4ade80',
};

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(getNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const refreshNotifications = useCallback(() => {
    setNotifications(getNotifications());
  }, []);

  const filteredNotifications = useMemo(() => {
    if (!searchTerm) return notifications;
    const term = searchTerm.toLowerCase();
    return notifications.filter(n =>
      n.title.toLowerCase().includes(term) ||
      n.message.toLowerCase().includes(term) ||
      n.type.toLowerCase().includes(term) ||
      n.time.toLowerCase().includes(term)
    );
  }, [notifications, searchTerm]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const totalPages = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);
  const paginatedNotifications = filteredNotifications.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleMarkRead = (id: number) => {
    markNotificationRead(id);
    refreshNotifications();
  };

  const handleMarkAllRead = () => {
    markAllNotificationsRead();
    toast.success('All notifications marked as read');
    refreshNotifications();
  };

  const handleDelete = (id: number) => {
    setDeleteTarget(id);
  };

  const confirmDeleteNotification = () => {
    if (deleteTarget === null) return;
    deleteNotification(deleteTarget);
    toast.success('Notification deleted');
    setDeleteTarget(null);
    refreshNotifications();
  };

  return (
    <AdminLayout
      title={`Notifications ${searchTerm ? `(${filteredNotifications.length} found)` : `(${unreadCount} unread)`}`}
      description="View all system notifications and customer interactions."
      onSearch={handleSearch}
      notificationCount={unreadCount}
    >
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {filteredNotifications.length} total • {unreadCount} unread
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkAllRead}
          disabled={unreadCount === 0}
        >
          <Check className="w-4 h-4 mr-2" /> Mark all as read
        </Button>
      </div>

      <div className="space-y-3">
        {paginatedNotifications.length > 0 ? (
          paginatedNotifications.map((notification) => {
            const Icon = iconMap[notification.type] || Bell;
            return (
              <div
                key={notification.id}
                className="flex gap-4 p-4 rounded-xl border transition-all duration-200"
                style={{
                  background: !notification.read ? 'hsl(var(--muted) / 0.2)' : 'transparent',
                  borderColor: 'hsl(var(--border))',
                  opacity: notification.read ? 0.7 : 1
                }}
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                    background: `${iconColors[notification.type]} / 0.15`
                  }}>
                    <Icon className="w-5 h-5" style={{ color: iconColors[notification.type] }} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>{notification.title}</h4>
                        <Badge variant="outline" className="text-xs capitalize" style={{ color: iconColors[notification.type], borderColor: `${iconColors[notification.type]} / 0.3` }}>
                          {notification.type}
                        </Badge>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(var(--primary))' }} />
                        )}
                      </div>
                      <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>{notification.message}</p>
                      <p className="text-xs mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>{notification.time}</p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleMarkRead(notification.id)}
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-500"
                        onClick={() => handleDelete(notification.id)}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <Bell className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No notifications</p>
            <p className="text-sm">
              {searchTerm ? `No notifications matching "${searchTerm}"` : 'You\'re all caught up!'}
            </p>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredNotifications.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Notification</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this notification? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteNotification} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminNotifications;
