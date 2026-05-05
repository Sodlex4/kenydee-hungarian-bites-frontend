import React, { useState, useMemo } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';

const products = [
  { id: 1, name: 'Hungarian Hot Dog Rolls - 5 Pack', category: 'Hot Dog Rolls', price: 'Ksh 350', stock: 120, status: 'In Stock', sales: 340 },
  { id: 2, name: 'Hungarian Hot Dog Rolls - 10 Pack', category: 'Hot Dog Rolls', price: 'Ksh 650', stock: 85, status: 'In Stock', sales: 256 },
  { id: 3, name: 'Hungarian Hot Dog Rolls - 20 Pack', category: 'Hot Dog Rolls', price: 'Ksh 1,200', stock: 15, status: 'Low Stock', sales: 189 },
  { id: 4, name: 'Cheese Dog Bread Rolls', category: 'Cheese Dogs', price: 'Ksh 400', stock: 95, status: 'In Stock', sales: 120 },
  { id: 5, name: 'Chorizo Hot Dog Rolls', category: 'Chorizo', price: 'Ksh 450', stock: 0, status: 'Out of Stock', sales: 78 },
  { id: 6, name: 'Premium Hungarian Rolls', category: 'Premium', price: 'Ksh 500', stock: 45, status: 'In Stock', sales: 95 },
];

const statusColors: Record<string, string> = {
  'In Stock': 'bg-emerald-500/80 hover:bg-emerald-500',
  'Low Stock': 'bg-amber-500/80 hover:bg-amber-500',
  'Out of Stock': 'bg-red-500/80 hover:bg-red-500',
};

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const term = searchTerm.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.status.toLowerCase().includes(term) ||
      product.price.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <AdminLayout
      title={`Products ${searchTerm ? `(${filteredProducts.length} found)` : ''}`}
      description="Manage your product catalog and inventory levels."
      onSearch={handleSearch}
    >
      <div className="backdrop-blur-sm border rounded-xl overflow-hidden" style={{
        background: 'hsl(var(--card))',
        borderColor: 'hsl(var(--border))'
      }}>
        <div className="overflow-x-auto" role="region" aria-label="Products table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px]">Product Name</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">Stock</TableHead>
                <TableHead className="hidden lg:table-cell">Total Sales</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
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
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    No products found matching "{searchTerm}"
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

export default AdminProducts;
