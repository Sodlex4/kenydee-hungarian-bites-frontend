import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';

const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+254700123456', orders: 12, total: 'Ksh 4,200', joined: '2024-01-15', status: 'Active' },
  { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+254700234567', orders: 8, total: 'Ksh 2,800', joined: '2024-02-20', status: 'Active' },
  { id: 3, name: 'Mike Omondi', email: 'mike@example.com', phone: '+254700345678', orders: 15, total: 'Ksh 5,250', joined: '2024-01-05', status: 'Active' },
  { id: 4, name: 'Grace Wanjiku', email: 'grace@example.com', phone: '+254700456789', orders: 3, total: 'Ksh 1,050', joined: '2024-03-10', status: 'Active' },
  { id: 5, name: 'Peter Kamau', email: 'peter@example.com', phone: '+254700567890', orders: 0, total: 'Ksh 0', joined: '2024-03-15', status: 'Inactive' },
  { id: 6, name: 'Ann Njeri', email: 'ann@example.com', phone: '+254700678901', orders: 6, total: 'Ksh 2,100', joined: '2024-02-01', status: 'Active' },
  { id: 7, name: 'David Mwangi', email: 'david@example.com', phone: '+254700789012', orders: 20, total: 'Ksh 7,000', joined: '2024-01-01', status: 'Active' },
  { id: 8, name: 'Lucy Wambui', email: 'lucy@example.com', phone: '+254700890123', orders: 1, total: 'Ksh 350', joined: '2024-03-12', status: 'Active' },
];

const AdminCustomers = () => {
  return (
    <AdminLayout title="Customers" description="Manage your customer base and view their order history.">
      <div className="backdrop-blur-sm border rounded-xl" style={{
        background: 'hsl(var(--card))',
        borderColor: 'hsl(var(--border))'
      }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>{customer.name}</TableCell>
                <TableCell style={{ color: 'hsl(var(--muted-foreground))' }}>{customer.email}</TableCell>
                <TableCell style={{ color: 'hsl(var(--muted-foreground))' }}>{customer.phone}</TableCell>
                <TableCell style={{ color: 'hsl(var(--foreground))' }}>{customer.orders}</TableCell>
                <TableCell style={{ color: 'hsl(var(--foreground))' }}>{customer.total}</TableCell>
                <TableCell style={{ color: 'hsl(var(--muted-foreground))' }}>{customer.joined}</TableCell>
                <TableCell>
                  <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}
                    className={customer.status === 'Active' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                  >
                    {customer.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;
