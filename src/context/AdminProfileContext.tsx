import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { WHATSAPP_NUMBER, CONTACT_EMAIL } from '../lib/env';

export interface AdminProfile {
  name: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  role: string;
  updatedAt: number;
}

interface AdminProfileContextType {
  profile: AdminProfile;
  updateProfile: (data: Partial<AdminProfile>) => void;
  updateAvatar: (file: File) => Promise<void>;
  removeAvatar: () => void;
  isLoading: boolean;
  lastUpdated: number | null;
  subscribeToUpdates: (callback: (profile: AdminProfile) => void) => () => void;
}

const PROFILE_STORAGE_KEY = 'hungarian-bites-admin-profile';
const AVATAR_STORAGE_KEY = 'hungarian-bites-admin-avatar';

const getDefaultProfile = (): AdminProfile => ({
  name: 'Kenydee',
  email: CONTACT_EMAIL,
  phone: `+254 (0) ${WHATSAPP_NUMBER.slice(3)}`,
  bio: 'Admin of Hungarian Bites - Bringing premium Hungarian hot dog rolls to Kenya.',
  avatar: '',
  role: 'Administrator',
  updatedAt: Date.now(),
});

const loadProfileFromStorage = (): AdminProfile => {
  try {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (stored) {
      return { ...getDefaultProfile(), ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Failed to load profile from storage:', e);
  }
  return getDefaultProfile();
};

const loadAvatarFromStorage = (): string => {
  try {
    return localStorage.getItem(AVATAR_STORAGE_KEY) || '';
  } catch {
    return '';
  }
};

const AdminProfileContext = createContext<AdminProfileContextType | undefined>(undefined);

export const useAdminProfile = () => {
  const context = useContext(AdminProfileContext);
  if (!context) {
    throw new Error('useAdminProfile must be used within an AdminProfileProvider');
  }
  return context;
};

interface AdminProfileProviderProps {
  children: ReactNode;
}

export const AdminProfileProvider: React.FC<AdminProfileProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<AdminProfile>(loadProfileFromStorage);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const subscribersRef = React.useRef<Set<(profile: AdminProfile) => void>>(new Set());

  const persistProfile = (updated: AdminProfile) => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
      setLastUpdated(Date.now());
    } catch (e) {
      console.error('Failed to persist profile:', e);
    }
  };

  const updateProfile = useCallback((data: Partial<AdminProfile>) => {
    setProfile(prev => {
      const updated = { ...prev, ...data, updatedAt: Date.now() };
      persistProfile(updated);
      subscribersRef.current.forEach(cb => cb(updated));
      return updated;
    });
  }, []);

  const updateAvatar = useCallback(async (file: File): Promise<void> => {
    setIsLoading(true);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const compressed = await compressImage(base64, 300, 300, 0.7);

      localStorage.setItem(AVATAR_STORAGE_KEY, compressed);
      updateProfile({ avatar: compressed });
    } catch (e) {
      console.error('Failed to update avatar:', e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, [updateProfile]);

  const removeAvatar = useCallback(() => {
    localStorage.removeItem(AVATAR_STORAGE_KEY);
    updateProfile({ avatar: '' });
  }, [updateProfile]);

  const subscribeToUpdates = useCallback((callback: (profile: AdminProfile) => void) => {
    subscribersRef.current.add(callback);
    return () => {
      subscribersRef.current.delete(callback);
    };
  }, []);

  useEffect(() => {
    const storedAvatar = loadAvatarFromStorage();
    if (storedAvatar && !profile.avatar) {
      setProfile(prev => ({ ...prev, avatar: storedAvatar }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === PROFILE_STORAGE_KEY && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          setProfile(updated);
          setLastUpdated(Date.now());
        } catch (e) {
          console.error('Failed to parse profile update:', e);
        }
      }
      if (e.key === AVATAR_STORAGE_KEY && e.newValue) {
        setProfile(prev => ({ ...prev, avatar: e.newValue || '' }));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const value: AdminProfileContextType = {
    profile,
    updateProfile,
    updateAvatar,
    removeAvatar,
    isLoading,
    lastUpdated,
    subscribeToUpdates,
  };

  return (
    <AdminProfileContext.Provider value={value}>
      {children}
    </AdminProfileContext.Provider>
  );
};

const compressImage = (
  base64: string,
  maxWidth: number,
  maxHeight: number,
  quality: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = reject;
    img.src = base64;
  });
};
