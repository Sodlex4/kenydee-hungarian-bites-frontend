import React, { useState, useMemo } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';

const orders = [
  { id: '#1234', customer: 'John Doe', items: '5 Hot Dog Rolls', amount: 'Ksh 350', date: '2024-03-15', status: 'Completed', method: 'M-Pesa' },
  { id: '#1235', customer: 'Sarah Wilson', items: '10 Hot Dog Rolls', amount: 'Ksh 650', date: '2024-03-15', status: 'Pending', method: 'M-Pesa' },
  { id: '#1236', customer: 'Mike Omondi', items: '20 Hot Dog Rolls', amount: 'Ksh 1,200', date: '2024-03-14', status: 'Completed', method: 'Cash' },
  { id: '#1237', customer: 'Grace Wanjiku', items: '5 Hot Dog Rolls', amount: 'Ksh 350', date: '2024-03-14', status: 'Cancelled', method: 'M-Pesa' },
  { id: '#1238', customer: 'David Mwangi', items: '10 Hot Dog Rolls', amount: 'Ksh 650', date: '2024-03-13', status: 'Completed', method: 'Cash' },
  { id: '#1239', customer: 'Ann Njeri', items: '20 Hot Dog Rolls', amount: 'Ksh 1,200', date: '2024-03-13', status: 'Pending', method: 'M-Pesa' },
  { id: '#1240', customer: 'Lucy Wambui', items: '5 Hot Dog Rolls', amount: 'Ksh 350', date: '2024-03-12', status: 'Completed', method: 'Cash' },
  { id: '#1241', customer: 'Peter Kamau', items: '10 Hot Dog Rolls', amount: 'Ksh 650', date: '2024-03-12', status: 'Pending', method: 'M-Pesa' },
];

const statusColors: Record<string, string> = {
  Completed: 'bg-emerald-500/80 hover:bg-emerald-500',
  Pending: 'bg-amber-500/80 hover:bg-amber-500',
  Cancelled: 'bg-red-500/80 hover:bg-red-500',
};

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;
    const term = searchTerm.toLowerCase();
    return orders.filter(order =>
      order.id.toLowerCase().includes(term) ||
      order.customer.toLowerCase().includes(term) ||
      order.items.toLowerCase().includes(term) ||
      order.status.toLowerCase().includes(term) ||
      order.method.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <AdminLayout
      title={`Orders ${searchTerm ? `(${filteredOrders.length} found)` : ''}`}
      description="Track and manage all incoming orders."
      onSearch={handleSearch}
    >
      <div className="backdrop-blur-sm border rounded-xl overflow-hidden" style={{
        background: 'hsl(var(--card))',
        borderColor: 'hsl(var(--border))'
      }}>
        <div className="overflow-x-auto" role="region" aria-label="Orders table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead className="hidden sm:table-cell">Customer</TableHead>
                <TableHead className="hidden md:table-cell">Items</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="hidden lg:table-cell">Payment</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>{order.id}</TableCell>
                    <TableCell className="hidden sm:table-cell" style={{ color: 'hsl(var(--muted-foreground))' }}>{order.customer}</TableCell>
                    <TableCell className="hidden md:table-cell" style={{ color: 'hsl(var(--muted-foreground))' }}>{order.items}</TableCell>
                    <TableCell className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>{order.amount}</TableCell>
                    <TableCell className="hidden sm:table-cell" style={{ color: 'hsl(var(--muted-foreground))' }}>{order.date}</TableCell>
                    <TableCell className="hidden lg:table-cell" style={{ color: 'hsl(var(--muted-foreground))' }}>{order.method}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    No orders found matching "{searchTerm}"
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

export default AdminOrders;
