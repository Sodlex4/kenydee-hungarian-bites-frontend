import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Package, Clock, MessageCircle, Mail, Phone, Smartphone, Banknote } from 'lucide-react';
import type { CartItem } from '../context/CartContext';

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
  paymentMethod: z.enum(['mpesa', 'cash']),
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
  onBack,
  onSubmit,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryTime: 'asap',
      paymentMethod: 'mpesa',
      specialInstructions: '',
      scheduledTime: '',
    },
  });

  const deliveryTime = watch('deliveryTime');
  const paymentMethod = watch('paymentMethod');
  const specialInstructions = watch('specialInstructions');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {/* Order Summary */}
        <div
          className="rounded-xl p-4 space-y-2"
          style={{
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border) / 0.5)',
          }}
        >
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
            {...register('name')}
            placeholder="e.g. John Kamau"
            className="w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2"
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
            {...register('phone')}
            placeholder="e.g. +254712345678"
            className="w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2"
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
            {...register('email')}
            placeholder="e.g. john@example.com"
            className="w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2"
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
            {...register('deliveryAddress')}
            placeholder="e.g. Murang'a Town, near Post Office"
            rows={2}
            className="w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 resize-none"
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
              { value: 'asap' as const, label: 'ASAP', sub: 'within 2 hrs' },
              { value: 'schedule' as const, label: 'Schedule', sub: 'pick a time' },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex-1 flex flex-col items-center justify-center gap-1 px-2 sm:px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${
                  deliveryTime === option.value ? 'ring-2' : ''
                }`}
                style={{
                  background: deliveryTime === option.value ? 'hsl(var(--primary) / 0.15)' : 'hsl(var(--input))',
                  borderColor: deliveryTime === option.value ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                  color: deliveryTime === option.value ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                  ringColor: deliveryTime === option.value ? 'hsl(var(--primary))' : 'transparent',
                }}
              >
                <input type="radio" value={option.value} {...register('deliveryTime')} className="sr-only" />
                <Clock className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-medium">{option.label}</span>
                <span className="text-[10px] opacity-70">{option.sub}</span>
              </label>
            ))}
          </div>
          {deliveryTime === 'schedule' && (
            <div>
              <input
                type="datetime-local"
                {...register('scheduledTime')}
                min={new Date().toISOString().slice(0, 16)}
                className="w-full rounded-lg border px-3 py-2 text-sm mt-2 transition-colors focus:outline-none focus:ring-2"
                style={{
                  background: 'hsl(var(--input))',
                  borderColor: errors.scheduledTime ? 'hsl(var(--destructive))' : 'hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                }}
              />
              {errors.scheduledTime && (
                <p className="text-xs mt-1" style={{ color: 'hsl(var(--destructive))' }}>
                  {errors.scheduledTime.message}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--foreground))' }}>
            Payment Method <span style={{ color: 'hsl(var(--destructive))' }}>*</span>
          </label>
          <div className="flex sm:flex-row flex-col gap-2 sm:gap-3">
            {[
              { value: 'mpesa' as const, label: 'M-Pesa' },
              { value: 'cash' as const, label: 'Cash on Delivery' },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 sm:py-2.5 rounded-lg border font-medium cursor-pointer transition-all ${
                  paymentMethod === option.value ? 'ring-2' : ''
                }`}
                style={{
                  background: paymentMethod === option.value ? 'hsl(var(--primary) / 0.15)' : 'hsl(var(--input))',
                  borderColor: paymentMethod === option.value ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                  color: paymentMethod === option.value ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                }}
              >
                <input
                  type="radio"
                  value={option.value}
                  {...register('paymentMethod')}
                  className="sr-only"
                />
                {option.value === 'mpesa' ? (
                  <Smartphone className="w-5 h-5" style={{ color: '#4CAF50' }} />
                ) : (
                  <Banknote className="w-5 h-5" />
                )}
                <span className="text-xs sm:text-sm font-medium">{option.label}</span>
              </label>
            ))}
          </div>
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
            className="w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 resize-none"
            style={{
              background: 'hsl(var(--input))',
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--foreground))',
            }}
          />
          <p className="text-xs mt-1 text-right" style={{ color: (specialInstructions?.length || 0) > 180 ? 'hsl(var(--destructive))' : 'hsl(var(--muted-foreground))' }}>
            {(specialInstructions?.length || 0)}/200
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex-shrink-0 p-4 sm:p-6 space-y-3"
        style={{ borderTop: '1px solid hsl(var(--border))' }}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-lg" style={{
            background: '#25D366',
            animation: 'wa-pulse 2s ease-in-out infinite',
            opacity: 0.3,
          }} />
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              background: '#25D366',
              boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)',
            }}
          >
            <MessageCircle className="w-5 h-5" />
            {isSubmitting ? 'Placing Order...' : 'Place Order via WhatsApp'}
          </button>
        </div>
        <p className="text-xs text-center" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Your order details will be sent via WhatsApp for confirmation
        </p>
      </div>
    </form>
  );
};

export default CheckoutForm;
