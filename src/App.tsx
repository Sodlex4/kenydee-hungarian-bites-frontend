import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProfileProvider } from "@/context/AdminProfileContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import RouteLoading from "@/components/RouteLoading";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminCustomers = lazy(() => import("./pages/admin/AdminCustomers"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminNotifications = lazy(() => import("./pages/admin/AdminNotifications"));
const AdminProfile = lazy(() => import("./pages/admin/AdminProfile"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const TermsPage = lazy(() => import("./pages/legal/Terms"));
const PrivacyPage = lazy(() => import("./pages/legal/Privacy"));
const AboutPage = lazy(() => import("./pages/legal/About"));

const queryClient = new QueryClient();

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary>
    <Suspense fallback={<RouteLoading />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminProfileProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/customers" element={<AdminLayout><AdminCustomers /></AdminLayout>} />
            <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
            <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
            <Route path="/admin/notifications" element={<AdminLayout><AdminNotifications /></AdminLayout>} />
            <Route path="/admin/profile" element={<AdminLayout><AdminProfile /></AdminLayout>} />
            <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
            <Route path="/legal/terms" element={<ErrorBoundary><Suspense fallback={<RouteLoading />}><TermsPage /></Suspense></ErrorBoundary>} />
            <Route path="/legal/privacy" element={<ErrorBoundary><Suspense fallback={<RouteLoading />}><PrivacyPage /></Suspense></ErrorBoundary>} />
            <Route path="/legal/about" element={<ErrorBoundary><Suspense fallback={<RouteLoading />}><AboutPage /></Suspense></ErrorBoundary>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminProfileProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
