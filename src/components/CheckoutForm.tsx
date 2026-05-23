import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Package, Clock, MessageCircle, Lock, Shield, Truck, Loader2, Zap, CalendarClock, AlertCircle } from 'lucide-react';
import type { CartItem } from '../context/CartContext';

const FORM_DRAFT_KEY = 'hungarian-bites-checkout-draft';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .min(10, 'Enter a valid phone number (at least 10 digits)')
    .refine(val => {
      const cleaned = val.replace(/[\s\-()]/g, '');
      return /^(?:\+254|0)[17]\d{8}$/.test(cleaned);
    }, 'Enter a valid Kenyan number (e.g., +254712345678 or 0712345678)'),
  email: z.string().optional().or(z.literal('')),
  deliveryAddress: z.string().min(5, 'Please enter a complete delivery address'),
  deliveryTime: z.enum(['asap', 'schedule']),
  scheduledTime: z.string().optional(),
  specialInstructions: z.string().max(200, 'Max 200 characters').optional(),
}).refine(data => data.deliveryTime !== 'schedule' || (data.scheduledTime && data.scheduledTime.length > 0), {
  message: 'Please select a delivery date and time',
  path: ['scheduledTime'],
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  cartItems: CartItem[];
  total: number;
  totalItems: number;
  onBack: () => void;
  onSubmit: (data: CheckoutFormData) => void;
  isSubmitting: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  cartItems,
  total,
  totalItems,
  onSubmit,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: () => {
      try {
        const saved = localStorage.getItem(FORM_DRAFT_KEY);
        if (saved) return { ...JSON.parse(saved), deliveryTime: saved ? undefined : 'asap' };
      } catch { /* ignore */ }
      return {
        deliveryTime: 'asap' as const,
        specialInstructions: '',
        scheduledTime: '',
      };
    },
    mode: 'onChange',
  });

  const deliveryTime = watch('deliveryTime');
  const specialInstructions = watch('specialInstructions');
  const formValues = watch();

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(formValues));
      } catch { /* ignore */ }
    }, 500);
    return () => clearTimeout(timer);
  }, [formValues]);

  const eta = new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleTimeString('en-KE', { hour: 'numeric', minute: '2-digit' });

  const formatPhone = (raw: string) => {
    const cleaned = raw.replace(/[\s\-()]/g, '');
    if (cleaned.startsWith('0') && cleaned.length > 1) {
      return '+254' + cleaned.slice(1);
    }
    return cleaned;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5" data-vaul-no-drag>
        <p className="text-xs text-center" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Checkout as a guest &mdash; no account needed
        </p>

        {/* Order Summary - Glassmorphism */}
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
            <span className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              Order Summary ({totalItems} item{totalItems !== 1 ? 's' : ''})
            </span>
          </div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-sm py-1"
              style={{ color: 'hsl(var(--muted-foreground))' }}
            >
              <span className="truncate mr-2">
                {item.name} &times; {item.quantity}
              </span>
              <span className="font-medium whitespace-nowrap" style={{ color: 'hsl(var(--foreground))' }}>
                Ksh {item.price * item.quantity}
              </span>
            </div>
          ))}
          <div
            className="flex items-center justify-between text-base font-bold pt-2"
            style={{
              borderTop: '1px solid hsl(var(--border) / 0.3)',
              color: 'hsl(var(--foreground))',
            }}
          >
            <span>Total</span>
            <span style={{ color: 'hsl(var(--primary))' }}>Ksh {total.toLocaleString()}</span>
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-1.5"
            style={{ color: 'hsl(var(--foreground))' }}
          >
            Full Name <span style={{ color: 'hsl(var(--destructive))' }}>*</span>
          </label>
          <input
            id="name"
            autoComplete="name"
            {...register('name')}
            placeholder="e.g. John Kamau"
            className="w-full h-12 sm:h-14 rounded-lg border px-4 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            style={{
              background: 'hsl(var(--input))',
              borderColor: errors.name ? 'hsl(var(--destructive))' : 'hsl(var(--border))',
              color: 'hsl(var(--foreground))',
            }}
          />
          {errors.name && (
            <p className="text-xs mt-1" style={{ color: 'hsl(var(--destructive))' }}>
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium mb-1.5"
            style={{ color: 'hsl(var(--foreground))' }}
          >
            Phone Number <span style={{ color: 'hsl(var(--destructive))' }}>*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="numeric"
            autoCapitalize="none"
            {...register('phone', {
              onChange: (e) => {
                const formatted = formatPhone(e.target.value);
                if (formatted !== e.target.value) {
                  setValue('phone', formatted, { shouldDirty: true });
                }
              },
              onBlur: (e) => {
                const formatted = formatPhone(e.target.value);
                if (formatted !== e.target.value) {
                  setValue('phone', formatted, { shouldDirty: true });
                  trigger('phone');
                }
              },
            })}
            placeholder="e.g. 0712345678"
            className="w-full h-12 sm:h-14 rounded-lg border px-4 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            style={{
              background: 'hsl(var(--input))',
              borderColor: errors.phone ? 'hsl(var(--destructive))' : 'hsl(var(--border))',
              color: 'hsl(var(--foreground))',
            }}
          />
          {errors.phone && (
            <p className="text-xs mt-1" style={{ color: 'hsl(var(--destructive))' }}>
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1.5"
            style={{ color: 'hsl(var(--foreground))' }}
          >
            Email{' '}
            <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              (optional)
            </span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            {...register('email')}
            placeholder="e.g. john@example.com"
            className="w-full h-12 sm:h-14 rounded-lg border px-4 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            style={{
              background: 'hsl(var(--input))',
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--foreground))',
            }}
          />
        </div>

        {/* Delivery Address */}
        <div>
          <label
            htmlFor="deliveryAddress"
            className="block text-sm font-medium mb-1.5"
            style={{ color: 'hsl(var(--foreground))' }}
          >
            Delivery Address <span style={{ color: 'hsl(var(--destructive))' }}>*</span>
          </label>
          <textarea
            id="deliveryAddress"
            autoComplete="street-address"
            {...register('deliveryAddress')}
            placeholder="e.g. Murang'a Town, near Post Office"
            rows={2}
            className="w-full min-h-[56px] rounded-lg border px-4 py-3.5 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            style={{
              background: 'hsl(var(--input))',
              borderColor: errors.deliveryAddress ? 'hsl(var(--destructive))' : 'hsl(var(--border))',
              color: 'hsl(var(--foreground))',
            }}
          />
          <p className="text-xs mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Free delivery within Murang'a Town &bull; Delivered in 2 hours
          </p>
          {errors.deliveryAddress && (
            <p className="text-xs mt-1" style={{ color: 'hsl(var(--destructive))' }}>
              {errors.deliveryAddress.message}
            </p>
          )}
        </div>

        {/* Delivery Time */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--foreground))' }}>
            Delivery Time
          </label>
          <div className="flex gap-2 sm:gap-3">
            {[
              { value: 'asap' as const, label: 'ASAP', sub: 'within 2 hrs', icon: Zap },
              { value: 'schedule' as const, label: 'Schedule', sub: 'pick a time', icon: CalendarClock },
            ].map((option) => {
              const Icon = option.icon;
              const isSelected = deliveryTime === option.value;
              return (
                <label
                  key={option.value}
                  className={`flex-1 flex flex-col items-center justify-center gap-1 px-2 sm:px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected ? 'ring-2 animate-glowPulse' : ''
                  }`}
                  style={{
                    background: isSelected ? 'hsl(var(--primary) / 0.15)' : 'hsl(var(--input))',
                    borderColor: isSelected ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                    color: isSelected ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                  }}
                >
                  <input type="radio" value={option.value} {...register('deliveryTime')} className="sr-only" />
                  <Icon className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-medium">{option.label}</span>
                  <span className="text-[10px] opacity-70">{option.sub}</span>
                </label>
              );
            })}
          </div>
          {deliveryTime === 'asap' && (
            <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <Clock className="w-3 h-3" />
              Estimated delivery by <strong>{eta}</strong> (within 2 hours)
            </p>
          )}
          {deliveryTime === 'schedule' && (
            <div>
              <input
                type="datetime-local"
                {...register('scheduledTime')}
                min={new Date().toISOString().slice(0, 16)}
                className="w-full h-12 sm:h-14 rounded-lg border px-4 text-base mt-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                style={{
                  background: 'hsl(var(--input))',
                  borderColor: errors.scheduledTime ? 'hsl(var(--destructive))' : 'hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                }}
              />
              {errors.scheduledTime && (
                <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'hsl(var(--destructive))' }}>
                  <AlertCircle className="w-3 h-3" />
                  {errors.scheduledTime.message}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Special Instructions */}
        <div>
          <label
            htmlFor="specialInstructions"
            className="block text-sm font-medium mb-1.5"
            style={{ color: 'hsl(var(--foreground))' }}
          >
            Special Instructions{' '}
            <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              (optional)
            </span>
          </label>
          <textarea
            id="specialInstructions"
            {...register('specialInstructions')}
            placeholder="Any special requests?"
            rows={2}
            maxLength={200}
            className="w-full min-h-[56px] rounded-lg border px-4 py-3.5 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            style={{
              background: 'hsl(var(--input))',
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--foreground))',
            }}
          />
          <p className="text-xs mt-1 text-right" style={{ color: (specialInstructions?.length || 0) > 180 ? 'hsl(var(--destructive))' : (specialInstructions?.length || 0) > 150 ? '#eab308' : 'hsl(var(--muted-foreground))' }}>
            {(specialInstructions?.length || 0)}/200
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex-shrink-0 p-4 sm:p-6 space-y-3"
        style={{ borderTop: '1px solid hsl(var(--border))' }}
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative w-full h-14 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-white flex items-center justify-center gap-2 overflow-hidden"
          style={{
            background: 'var(--gradient-primary)',
            boxShadow: '0 8px 25px hsl(var(--primary) / 0.4)',
          }}
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 pointer-events-none animate-shimmer" style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          }} />
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <MessageCircle className="w-5 h-5" />
          )}
          {isSubmitting ? 'Placing Order...' : 'Place Order via WhatsApp'}
        </button>
        <p className="text-xs text-center" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Your order details will be sent via WhatsApp for confirmation
        </p>
        <div className="flex items-center justify-center gap-4 text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3" /> Secure
          </span>
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3" /> Quality Guaranteed
          </span>
          <span className="flex items-center gap-1">
            <Truck className="w-3 h-3" /> Fast Delivery
          </span>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
