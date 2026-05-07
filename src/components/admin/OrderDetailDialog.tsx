import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Package, Clock } from 'lucide-react';
import type { Order } from '@/data/orders';
import { updateOrderStatus } from '@/data/orders';
import { toast } from 'sonner';

interface OrderDetailDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: () => void;
}

const statusColors: Record<string, string> = {
  Pending: 'bg-amber-500/80 hover:bg-amber-500',
  Processing: 'bg-blue-500/80 hover:bg-blue-500',
  Completed: 'bg-emerald-500/80 hover:bg-emerald-500',
  Cancelled: 'bg-red-500/80 hover:bg-red-500',
};

const OrderDetailDialog: React.FC<OrderDetailDialogProps> = ({ order, isOpen, onClose, onStatusChange }) => {
  if (!order) return null;

  const handleStatusChange = (newStatus: Order['status']) => {
    updateOrderStatus(order.id, newStatus);
    toast.success(`Order ${order.id} marked as ${newStatus}`);
    onStatusChange();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{order.id}</span>
            <Badge className={statusColors[order.status]}>
              {order.status}
            </Badge>
          </DialogTitle>
          <DialogDescription className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {order.date}
            </span>
            <span>{order.method}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Info */}
          <div>
            <h4 className="text-sm font-semibold mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>Customer</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
                <span className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>{order.customer.name}</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(var(--primary))' }} />
                <span className="text-sm truncate" style={{ color: 'hsl(var(--muted-foreground))' }}>{order.customer.email}</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(var(--primary))' }} />
                <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{order.customer.phone}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Items */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <Package className="w-4 h-4" /> Items
            </h4>
            <div className="rounded-lg border overflow-hidden" style={{ borderColor: 'hsl(var(--border))' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'hsl(var(--muted) / 0.3)' }}>
                    <th className="text-left px-4 py-2 font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>Item</th>
                    <th className="text-center px-4 py-2 font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>Qty</th>
                    <th className="text-right px-4 py-2 font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>Price</th>
                    <th className="text-right px-4 py-2 font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, idx) => (
                    <tr key={idx} style={{ borderTop: '1px solid hsl(var(--border))' }}>
                      <td className="px-4 py-2" style={{ color: 'hsl(var(--foreground))' }}>{item.name}</td>
                      <td className="text-center px-4 py-2" style={{ color: 'hsl(var(--foreground))' }}>{item.quantity}</td>
                      <td className="text-right px-4 py-2" style={{ color: 'hsl(var(--foreground))' }}>Ksh {item.price}</td>
                      <td className="text-right px-4 py-2 font-medium" style={{ color: 'hsl(var(--foreground))' }}>Ksh {item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <MapPin className="w-4 h-4" /> Delivery Address
            </h4>
            <p className="p-3 rounded-lg" style={{ background: 'hsl(var(--muted) / 0.3)', color: 'hsl(var(--foreground))' }}>
              {order.deliveryAddress}
            </p>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>Total</span>
            <span className="text-2xl font-bold" style={{ color: 'hsl(var(--primary))' }}>Ksh {order.amount.toLocaleString()}</span>
          </div>

          <Separator />

          {/* Status Actions */}
          <div>
            <h4 className="text-sm font-semibold mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>Update Status</h4>
            <div className="flex flex-wrap gap-2">
              {order.status !== 'Pending' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange('Pending')}
                >
                  Pending
                </Button>
              )}
              {order.status !== 'Processing' && order.status !== 'Completed' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange('Processing')}
                  className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
                >
                  Processing
                </Button>
              )}
              {order.status !== 'Completed' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange('Completed')}
                  className="border-emerald-500 text-emerald-500 hover:bg-emerald-500/10"
                >
                  Completed
                </Button>
              )}
              {order.status !== 'Cancelled' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange('Cancelled')}
                  className="border-red-500 text-red-500 hover:bg-red-500/10"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
