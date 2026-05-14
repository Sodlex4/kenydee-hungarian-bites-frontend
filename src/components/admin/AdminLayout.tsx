import React, { ReactNode, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import { MobileSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  onSearch?: (term: string) => void;
  notificationCount?: number;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, description, onSearch, notificationCount }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ background: 'hsl(var(--background))' }}>
      <AdminSidebar onClose={() => setSidebarOpen(false)} />
      <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar onMenuToggle={() => setSidebarOpen(true)} notificationCount={notificationCount} />
        <main className="flex-1 p-3 sm:p-4 md:p-6">
          <div className="mb-6 md:mb-8">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2 truncate" style={{
              color: 'hsl(var(--foreground))',
            }}>
              {title}
            </h1>
            <p className="text-xs sm:text-sm md:text-base truncate" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {description}
            </p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
