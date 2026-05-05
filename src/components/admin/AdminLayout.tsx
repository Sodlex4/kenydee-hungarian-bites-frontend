import React, { ReactNode } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, description }) => {
  return (
    <div className="flex min-h-screen" style={{ background: 'hsl(var(--background))' }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2" style={{
              color: 'hsl(var(--foreground))',
            }}>
              {title}
            </h1>
            <p style={{ color: 'hsl(var(--muted-foreground))' }}>
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
