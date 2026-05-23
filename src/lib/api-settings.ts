import { api } from './api-client';
import { WHATSAPP_NUMBER, CONTACT_EMAIL, SITE_URL, FACEBOOK_URL, INSTAGRAM_URL } from './env';

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

interface ApiSettings {
  siteName: string;
  siteDescription: string;
  whatsapp: string;
  email: string;
  currency: string;
  deliveryFee: number;
  freeDeliveryMin: number;
  deliveryTime: string;
  deliveryRadius: string;
}

interface ApiPreferences {
  notifications: boolean;
  emailAlerts: boolean;
  orderUpdates: boolean;
  marketingEmails: boolean;
}

function toFrontendSettings(api: ApiSettings): AdminSettings {
  return {
    businessName: api.siteName,
    businessEmail: api.email,
    phoneNumber: `+254 (0) ${WHATSAPP_NUMBER.slice(3)}`,
    location: api.deliveryRadius,
    instagram: INSTAGRAM_URL || 'https://www.instagram.com/vdj_kenydee/',
    facebook: FACEBOOK_URL || 'https://facebook.com/hungarianbites',
    whatsapp: api.whatsapp || `https://wa.me/${WHATSAPP_NUMBER}`,
    website: SITE_URL,
  };
}

function toBackendSettings(frontend: AdminSettings): Partial<ApiSettings> {
  return {
    siteName: frontend.businessName,
    email: frontend.businessEmail,
    whatsapp: frontend.whatsapp,
    deliveryRadius: frontend.location,
  };
}

function toFrontendPreferences(api: ApiPreferences): AdminPreferences {
  return {
    autoAcceptOrders: api.orderUpdates,
    emailNotifications: api.emailAlerts,
    lowStockAlerts: api.notifications,
  };
}

function toBackendPreferences(frontend: AdminPreferences): Partial<ApiPreferences> {
  return {
    emailAlerts: frontend.emailNotifications,
    orderUpdates: frontend.autoAcceptOrders,
    notifications: frontend.lowStockAlerts,
  };
}

export async function getAdminSettings(): Promise<AdminSettings> {
  const settings = await api.get<ApiSettings>('/settings');
  return toFrontendSettings(settings);
}

export async function saveAdminSettings(settings: Partial<AdminSettings>): Promise<void> {
  const payload = toBackendSettings(settings as AdminSettings);
  await api.put('/settings', payload);
}

export async function getAdminPreferences(): Promise<AdminPreferences> {
  const prefs = await api.get<ApiPreferences>('/settings/preferences');
  return toFrontendPreferences(prefs);
}

export async function saveAdminPreference(key: keyof AdminPreferences, value: boolean): Promise<void> {
  const prefs = await getAdminPreferences();
  const updated = { ...prefs, [key]: value };
  const payload = toBackendPreferences(updated);
  await api.patch('/settings/preferences', payload);
}
