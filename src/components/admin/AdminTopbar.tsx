
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Search, Bell, User, Sun, Moon } from 'lucide-react';

const AdminTopbar = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin-theme') === 'dark';
    }
    return false;
  });
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('admin-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('admin-theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev: boolean) => !prev);
  };

  const handleLogout = () => {
    setShowProfile(false);
    navigate('/');
    toast.success('Logged out successfully');
  };

  const handleViewProfile = () => {
    setShowProfile(false);
    toast.info('Coming soon');
  };

  return (
    <header className="h-16 backdrop-blur-sm border-b flex items-center justify-between px-6" style={{
      background: 'hsl(var(--background))',
      borderColor: 'hsl(var(--border))'
    }}>
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              background: 'hsl(var(--input))',
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--foreground))'
            }}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-colors hover:scale-105"
          style={{
            background: 'hsl(var(--muted))',
            color: 'hsl(var(--muted-foreground))'
          }}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button className="relative p-2 rounded-lg transition-colors hover:scale-105" style={{
          background: 'hsl(var(--muted))',
          color: 'hsl(var(--muted-foreground))'
        }}>
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full text-xs flex items-center justify-center" style={{
            background: 'hsl(var(--destructive))',
            color: 'hsl(var(--destructive-foreground))'
          }}>
            3
          </span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center space-x-2 p-2 rounded-lg transition-colors hover:scale-105"
            style={{
              background: 'hsl(var(--muted))',
              color: 'hsl(var(--muted-foreground))'
            }}
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Admin</span>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border backdrop-blur-sm z-50" style={{
              background: 'hsl(var(--popover))',
              borderColor: 'hsl(var(--border))'
            }}>
              <div className="py-2">
                <button
                  onClick={handleViewProfile}
                  className="block w-full text-left px-4 py-2 text-sm transition-colors"
                  style={{ color: 'hsl(var(--popover-foreground))' }}
                >
                  View Profile
                </button>
                <Link
                  to="/admin/settings"
                  onClick={() => setShowProfile(false)}
                  className="block px-4 py-2 text-sm transition-colors"
                  style={{ color: 'hsl(var(--popover-foreground))' }}
                >
                  Settings
                </Link>
                <hr className="my-1" style={{ borderColor: 'hsl(var(--border))' }} />
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm transition-colors"
                  style={{ color: 'hsl(var(--destructive))' }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
