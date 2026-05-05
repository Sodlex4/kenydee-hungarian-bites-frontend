
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Search, Bell, Sun, Moon, Menu, X } from 'lucide-react';
import { useAdminProfile } from '@/context/AdminProfileContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface AdminTopbarProps {
  onMenuToggle: () => void;
  onSearch?: (term: string) => void;
  notificationCount?: number;
}

const AdminTopbar: React.FC<AdminTopbarProps> = ({ onMenuToggle, onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, updateProfile } = useAdminProfile();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin-theme') === 'dark';
    }
    return false;
  });
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
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
    navigate('/admin/profile');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="h-14 sm:h-16 backdrop-blur-sm border-b flex items-center justify-between px-3 sm:px-6" style={{
      background: 'hsl(var(--background))',
      borderColor: 'hsl(var(--border))'
    }}>
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg transition-colors"
          style={{ background: 'hsl(var(--muted))' }}
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" style={{ color: 'hsl(var(--foreground))' }} />
        </button>

        {showSearch ? (
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              autoFocus
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                onSearch?.(value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setShowSearch(false);
                  setSearchTerm('');
                  onSearch?.( '');
                }
              }}
              className="w-full pl-10 pr-10 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm"
              style={{
                background: 'hsl(var(--input))',
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--foreground))'
              }}
            />
            <button
              onClick={() => {
                setShowSearch(false);
                setSearchTerm('');
                onSearch?.('');
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded"
              aria-label="Close search"
            >
              <X className="w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowSearch(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border text-sm max-w-md w-full"
            style={{
              background: 'hsl(var(--input))',
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--muted-foreground))'
            }}
          >
            <Search className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Search...</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-colors"
          style={{
            background: 'hsl(var(--muted))',
            color: 'hsl(var(--muted-foreground))'
          }}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>

        <Link
          to="/admin/notifications"
          className="relative p-2 rounded-lg transition-colors"
          style={{
            background: 'hsl(var(--muted))',
            color: 'hsl(var(--muted-foreground))'
          }}
          aria-label={`View notifications ${notificationCount ? `(${notificationCount} unread)` : ''}`}
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full text-xs flex items-center justify-center" style={{
              background: 'hsl(var(--destructive))',
              color: 'hsl(var(--destructive-foreground))'
            }}>
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </Link>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-2 rounded-lg transition-colors"
            style={{
              background: 'hsl(var(--muted))',
              color: 'hsl(var(--muted-foreground))'
            }}
            aria-label="User menu"
            aria-expanded={showProfile}
          >
            <Avatar className="h-6 w-6 sm:h-7 sm:w-7">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="text-xs" style={{
                background: 'var(--gradient-primary)',
                color: 'white'
              }}>
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium hidden sm:inline text-sm">{profile.name}</span>
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
