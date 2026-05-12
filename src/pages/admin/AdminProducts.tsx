import React, { useState, useMemo, useCallback } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductFormDialog from '@/components/admin/ProductFormDialog';
import Pagination from '@/components/admin/Pagination';
import { getProducts, addProduct, updateProduct, deleteProduct, exportProductsToCSV } from '@/data/orders';
import type { Product } from '@/data/orders';
import { Download, Plus, Edit, Trash2 } from 'lucide-react';
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
  'In Stock': 'bg-emerald-500/80 hover:bg-emerald-500',
  'Low Stock': 'bg-amber-500/80 hover:bg-amber-500',
  'Out of Stock': 'bg-red-500/80 hover:bg-red-500',
};

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>(getProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const refreshProducts = useCallback(() => {
    setProducts(getProducts());
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const term = searchTerm.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.status.toLowerCase().includes(term) ||
      product.price.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    addProduct(product);
    toast.success('Product added successfully');
    setIsFormOpen(false);
    refreshProducts();
  };

  const handleEditProduct = (product: Omit<Product, 'id'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, product);
      toast.success('Product updated successfully');
      setIsFormOpen(false);
      setEditingProduct(null);
      refreshProducts();
    }
  };

  const handleDeleteProduct = (id: number) => {
    setDeleteTarget(id);
  };

  const confirmDeleteProduct = () => {
    if (deleteTarget === null) return;
    deleteProduct(deleteTarget);
    toast.success('Product deleted');
    setDeleteTarget(null);
    refreshProducts();
  };

  const handleExport = () => {
    exportProductsToCSV();
    toast.success('Products exported to CSV');
  };

  return (
    <AdminLayout
      title={`Products ${searchTerm ? `(${filteredProducts.length} found)` : ''}`}
      description="Manage your product catalog and inventory levels."
      onSearch={handleSearch}
    >
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {filteredProducts.length} total products
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
          <Button size="sm" style={{ background: 'var(--gradient-primary)' }} onClick={() => {
            setEditingProduct(null);
            setIsFormOpen(true);
          }}>
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Button>
        </div>
      </div>

      <div className="backdrop-blur-sm border rounded-xl" style={{
        background: 'hsl(var(--card))',
        borderColor: 'hsl(var(--border))'
      }}>
        <div className="hidden sm:block overflow-x-auto" role="region" aria-label="Products table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px]">Product Name</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">Stock</TableHead>
                <TableHead className="hidden lg:table-cell">Total Sales</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>{product.name}</TableCell>
                    <TableCell className="hidden sm:table-cell" style={{ color: 'hsl(var(--muted-foreground))' }}>{product.category}</TableCell>
                    <TableCell style={{ color: 'hsl(var(--foreground))' }}>{product.price}</TableCell>
                    <TableCell className="hidden md:table-cell" style={{ color: 'hsl(var(--muted-foreground))' }}>{product.stock}</TableCell>
                    <TableCell className="hidden lg:table-cell" style={{ color: 'hsl(var(--muted-foreground))' }}>{product.sales}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[product.status]}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            setEditingProduct(product);
                            setIsFormOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-500"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
                        <svg className="w-8 h-8" style={{ color: 'hsl(var(--muted-foreground))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <p className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                        {searchTerm ? `No products found matching "${searchTerm}"` : 'No products yet'}
                      </p>
                      <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {searchTerm ? 'Try a different search term' : 'Add your first product to start selling'}
                      </p>
                      {!searchTerm && (
                        <button
                          className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:scale-105"
                          style={{ background: 'var(--gradient-primary)' }}
                          onClick={() => { setEditingProduct(null); setIsFormOpen(true); }}
                        >
                          <Plus className="w-4 h-4 mr-1 inline-block" /> Add Your First Product
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="sm:hidden p-4 space-y-3">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-lg p-4 border"
                style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm truncate mr-2" style={{ color: 'hsl(var(--foreground))' }}>{product.name}</span>
                  <Badge className={statusColors[product.status]}>{product.status}</Badge>
                </div>
                <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{product.category}</p>
                <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid hsl(var(--border))' }}>
                  <div>
                    <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{product.stock} in stock · {product.sales} sold</span>
                  </div>
                  <span className="font-semibold text-sm" style={{ color: 'hsl(var(--primary))' }}>{product.price}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    className="flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                    style={{ background: 'hsl(var(--muted) / 0.5)', color: 'hsl(var(--foreground))' }}
                    onClick={() => { setEditingProduct(product); setIsFormOpen(true); }}
                  >
                    <Edit className="w-3 h-3 mr-1 inline-block" /> Edit
                  </button>
                  <button
                    className="flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                    style={{ background: 'hsl(var(--destructive) / 0.15)', color: 'hsl(var(--destructive))' }}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="w-3 h-3 mr-1 inline-block" /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
                  <svg className="w-8 h-8" style={{ color: 'hsl(var(--muted-foreground))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <p className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                  {searchTerm ? `No products found matching "${searchTerm}"` : 'No products yet'}
                </p>
                <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {searchTerm ? 'Try a different search term' : 'Add your first product to start selling'}
                </p>
                {!searchTerm && (
                  <button
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:scale-105"
                    style={{ background: 'var(--gradient-primary)' }}
                    onClick={() => { setEditingProduct(null); setIsFormOpen(true); }}
                  >
                    <Plus className="w-4 h-4 mr-1 inline-block" /> Add Your First Product
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredProducts.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      <ProductFormDialog
        product={editingProduct}
        isOpen={isFormOpen}
        onClose={() => { setIsFormOpen(false); setEditingProduct(null); }}
        onSave={editingProduct ? handleEditProduct : handleAddProduct}
      />

      <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteProduct} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminProducts;
