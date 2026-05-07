import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail } from 'lucide-react';
import type { Order, Customer } from '@/data/orders';

interface CustomerDetailDialogProps {
  customer: Customer | null;
  orders: Order[];
  isOpen: boolean;
  onClose: () => void;
  onViewOrder: (order: Order) => void;
}

const statusColors: Record<string, string> = {
  Completed: 'bg-emerald-500/80 hover:bg-emerald-500',
  Pending: 'bg-amber-500/80 hover:bg-amber-500',
  Processing: 'bg-blue-500/80 hover:bg-blue-500',
  Cancelled: 'bg-red-500/80 hover:bg-red-500',
};

const CustomerDetailDialog: React.FC<CustomerDetailDialogProps> = ({ customer, orders, isOpen, onClose, onViewOrder }) => {
  if (!customer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
        <DialogHeader>
          <DialogTitle>{customer.name}</DialogTitle>
          <DialogDescription className="flex flex-wrap gap-4">
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" /> {customer.email}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" /> {customer.phone}
            </span>
          </DialogDescription>
        </DialogHeader>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg text-center" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
            <p className="text-2xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>{customer.orders}</p>
            <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Total Orders</p>
          </div>
          <div className="p-3 rounded-lg text-center" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
            <p className="text-2xl font-bold" style={{ color: 'hsl(var(--primary))' }}>{customer.total}</p>
            <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Total Spent</p>
          </div>
          <div className="p-3 rounded-lg text-center" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
            <p className="text-sm font-bold" style={{ color: 'hsl(var(--foreground))' }}>{customer.joined}</p>
            <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Joined</p>
          </div>
        </div>

        {/* Order History */}
        <div>
          <h4 className="text-sm font-semibold mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>Order History ({orders.length})</h4>
          {orders.length > 0 ? (
            <div className="rounded-lg border overflow-hidden" style={{ borderColor: 'hsl(var(--border))' }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow
                      key={order.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => onViewOrder(order)}
                    >
                      <TableCell className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>{order.id}</TableCell>
                      <TableCell className="hidden sm:table-cell" style={{ color: 'hsl(var(--muted-foreground))' }}>{order.date}</TableCell>
                      <TableCell style={{ color: 'hsl(var(--primary))' }}>Ksh {order.amount}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[order.status]}>{order.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center py-6" style={{ color: 'hsl(var(--muted-foreground))' }}>No orders found for this customer.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailDialog;
