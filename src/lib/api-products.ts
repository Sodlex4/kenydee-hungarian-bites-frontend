import { api } from './api-client';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  priceNum: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  sales: number;
}

interface ApiProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  createdAt: string;
}

function toFrontendProduct(api: ApiProduct): Product {
  return {
    id: api.id,
    name: api.name,
    category: api.category,
    price: `Ksh ${api.price.toLocaleString()}`,
    priceNum: api.price,
    stock: api.stock,
    status: api.stock === 0 ? 'Out of Stock' : api.stock <= 20 ? 'Low Stock' : 'In Stock',
    sales: 0,
  };
}

export async function getProducts(): Promise<Product[]> {
  const products = await api.get<ApiProduct[]>('/products');
  return products.map(toFrontendProduct);
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<void> {
  await api.post('/products', {
    name: product.name,
    price: product.priceNum,
    category: product.category,
    stock: product.stock,
  });
}

export async function updateProduct(id: number, updates: Partial<Product>): Promise<void> {
  const payload: Record<string, unknown> = {};
  if (updates.name !== undefined) payload.name = updates.name;
  if (updates.priceNum !== undefined) payload.price = updates.priceNum;
  if (updates.category !== undefined) payload.category = updates.category;
  if (updates.stock !== undefined) payload.stock = updates.stock;
  await api.put(`/products/${id}`, payload);
}

export async function deleteProduct(id: number): Promise<void> {
  await api.delete(`/products/${id}`);
}

export async function exportProductsToCSV(): Promise<void> {
  const products = await getProducts();
  const headers = ['Product Name', 'Category', 'Price', 'Stock', 'Status', 'Total Sales'];
  const rows = products.map(p => [p.name, p.category, p.price, p.stock.toString(), p.status, p.sales.toString()]);
  const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `products-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
