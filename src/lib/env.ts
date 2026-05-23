export const WHATSAPP_NUMBER: string =
  import.meta.env.VITE_WHATSAPP_NUMBER || '';

export const WHATSAPP_URL: string = `https://wa.me/${WHATSAPP_NUMBER}`;

export const PHONE_DISPLAY: string = WHATSAPP_NUMBER
  ? `+254 ${WHATSAPP_NUMBER.slice(3, 6)} ${WHATSAPP_NUMBER.slice(6, 9)} ${WHATSAPP_NUMBER.slice(9)}`
  : '';

export const CONTACT_EMAIL: string =
  import.meta.env.VITE_CONTACT_EMAIL || '';

export const SITE_URL: string =
  import.meta.env.VITE_SITE_URL || '';

export const GA_MEASUREMENT_ID: string =
  import.meta.env.VITE_GA_MEASUREMENT_ID || '';

export const API_URL: string =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const ADMIN_PASSWORD: string =
  import.meta.env.VITE_ADMIN_PASSWORD || '';

export const FACEBOOK_URL: string =
  import.meta.env.VITE_FACEBOOK_URL || '';

export const INSTAGRAM_URL: string =
  import.meta.env.VITE_INSTAGRAM_URL || '';
