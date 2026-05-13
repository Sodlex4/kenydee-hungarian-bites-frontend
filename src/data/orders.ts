import { WHATSAPP_NUMBER, CONTACT_EMAIL, SITE_URL } from '../lib/env';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  amount: number;
  date: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  method?: 'M-Pesa' | 'Cash';
  deliveryAddress: string;
}

const ORDERS_STORAGE_KEY = 'hb-admin-orders';

const seedOrders: Order[] = [
  {
    id: '#1234',
    customer: { name: 'John Doe', email: 'john@example.com', phone: '+254700123456' },
    items: [{ name: '5 Hot Dog Rolls', quantity: 1, price: 350 }],
    amount: 350,
    date: '2024-03-15',
    status: 'Completed',
    method: 'M-Pesa',
    deliveryAddress: 'Murang\'a Town, Near Post Office'
  },
  {
    id: '#1235',
    customer: { name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+254700234567' },
    items: [{ name: '10 Hot Dog Rolls', quantity: 1, price: 650 }],
    amount: 650,
    date: '2024-03-15',
    status: 'Pending',
    method: 'M-Pesa',
    deliveryAddress: 'Kahuro Street, Murang\'a'
  },
  {
    id: '#1236',
    customer: { name: 'Mike Omondi', email: 'mike@example.com', phone: '+254700345678' },
    items: [{ name: '20 Hot Dog Rolls', quantity: 1, price: 1200 }],
    amount: 1200,
    date: '2024-03-14',
    status: 'Completed',
    method: 'Cash',
    deliveryAddress: 'Kangari Road, Murang\'a'
  },
  {
    id: '#1237',
    customer: { name: 'Grace Wanjiku', email: 'grace@example.com', phone: '+254700456789' },
    items: [{ name: '5 Hot Dog Rolls', quantity: 1, price: 350 }],
    amount: 350,
    date: '2024-03-14',
    status: 'Cancelled',
    method: 'M-Pesa',
    deliveryAddress: 'Kamacharia, Murang\'a'
  },
  {
    id: '#1238',
    customer: { name: 'David Mwangi', email: 'david@example.com', phone: '+254700567890' },
    items: [{ name: '10 Hot Dog Rolls', quantity: 1, price: 650 }],
    amount: 650,
    date: '2024-03-13',
    status: 'Completed',
    method: 'Cash',
    deliveryAddress: 'Gatugura, Murang\'a'
  },
  {
    id: '#1239',
    customer: { name: 'Ann Njeri', email: 'ann@example.com', phone: '+254700678901' },
    items: [{ name: '20 Hot Dog Rolls', quantity: 1, price: 1200 }],
    amount: 1200,
    date: '2024-03-13',
    status: 'Pending',
    method: 'M-Pesa',
    deliveryAddress: 'Murang\'a Town Center'
  },
  {
    id: '#1240',
    customer: { name: 'Lucy Wambui', email: 'lucy@example.com', phone: '+254700789012' },
    items: [{ name: '5 Hot Dog Rolls', quantity: 1, price: 350 }],
    amount: 350,
    date: '2024-03-12',
    status: 'Completed',
    method: 'Cash',
    deliveryAddress: 'Kiharu, Murang\'a'
  },
  {
    id: '#1241',
    customer: { name: 'Peter Kamau', email: 'peter@example.com', phone: '+254700890123' },
    items: [{ name: '10 Hot Dog Rolls', quantity: 1, price: 650 }],
    amount: 650,
    date: '2024-03-12',
    status: 'Pending',
    method: 'M-Pesa',
    deliveryAddress: 'Mathioya Road, Murang\'a'
  },
];

export const getOrders = (): Order[] => {
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(seedOrders));
      return seedOrders;
    }
    return JSON.parse(stored);
  } catch {
    return seedOrders;
  }
};

export const updateOrderStatus = (id: string, status: Order['status']): void => {
  const orders = getOrders();
  const updated = orders.map(o => o.id === id ? { ...o, status } : o);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
};

export const deleteOrder = (id: string): void => {
  const orders = getOrders();
  const updated = orders.filter(o => o.id !== id);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
};

export const addOrder = (order: Order): void => {
  const orders = getOrders();
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([order, ...orders]));
};

export const getCustomerOrders = (customerName: string): Order[] => {
  const orders = getOrders();
  return orders.filter(o => o.customer.name.toLowerCase() === customerName.toLowerCase());
};

export const exportOrdersToCSV = (): void => {
  const orders = getOrders();
  const headers = ['Order ID', 'Customer', 'Items', 'Amount', 'Date', 'Status', 'Payment Method'];
  const rows = orders.map(o => [
    o.id,
    o.customer.name,
    o.items.map(i => `${i.quantity}x ${i.name}`).join('; '),
    `Ksh ${o.amount}`,
    o.date,
    o.status,
    o.method
  ]);
  const csvContent = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

// --- Customers ---

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders: number;
  total: string;
  joined: string;
  status: 'Active' | 'Inactive';
}

