import { useState, useMemo } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/admin/AdminLayout';
import CustomerDetailDialog from '@/components/admin/CustomerDetailDialog';
import OrderDetailDialog from '@/components/admin/OrderDetailDialog';
import Pagination from '@/components/admin/Pagination';
import { useApiData } from '@/hooks/useApiData';
import { getCustomers, getCustomerOrders, exportCustomersToCSV } from '@/lib/api';
import type { Customer, Order } from '@/lib/api';
import { Download, Eye } from 'lucide-react';
import { toast } from 'sonner';

const ITEMS_PER_PAGE = 10;

const statusColors = {
  Active: 'bg-emerald-500/80 hover:bg-emerald-500',
  Inactive: 'bg-gray-500/80 hover:bg-gray-500',
};

const AdminCustomers = () => {
  const { data: customers } = useApiData(getCustomers, [] as Customer[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);

  const handleViewCustomer = async (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomerOrders(await getCustomerOrders(customer.name));
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

  const handleExport = async () => {
    await exportCustomersToCSV();
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

      <div className="backdrop-blur-sm border rounded-xl" style={{
        background: 'hsl(var(--card))',
        borderColor: 'hsl(var(--border))'
      }}>
        <div className="hidden sm:block overflow-x-auto" role="region" aria-label="Customers table">
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
                  <TableCell colSpan={8} className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
                        <svg className="w-8 h-8" style={{ color: 'hsl(var(--muted-foreground))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <p className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                        {searchTerm ? `No customers found matching "${searchTerm}"` : 'No customers yet'}
                      </p>
                      <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {searchTerm ? 'Try a different search term' : 'Customer profiles will appear here after they place orders'}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="sm:hidden p-4 space-y-3">
          {paginatedCustomers.length > 0 ? (
            paginatedCustomers.map((customer) => (
              <div
                key={customer.id}
                className="rounded-lg p-4 border cursor-pointer transition-colors"
                style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                onClick={() => handleViewCustomer(customer)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm" style={{ color: 'hsl(var(--foreground))' }}>{customer.name}</span>
                  <Badge className={statusColors[customer.status]}>{customer.status}</Badge>
                </div>
                <p className="text-xs truncate" style={{ color: 'hsl(var(--muted-foreground))' }}>{customer.email}</p>
                <p className="text-xs truncate mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>{customer.phone}</p>
                <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid hsl(var(--border))' }}>
                  <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{customer.orders} orders · Since {customer.joined}</span>
                  <span className="font-semibold text-sm" style={{ color: 'hsl(var(--primary))' }}>{customer.total}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
                  <svg className="w-8 h-8" style={{ color: 'hsl(var(--muted-foreground))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                  {searchTerm ? `No customers found matching "${searchTerm}"` : 'No customers yet'}
                </p>
                <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {searchTerm ? 'Try a different search term' : 'Customer profiles will appear here after they place orders'}
                </p>
              </div>
            </div>
          )}
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
