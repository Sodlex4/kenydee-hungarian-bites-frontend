import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Bell,
  Settings,
  LogOut,
  Package,
  X,
  User
} from 'lucide-react';
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

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const handleLogout = () => {
    setLogoutConfirmOpen(true);
  };

  const confirmLogout = () => {
    setLogoutConfirmOpen(false);
    onClose?.();
    logout();
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Customers', path: '/admin/customers' },
    { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    { icon: User, label: 'Profile', path: '/admin/profile' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <aside className="w-64 min-h-screen backdrop-blur-sm border-r hidden md:flex md:flex-col" style={{
      background: 'hsl(var(--card))',
      borderColor: 'hsl(var(--border))'
    }}>
      <div className="p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent tracking-wider" style={{
          fontFamily: 'Bebas Neue, sans-serif',
          backgroundImage: 'var(--gradient-primary)'
        }}>
          Admin Panel
        </h2>
      </div>

      <nav className="px-4 space-y-2 flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-white shadow-lg' 
                  : 'hover:scale-105'
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? 'var(--gradient-primary)' : 'transparent',
              color: isActive ? 'white' : 'hsl(var(--foreground))'
            })}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}

        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 w-full text-left hover:scale-105 mt-8"
          style={{ color: 'hsl(var(--destructive))' }}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">Logout</span>
        </button>
      </nav>

      <AlertDialog open={logoutConfirmOpen} onOpenChange={setLogoutConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Logout</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to log out of the admin panel?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay Logged In</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLogout} className="bg-red-500 hover:bg-red-600">Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </aside>
  );
};

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const handleLogout = () => {
    setLogoutConfirmOpen(true);
  };

  const confirmLogout = () => {
    setLogoutConfirmOpen(false);
    onClose();
    logout();
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Customers', path: '/admin/customers' },
    { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    { icon: User, label: 'Profile', path: '/admin/profile' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 backdrop-blur-sm border-r transition-transform duration-300 md:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))'
        }}
      >
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent tracking-wider" style={{
            fontFamily: 'Bebas Neue, sans-serif',
            backgroundImage: 'var(--gradient-primary)'
          }}>
            Admin Panel
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg"
            style={{ background: 'hsl(var(--muted))' }}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" style={{ color: 'hsl(var(--foreground))' }} />
          </button>
        </div>

        <nav className="px-4 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-white shadow-lg' 
                    : ''
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? 'var(--gradient-primary)' : 'transparent',
                color: isActive ? 'white' : 'hsl(var(--foreground))'
              })}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}

          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 w-full text-left mt-8"
            style={{ color: 'hsl(var(--destructive))' }}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>

        <AlertDialog open={logoutConfirmOpen} onOpenChange={setLogoutConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Logout</AlertDialogTitle>
              <AlertDialogDescription>Are you sure you want to log out of the admin panel?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Stay Logged In</AlertDialogCancel>
              <AlertDialogAction onClick={confirmLogout} className="bg-red-500 hover:bg-red-600">Logout</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </aside>
    </>
  );
};

export default AdminSidebar;