const CUSTOMERS_STORAGE_KEY = 'hb-admin-customers';

const seedCustomers: Customer[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+254700123456', orders: 12, total: 'Ksh 4,200', joined: '2024-01-15', status: 'Active' },
  { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+254700234567', orders: 8, total: 'Ksh 2,800', joined: '2024-02-20', status: 'Active' },
  { id: 3, name: 'Mike Omondi', email: 'mike@example.com', phone: '+254700345678', orders: 15, total: 'Ksh 5,250', joined: '2024-01-05', status: 'Active' },
  { id: 4, name: 'Grace Wanjiku', email: 'grace@example.com', phone: '+254700456789', orders: 3, total: 'Ksh 1,050', joined: '2024-03-10', status: 'Active' },
  { id: 5, name: 'Peter Kamau', email: 'peter@example.com', phone: '+254700567890', orders: 0, total: 'Ksh 0', joined: '2024-03-15', status: 'Inactive' },
  { id: 6, name: 'Ann Njeri', email: 'ann@example.com', phone: '+254700678901', orders: 6, total: 'Ksh 2,100', joined: '2024-02-01', status: 'Active' },
  { id: 7, name: 'David Mwangi', email: 'david@example.com', phone: '+254700789012', orders: 20, total: 'Ksh 7,000', joined: '2024-01-01', status: 'Active' },
  { id: 8, name: 'Lucy Wambui', email: 'lucy@example.com', phone: '+254700890123', orders: 1, total: 'Ksh 350', joined: '2024-03-12', status: 'Active' },
];

export const getCustomers = (): Customer[] => {
  try {
    const stored = localStorage.getItem(CUSTOMERS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(seedCustomers));
      return seedCustomers;
    }
    return JSON.parse(stored);
  } catch {
    return seedCustomers;
  }
};

export const exportCustomersToCSV = (): void => {
  const customers = getCustomers();
  const headers = ['Name', 'Email', 'Phone', 'Orders', 'Total Spent', 'Joined', 'Status'];
  const rows = customers.map(c => [c.name, c.email, c.phone, c.orders.toString(), c.total, c.joined, c.status]);
  const csvContent = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `customers-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

// --- Products ---

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

const PRODUCTS_STORAGE_KEY = 'hb-admin-products';

const seedProducts: Product[] = [
  { id: 1, name: 'Hungarian Hot Dog Rolls - 5 Pack', category: 'Hot Dog Rolls', price: 'Ksh 350', priceNum: 350, stock: 120, status: 'In Stock', sales: 340 },
  { id: 2, name: 'Hungarian Hot Dog Rolls - 10 Pack', category: 'Hot Dog Rolls', price: 'Ksh 650', priceNum: 650, stock: 85, status: 'In Stock', sales: 256 },
  { id: 3, name: 'Hungarian Hot Dog Rolls - 20 Pack', category: 'Hot Dog Rolls', price: 'Ksh 1,200', priceNum: 1200, stock: 15, status: 'Low Stock', sales: 189 },
  { id: 4, name: 'Cheese Dog Bread Rolls', category: 'Cheese Dogs', price: 'Ksh 400', priceNum: 400, stock: 95, status: 'In Stock', sales: 120 },
  { id: 5, name: 'Chorizo Hot Dog Rolls', category: 'Chorizo', price: 'Ksh 450', priceNum: 450, stock: 0, status: 'Out of Stock', sales: 78 },
  { id: 6, name: 'Premium Hungarian Rolls', category: 'Premium', price: 'Ksh 500', priceNum: 500, stock: 45, status: 'In Stock', sales: 95 },
];

export const getProducts = (): Product[] => {
  try {
    const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(seedProducts));
      return seedProducts;
    }
    return JSON.parse(stored);
  } catch {
    return seedProducts;
  }
};

export const addProduct = (product: Omit<Product, 'id'>): void => {
  const products = getProducts();
  const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
  const newProduct = { ...product, id: maxId + 1 };
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify([...products, newProduct]));
};

export const updateProduct = (id: number, updates: Partial<Product>): void => {
  const products = getProducts();
  const updated = products.map(p => p.id === id ? { ...p, ...updates } : p);
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
};

export const deleteProduct = (id: number): void => {
  const products = getProducts();
  const updated = products.filter(p => p.id !== id);
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
};

export const exportProductsToCSV = (): void => {
  const products = getProducts();
  const headers = ['Product Name', 'Category', 'Price', 'Stock', 'Status', 'Total Sales'];
  const rows = products.map(p => [p.name, p.category, p.price, p.stock.toString(), p.status, p.sales.toString()]);
  const csvContent = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `products-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

// --- Notifications ---

export interface Notification {
  id: number;
  type: 'order' | 'user' | 'alert' | 'payment';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const NOTIFICATIONS_STORAGE_KEY = 'hb-admin-notifications';

const seedNotifications: Notification[] = [
  { id: 1, type: 'order', title: 'New Order Received', message: 'Order #1234 from John Doe - 5 Hot Dog Rolls', time: '2 min ago', read: false },
  { id: 2, type: 'user', title: 'New Customer Registration', message: 'Sarah Wilson just signed up for an account', time: '10 min ago', read: false },
  { id: 3, type: 'alert', title: 'Low Stock Alert', message: 'Hungarian Hot Dog Rolls (20 Pack) - Only 15 left', time: '1 hour ago', read: false },
  { id: 4, type: 'order', title: 'Order Completed', message: 'Order #1230 delivered successfully', time: '2 hours ago', read: true },
  { id: 5, type: 'payment', title: 'Payment Received', message: 'Ksh 650 from David Mwangi via M-Pesa', time: '3 hours ago', read: true },
  { id: 6, type: 'alert', title: 'Product Review', message: 'New 5-star review on Hungarian Hot Dog Rolls', time: '5 hours ago', read: true },
  { id: 7, type: 'user', title: 'Customer Feedback', message: 'Grace Wanjiku left a comment: "Amazing quality!"', time: '6 hours ago', read: true },
  { id: 8, type: 'order', title: 'Order Cancelled', message: 'Order #1237 was cancelled by the customer', time: '1 day ago', read: true },
];

export const getNotifications = (): Notification[] => {
  try {
    const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(seedNotifications));
      return seedNotifications;
    }
    return JSON.parse(stored);
  } catch {
    return seedNotifications;
  }
};

