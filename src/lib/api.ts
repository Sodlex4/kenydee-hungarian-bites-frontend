export {
  getOrders,
  updateOrderStatus,
  deleteOrder,
  addOrder,
  getCustomerOrders,
  exportOrdersToCSV,
} from './api-orders';

export {
  getCustomers,
  exportCustomersToCSV,
} from './api-customers';

export {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  exportProductsToCSV,
} from './api-products';

export {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  addNotification,
} from './api-notifications';

export {
  getAdminSettings,
  saveAdminSettings,
  getAdminPreferences,
  saveAdminPreference,
} from './api-settings';

export {
  getDashboardStats,
} from './api-dashboard';

export type { Order, OrderItem } from './api-orders';
export type { Customer } from './api-customers';
export type { Product } from './api-products';
export type { Notification } from './api-notifications';
export type { AdminSettings, AdminPreferences } from './api-settings';
export type { DashboardStats } from './api-dashboard';
