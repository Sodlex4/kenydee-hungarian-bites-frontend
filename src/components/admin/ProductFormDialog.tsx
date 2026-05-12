import React, { useState } from 'react';
import ResponsiveModal from '@/components/ResponsiveModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Product } from '@/data/orders';

interface ProductFormDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'>) => void;
}

const ProductFormDialog: React.FC<ProductFormDialogProps> = ({ product, isOpen, onClose, onSave }) => {
  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState(product?.category || '');
  const [price, setPrice] = useState(product?.priceNum?.toString() || '');
  const [stock, setStock] = useState(product?.stock?.toString() || '0');

  const stockNum = parseInt(stock) || 0;
  const getStatus = (s: number): Product['status'] => s > 20 ? 'In Stock' : s > 0 ? 'Low Stock' : 'Out of Stock';
  const formatPrice = (p: number) => `Ksh ${p.toLocaleString()}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseInt(price) || 0;
    onSave({
      name,
      category,
      price: formatPrice(priceNum),
      priceNum,
      stock: stockNum,
      status: getStatus(stockNum),
      sales: product?.sales || 0,
    });
  };

  return (
    <ResponsiveModal open={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6" style={{ color: 'hsl(var(--foreground))' }}>{product ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required style={{
              background: 'hsl(var(--input))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))'
            }} />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 text-sm"
              style={{ background: 'hsl(var(--input))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
            >
              <option value="">Select category</option>
              <option value="Hot Dog Rolls">Hot Dog Rolls</option>
              <option value="Cheese Dogs">Cheese Dogs</option>
              <option value="Chorizo">Chorizo</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (Ksh)</Label>
              <Input id="price" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required style={{
                background: 'hsl(var(--input))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))'
              }} />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} required style={{
                background: 'hsl(var(--input))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))'
              }} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <span>Status:</span>
            <span className="font-medium" style={{
              color: getStatus(stockNum) === 'In Stock' ? '#4ade80' : getStatus(stockNum) === 'Low Stock' ? '#fbbf24' : '#f87171'
            }}>
              {getStatus(stockNum)}
            </span>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={!name || !category || !price} style={{ background: 'var(--gradient-primary)' }}>
              {product ? 'Update' : 'Add'} Product
            </Button>
          </div>
        </form>
      </div>
    </ResponsiveModal>
  );
};

export default ProductFormDialog;