export const markNotificationRead = (id: number): void => {
  const notifications = getNotifications();
  const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
};

export const markAllNotificationsRead = (): void => {
  const notifications = getNotifications();
  const updated = notifications.map(n => ({ ...n, read: true }));
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
};

export const deleteNotification = (id: number): void => {
  const notifications = getNotifications();
  const updated = notifications.filter(n => n.id !== id);
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
};

let notificationIdCounter = seedNotifications.length + 1;

export const addNotification = (notification: Omit<Notification, 'id'>): void => {
  const notifications = getNotifications();
  const newNotification = { ...notification, id: notificationIdCounter++ };
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify([newNotification, ...notifications]));
};

// --- Settings ---

export interface AdminSettings {
  businessName: string;
  businessEmail: string;
  phoneNumber: string;
  location: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
  website: string;
}

export interface AdminPreferences {
  autoAcceptOrders: boolean;
  emailNotifications: boolean;
  lowStockAlerts: boolean;
}

const SETTINGS_STORAGE_KEY = 'hb-admin-settings';
const PREFS_STORAGE_KEY = 'hb-admin-prefs';

const defaultSettings: AdminSettings = {
  businessName: 'Hungarian Bites',
  businessEmail: CONTACT_EMAIL,
  phoneNumber: `+254 (0) ${WHATSAPP_NUMBER.slice(3)}`,
  location: "Murang'a, Kenya",
  instagram: 'https://www.instagram.com/vdj_kenydee/',
  facebook: 'https://facebook.com/hungarianbites',
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  website: SITE_URL,
};

const defaultPreferences: AdminPreferences = {
  autoAcceptOrders: false,
  emailNotifications: true,
  lowStockAlerts: true,
};

export const getAdminSettings = (): AdminSettings => {
  try {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
};

export const saveAdminSettings = (settings: Partial<AdminSettings>): void => {
  const current = getAdminSettings();
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({ ...current, ...settings }));
};

export const getAdminPreferences = (): AdminPreferences => {
  try {
    const stored = localStorage.getItem(PREFS_STORAGE_KEY);
    return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
  } catch {
    return defaultPreferences;
  }
};

export const saveAdminPreference = (key: keyof AdminPreferences, value: boolean): void => {
  const current = getAdminPreferences();
  localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify({ ...current, [key]: value }));
};

// --- Dashboard Stats ---

export interface DashboardStats {
  totalCustomers: number;
  ordersToday: number;
  revenue: number;
  growth: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  recentOrders: Order[];
}

export const getDashboardStats = (): DashboardStats => {
  const orders = getOrders();
  const customers = getCustomers();
  const completedOrders = orders.filter(o => o.status === 'Completed');
  const pendingOrders = orders.filter(o => o.status === 'Pending');
  const cancelledOrders = orders.filter(o => o.status === 'Cancelled');
  const revenue = completedOrders.reduce((sum, o) => sum + o.amount, 0);

  return {
    totalCustomers: customers.length,
    ordersToday: orders.filter(o => o.date === '2024-03-15').length,
    revenue,
    growth: 15.2,
    pendingOrders: pendingOrders.length,
    completedOrders: completedOrders.length,
    cancelledOrders: cancelledOrders.length,
    recentOrders: orders.slice(0, 5),
  };
};
