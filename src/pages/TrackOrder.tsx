import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Package, Search, ChevronRight, Check, Clock, XCircle, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { trackOrder } from '@/lib/api-track';
import type { Order } from '@/lib/api-orders';

const statusSteps = [
  { key: 'Pending', label: 'Order Placed', icon: Clock },
  { key: 'Processing', label: 'Processing', icon: Package },
  { key: 'Completed', label: 'Completed', icon: Check },
];

const statusIndex: Record<string, number> = { Pending: 0, Processing: 1, Completed: 2, Cancelled: -1 };

const StatusStepper = ({ status }: { status: string }) => {
  const current = statusIndex[status] ?? -1;

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {status === 'Cancelled' ? (
          <div className="w-full flex items-center gap-3 p-4 rounded-xl" style={{ background: 'hsl(var(--destructive) / 0.1)', color: 'hsl(var(--destructive))' }}>
            <XCircle className="w-6 h-6" />
            <span className="font-semibold">This order has been cancelled</span>
          </div>
        ) : (
          statusSteps.map((step, i) => {
            const Icon = step.icon;
            const done = i <= current;
            const isLast = i === statusSteps.length - 1;
            return (
              <React.Fragment key={step.key}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500"
                    style={{
                      background: done ? 'var(--gradient-primary)' : 'hsl(var(--muted))',
                      boxShadow: done ? '0 4px 15px hsl(var(--primary) / 0.4)' : 'none',
                    }}
                  >
                    {done ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className="w-5 h-5" style={{ color: 'hsl(var(--muted-foreground))' }} />
                    )}
                  </div>
                  <span
                    className="text-xs font-medium whitespace-nowrap"
                    style={{ color: done ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))' }}
                  >
                    {step.label}
                  </span>
                </div>
                {!isLast && (
                  <div
                    className="flex-1 h-0.5 mx-2 transition-all duration-500"
                    style={{
                      background: i < current
                        ? 'var(--gradient-primary)'
                        : 'hsl(var(--muted))',
                      marginBottom: '1.5rem',
                    }}
                  />
                )}
              </React.Fragment>
            );
          })
        )}
      </div>
    </div>
  );
};

const OrderCard = ({ order }: { order: Order }) => (
  <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}>
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Order</p>
          <p className="text-lg font-bold tracking-tight" style={{ color: 'hsl(var(--foreground))' }}>{order.id}</p>
        </div>
        <span
          className="px-4 py-1.5 rounded-full text-sm font-semibold"
          style={{
            background: order.status === 'Cancelled' ? 'hsl(var(--destructive) / 0.15)' :
              order.status === 'Completed' ? 'hsl(var(--primary) / 0.15)' :
              'hsl(var(--accent) / 0.15)',
            color: order.status === 'Cancelled' ? 'hsl(var(--destructive))' :
              order.status === 'Completed' ? 'hsl(var(--primary))' :
              'hsl(var(--accent))',
          }}
        >
          {order.status}
        </span>
      </div>

      <StatusStepper status={order.status} />

      <div className="border-t pt-4" style={{ borderColor: 'hsl(var(--border))' }}>
        <p className="font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Items</p>
        <div className="space-y-1">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <span>{item.quantity}x {item.name}</span>
              <span>KSh {item.price * item.quantity}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-bold mt-3 pt-3 border-t" style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}>
          <span>Total</span>
          <span>KSh {order.amount}</span>
        </div>
      </div>

      <div className="space-y-2 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>{order.customer.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{order.deliveryAddress}</span>
        </div>
      </div>
    </div>
  </div>
);

const TrackOrder = () => {
  const { id: urlId } = useParams();
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (urlId) {
      setLoading(true);
      trackOrder(urlId)
        .then(setOrder)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [urlId]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    setLoading(true);
    setError('');
    try {
      const result = await trackOrder(searchId.trim());
      setOrder(result);
      navigate(`/track/${encodeURIComponent(searchId.trim())}`, { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Order not found');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setOrder(null);
    setError('');
    setSearchId('');
    navigate('/track', { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'hsl(var(--background))' }}>
      <header
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl"
        style={{
          background: 'hsl(var(--background) / 0.8)',
          borderBottom: '1px solid hsl(var(--primary) / 0.15)',
        }}
      >
        <div className="container py-4 flex items-center gap-4">
          {order && (
            <button onClick={handleBack} className="p-2 -ml-2 rounded-lg hover:scale-105 transition-transform" style={{ color: 'hsl(var(--foreground))' }}>
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <Link
            to="/"
            className="font-bold bg-gradient-to-r bg-clip-text text-transparent sm:text-2xl text-lg tracking-wider"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              backgroundImage: 'var(--gradient-primary)'
            }}
          >
            HUNGARIAN BITES
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-4 pt-28 pb-12">
        <div className="w-full max-w-lg">
          {!order ? (
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'hsl(var(--primary) / 0.1)' }}
              >
                <Package className="w-10 h-10" style={{ color: 'hsl(var(--primary))' }} />
              </div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Track Your Order</h1>
              <p className="text-lg mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Enter your order ID to check its status
              </p>

              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'hsl(var(--muted-foreground))' }} />
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="e.g. #KX7A6B"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border text-lg outline-none transition-all"
                    style={{
                      background: 'hsl(var(--card))',
                      borderColor: error ? 'hsl(var(--destructive))' : 'hsl(var(--border))',
                      color: 'hsl(var(--foreground))',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !searchId.trim()}
                  className="px-6 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  style={{
                    background: 'var(--gradient-primary)',
                    boxShadow: '0 4px 15px hsl(var(--primary) / 0.3)',
                  }}
                >
                  {loading ? '...' : <Search className="w-5 h-5" />}
                </button>
              </form>

              {error && (
                <div className="mt-4 p-4 rounded-xl" style={{ background: 'hsl(var(--destructive) / 0.1)', color: 'hsl(var(--destructive))' }}>
                  {error}
                </div>
              )}

              <div className="mt-12 p-6 rounded-xl border" style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}>
                <p className="font-semibold mb-3" style={{ color: 'hsl(var(--foreground))' }}>Where to find your order ID?</p>
                <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  After placing an order, you'll receive an order ID (e.g. #KX7A6B). 
                  You can enter it above to check your order status anytime.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <OrderCard order={order} />
              <div className="flex justify-center gap-4 mt-6">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'var(--gradient-primary)',
                    boxShadow: '0 4px 15px hsl(var(--primary) / 0.3)',
                  }}
                >
                  Back to Menu
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="py-6 text-center text-sm" style={{ color: 'hsl(var(--muted-foreground))', borderTop: '1px solid hsl(var(--border))' }}>
        <Link to="/" className="hover:underline">Hungarian Bites</Link> &mdash; Order Tracking
      </footer>
    </div>
  );
};

export default TrackOrder;
