import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Bell, 
  Settings, 
  LogOut,
  Package
} from 'lucide-react';

const AdminSidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Customers', path: '/admin/customers' },
    { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <aside className="w-64 min-h-screen backdrop-blur-sm border-r" style={{
      background: 'hsl(var(--card))',
      borderColor: 'hsl(var(--border))'
    }}>
      <div className="p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent" style={{
          fontFamily: 'Pacifico, cursive',
          backgroundImage: 'var(--gradient-primary)'
        }}>
          Admin Panel
        </h2>
      </div>

      <nav className="px-4 space-y-2">
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
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}

        <button 
          className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 w-full text-left hover:scale-105 mt-8"
          style={{ color: 'hsl(var(--destructive))' }}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;