import React, { useState, useMemo, useCallback } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/admin/AdminLayout';
import CustomerDetailDialog from '@/components/admin/CustomerDetailDialog';
import OrderDetailDialog from '@/components/admin/OrderDetailDialog';
import Pagination from '@/components/admin/Pagination';
import { getCustomers, getCustomerOrders, exportCustomersToCSV, getOrders } from '@/data/orders';
import type { Customer, Order } from '@/data/orders';
import { Download, Eye } from 'lucide-react';
import { toast } from 'sonner';

const ITEMS_PER_PAGE = 10;

const statusColors = {
  Active: 'bg-emerald-500/80 hover:bg-emerald-500',
  Inactive: 'bg-gray-500/80 hover:bg-gray-500',
};

const AdminCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>(getCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomerOrders(getCustomerOrders(customer.name));
    setIsCustomerOpen(true);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderOpen(true);
    setIsCustomerOpen(false);
  };

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return customers;
    const term = searchTerm.toLowerCase();
    return customers.filter(customer =>
      customer.name.toLowerCase().includes(term) ||
      customer.email.toLowerCase().includes(term) ||
      customer.phone.includes(term) ||
      customer.status.toLowerCase().includes(term)
    );
  }, [customers, searchTerm]);

  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleExport = () => {
    exportCustomersToCSV();
    toast.success('Customers exported to CSV');
  };

  return (
    <AdminLayout
      title={`Customers ${searchTerm ? `(${filteredCustomers.length} found)` : ''}`}
      description="Manage your customer base and view their order history."
      onSearch={handleSearch}
    >
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {filteredCustomers.length} total customers
        </p>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="backdrop-blur-sm border rounded-xl overflow-hidden" style={{
        background: 'hsl(var(--card))',
        borderColor: 'hsl(var(--border))'
      }}>
        <div className="overflow-x-auto" role="region" aria-label="Customers table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead className="hidden sm:table-cell">Total Spent</TableHead>
                <TableHead className="hidden lg:table-cell">Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCustomers.length > 0 ? (
                paginatedCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell
                      className="font-medium cursor-pointer hover:underline"
                      style={{ color: 'hsl(var(--foreground))' }}
                      onClick={() => handleViewCustomer(customer)}
                    >
                      {customer.name}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell" style={{ color: 'hsl(var(--muted-foreground))', maxWidth: '160px' }}>{customer.email}</TableCell>
                    <TableCell className="hidden md:table-cell" style={{ color: 'hsl(var(--muted-foreground))' }}>{customer.phone}</TableCell>
                    <TableCell style={{ color: 'hsl(var(--foreground))' }}>{customer.orders}</TableCell>
                    <TableCell className="hidden sm:table-cell" style={{ color: 'hsl(var(--foreground))' }}>{customer.total}</TableCell>
                    <TableCell className="hidden lg:table-cell" style={{ color: 'hsl(var(--muted-foreground))' }}>{customer.joined}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[customer.status]}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleViewCustomer(customer)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    No customers found matching "{searchTerm}"
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredCustomers.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      <CustomerDetailDialog
        customer={selectedCustomer}
        orders={customerOrders}
        isOpen={isCustomerOpen}
        onClose={() => setIsCustomerOpen(false)}
        onViewOrder={handleViewOrder}
      />

      <OrderDetailDialog
        order={selectedOrder}
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        onStatusChange={() => {}}
      />
    </AdminLayout>
  );
};

export default AdminCustomers;
