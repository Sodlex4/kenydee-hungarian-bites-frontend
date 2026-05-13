import { useState, useMemo, useCallback } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/admin/AdminLayout';
import OrderDetailDialog from '@/components/admin/OrderDetailDialog';
import Pagination from '@/components/admin/Pagination';
import { updateOrderStatus, deleteOrder, exportOrdersToCSV, getOrders } from '@/data/orders';
import type { Order } from '@/data/orders';
import { Download, MoreVertical, Eye, Trash2 } from 'lucide-react';
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

const statusColors: Record<string, string> = {
  Completed: 'bg-emerald-500/80 hover:bg-emerald-500',
  Pending: 'bg-amber-500/80 hover:bg-amber-500',
  Processing: 'bg-blue-500/80 hover:bg-blue-500',
  Cancelled: 'bg-red-500/80 hover:bg-red-500',
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>(getOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const refreshOrders = useCallback(() => {
    setOrders(getOrders());
  }, []);

  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;
    const term = searchTerm.toLowerCase();
    return orders.filter(order =>
      order.id.toLowerCase().includes(term) ||
      order.customer.name.toLowerCase().includes(term) ||
      order.items.some(i => i.name.toLowerCase().includes(term)) ||
      order.status.toLowerCase().includes(term) ||
      (order.method?.toLowerCase() ?? '').includes(term)
    );
  }, [orders, searchTerm]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const handleStatusChange = (id: string, status: Order['status']) => {
    updateOrderStatus(id, status);
    toast.success(`Order ${id} marked as ${status}`);
    refreshOrders();
  };

  const handleDeleteOrder = (id: string) => {
    setDeleteTarget(id);
  };

  const confirmDeleteOrder = () => {
    if (deleteTarget === null) return;
    deleteOrder(deleteTarget);
    toast.success(`Order ${deleteTarget} deleted`);
    setDeleteTarget(null);
    refreshOrders();
  };

  const handleExport = () => {
    exportOrdersToCSV();
    toast.success('Orders exported to CSV');
  };

  return (
    <AdminLayout
      title={`Orders ${searchTerm ? `(${filteredOrders.length} found)` : ''}`}
      description="Track and manage all incoming orders."
      onSearch={handleSearch}
    >
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {filteredOrders.length} total orders
        </p>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="backdrop-blur-sm border rounded-xl" style={{
        background: 'hsl(var(--card))',
        borderColor: 'hsl(var(--border))'
      }}>
        <div className="hidden sm:block overflow-x-auto" role="region" aria-label="Orders table">
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
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell
                      className="font-medium cursor-pointer hover:underline"
                      style={{ color: 'hsl(var(--foreground))' }}
                      onClick={() => handleViewOrder(order)}
                    >
                      {order.id}
                    </TableCell>
                    <TableCell
                      className="hidden sm:table-cell cursor-pointer"
                      style={{ color: 'hsl(var(--muted-foreground))' }}
                      onClick={() => handleViewOrder(order)}
                    >
                      {order.customer.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </TableCell>
                    <TableCell className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Ksh {order.amount}</TableCell>
                    <TableCell className="hidden sm:table-cell" style={{ color: 'hsl(var(--muted-foreground))' }}>{order.date}</TableCell>
                    <TableCell className="hidden lg:table-cell" style={{ color: 'hsl(var(--muted-foreground))' }}>{order.method}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Badge className={`${statusColors[order.status]} cursor-pointer`}>
                            {order.status} ▾
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {order.status !== 'Pending' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Pending')}>Set Pending</DropdownMenuItem>
                          )}
                          {order.status !== 'Processing' && order.status !== 'Completed' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Processing')}>Set Processing</DropdownMenuItem>
                          )}
                          {order.status !== 'Completed' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Completed')}>Set Completed</DropdownMenuItem>
                          )}
                          {order.status !== 'Cancelled' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Cancelled')} className="text-red-500">Cancel</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                            <Eye className="w-4 h-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteOrder(order.id)} className="text-red-500">
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
                        <svg className="w-8 h-8" style={{ color: 'hsl(var(--muted-foreground))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <p className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                        {searchTerm ? `No orders found matching "${searchTerm}"` : 'No orders yet'}
                      </p>
                      <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {searchTerm ? 'Try a different search term' : 'Orders will appear here once customers start ordering'}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="sm:hidden p-4 space-y-3">
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-lg p-4 border cursor-pointer transition-colors"
                style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                onClick={() => handleViewOrder(order)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm" style={{ color: 'hsl(var(--foreground))' }}>{order.id}</span>
                  <Badge className={statusColors[order.status]}>{order.status}</Badge>
                </div>
                <p className="text-sm font-medium truncate" style={{ color: 'hsl(var(--muted-foreground))' }}>{order.customer.name}</p>
                <p className="text-xs truncate mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>{order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</p>
                <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid hsl(var(--border))' }}>
                  <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{order.date} · {order.method}</span>
                  <span className="font-semibold text-sm" style={{ color: 'hsl(var(--primary))' }}>Ksh {order.amount}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
                  <svg className="w-8 h-8" style={{ color: 'hsl(var(--muted-foreground))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                  {searchTerm ? `No orders found matching "${searchTerm}"` : 'No orders yet'}
                </p>
                <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {searchTerm ? 'Try a different search term' : 'Orders will appear here once customers start ordering'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredOrders.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      <OrderDetailDialog
        order={selectedOrder}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onStatusChange={refreshOrders}
      />

      <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete order {deleteTarget}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteOrder} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminOrders;
