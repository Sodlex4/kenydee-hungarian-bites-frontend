import {
  getOrders as _getOrders,
  updateOrderStatus as _updateOrderStatus,
  deleteOrder as _deleteOrder,
  addOrder as _addOrder,
  getCustomerOrders as _getCustomerOrders,
  exportOrdersToCSV as _exportOrdersToCSV,
  getCustomers as _getCustomers,
  exportCustomersToCSV as _exportCustomersToCSV,
  getProducts as _getProducts,
  addProduct as _addProduct,
  updateProduct as _updateProduct,
  deleteProduct as _deleteProduct,
  exportProductsToCSV as _exportProductsToCSV,
  getNotifications as _getNotifications,
  markNotificationRead as _markNotificationRead,
  markAllNotificationsRead as _markAllNotificationsRead,
  deleteNotification as _deleteNotification,
  addNotification as _addNotification,
  getAdminSettings as _getAdminSettings,
  saveAdminSettings as _saveAdminSettings,
  getAdminPreferences as _getAdminPreferences,
  saveAdminPreference as _saveAdminPreference,
  getDashboardStats as _getDashboardStats,
} from '../data/orders';

export type {
  Order,
  OrderItem,
  Customer,
  Product,
  Notification,
  AdminSettings,
  AdminPreferences,
  DashboardStats,
} from '../data/orders';

export async function getOrders() {
  return _getOrders();
}

export async function updateOrderStatus(id: string, status: string) {
  _updateOrderStatus(id, status as any);
}

export async function deleteOrder(id: string) {
  _deleteOrder(id);
}

export async function addOrder(order: any) {
  _addOrder(order);
}

export async function getCustomerOrders(customerName: string) {
  return _getCustomerOrders(customerName);
}

export async function exportOrdersToCSV() {
  _exportOrdersToCSV();
}

export async function getCustomers() {
  return _getCustomers();
}

export async function exportCustomersToCSV() {
  _exportCustomersToCSV();
}

export async function getProducts() {
  return _getProducts();
}

export async function addProduct(product: any) {
  _addProduct(product);
}

export async function updateProduct(id: number, updates: any) {
  _updateProduct(id, updates);
}

export async function deleteProduct(id: number) {
  _deleteProduct(id);
}

export async function exportProductsToCSV() {
  _exportProductsToCSV();
}

export async function getNotifications() {
  return _getNotifications();
}

export async function markNotificationRead(id: number) {
  _markNotificationRead(id);
}

export async function markAllNotificationsRead() {
  _markAllNotificationsRead();
}

export async function deleteNotification(id: number) {
  _deleteNotification(id);
}

export async function addNotification(notification: any) {
  _addNotification(notification);
}

export async function getAdminSettings() {
  return _getAdminSettings();
}

export async function saveAdminSettings(settings: any) {
  _saveAdminSettings(settings);
}

export async function getAdminPreferences() {
  return _getAdminPreferences();
}

export async function saveAdminPreference(key: string, value: boolean) {
  _saveAdminPreference(key as any, value);
}

export async function getDashboardStats() {
  return _getDashboardStats();
}
