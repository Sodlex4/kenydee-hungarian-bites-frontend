
import { useEffect, useRef, useCallback, useState } from 'react';
import { X, Plus, Minus, ShoppingCart, MessageCircle, Undo2, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import CheckoutForm from './CheckoutForm';
import type { CheckoutFormData } from './CheckoutForm';
import { addOrder, addNotification, getAdminSettings } from '../lib/api';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { WHATSAPP_NUMBER } from '../lib/env';

const Cart = () => {
  const { cartItems, isCartOpen, closeCart, updateQuantity, removeFromCart, undoRemove, clearCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const isPointerReady = useRef(false);
  const [pointerEventsEnabled, setPointerEventsEnabled] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      isPointerReady.current = false;
      setPointerEventsEnabled(false);
      const timer = setTimeout(() => {
        isPointerReady.current = true;
        setPointerEventsEnabled(true);
      }, 350);
      return () => clearTimeout(timer);
    } else {
      setCheckoutStep('cart');
    }
  }, [isCartOpen]);

  const total = cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const handleBackdropClick = () => {
    if (isPointerReady.current) {
      closeCart();
    }
  };

  const handleRemove = useCallback((id: string, name: string) => {
    removeFromCart(id);
    toast.info(`Removed ${name}`, {
      duration: 6000,
      action: {
        label: <><Undo2 className="w-3 h-3" /> Undo</>,
        onClick: () => undoRemove()
      }
    });
  }, [removeFromCart, undoRemove]);

  const handleDecrease = useCallback((id: string, currentQty: number) => {
    if (currentQty <= 1) {
      removeFromCart(id);
      toast.info('Item removed from cart', {
        duration: 6000,
        action: {
          label: <><Undo2 className="w-3 h-3" /> Undo</>,
          onClick: () => undoRemove()
        }
      });
      return;
    }
    updateQuantity(id, currentQty - 1);
  }, [updateQuantity, removeFromCart, undoRemove]);

  const MIN_ORDER_AMOUNT = 200;

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    if (total < MIN_ORDER_AMOUNT) {
      toast.error(`Minimum order is Ksh ${MIN_ORDER_AMOUNT.toLocaleString()}. Add Ksh ${(MIN_ORDER_AMOUNT - total).toLocaleString()} more.`);
      return;
    }
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'begin_checkout', {
        currency: 'KES',
        value: total,
        items: cartItems.map(item => ({
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      });
    }
    setCheckoutStep('checkout');
  };

  const handleCheckoutSubmit = useCallback(async (data: CheckoutFormData) => {
    setIsPlacingOrder(true);

    const settings = await getAdminSettings();
    const waMatch = settings.whatsapp.match(/wa\.me\/(\d+)/);
    const waNumber = waMatch ? waMatch[1] : WHATSAPP_NUMBER;

    const cleanedPhone = data.phone.replace(/[\s\-()]/g, '');
    const orderId = `#${Date.now().toString(36).toUpperCase()}`;
    const order = {
      id: orderId,
      customer: {
        name: data.name,
        email: data.email || '',
        phone: cleanedPhone,
      },
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      amount: total,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending' as const,
      deliveryAddress: data.deliveryAddress,
    };

    await addOrder(order);
    await addNotification({
      type: 'order',
      title: 'New Order Received',
      message: `Order ${orderId} from ${data.name} - ${cartItems.map(i => `${i.quantity}x ${i.name}`).join(', ')}`,
      time: 'Just now',
      read: false,
    });

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'purchase', {
        transaction_id: orderId,
        currency: 'KES',
        value: total,
        items: cartItems.map(item => ({
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      });
    }

    const timeInfo = data.deliveryTime === 'asap'
      ? 'ASAP (within 2 hours)'
      : data.scheduledTime
        ? new Date(data.scheduledTime).toLocaleString('en-KE', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })
        : 'Scheduled';
    const itemsList = cartItems.map(item =>
      `• ${item.name} × ${item.quantity} = Ksh ${item.price * item.quantity}`
    ).join('\n');
    const notes = data.specialInstructions
      ? `\n\n📝 Notes: ${data.specialInstructions}`
      : '';
    const emailLine = data.email ? `\n📧 *Email:* ${data.email}` : '';
    const message = `*Hungarian Bites - Order Confirmation*\n\n👤 *Name:* ${data.name}\n📞 *Phone:* ${cleanedPhone}${emailLine}\n📍 *Delivery:* ${data.deliveryAddress}\n⏰ *Time:* ${timeInfo}\n\n*Items:*\n${itemsList}\n\n*Total: Ksh ${total.toLocaleString()}*${notes}\n\n_Please confirm my order and delivery details._`;

    const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    const waWindow = window.open(whatsappUrl, '_blank');
    if (!waWindow || waWindow.closed) {
      window.location.href = whatsappUrl;
    }

    setIsPlacingOrder(false);
    setCheckoutStep('confirmed');

    setTimeout(() => {
      clearCart();
      closeCart();
    }, 3500);

    toast.success('Order saved! Please send the message in WhatsApp to confirm.', {
      duration: 6000,
    });
  }, [cartItems, total, clearCart, closeCart]);

  const handleClose = useCallback(() => {
    closeCart();
    setTimeout(() => {
      const cartButton = document.querySelector('[aria-label*="Shopping cart"]') as HTMLButtonElement;
      cartButton?.focus();
    }, 0);
  }, [closeCart]);

  useEffect(() => {
    if (!isCartOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !drawerRef.current) return;
      if (window.innerWidth < 768) return;

      const focusable = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', trapFocus);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', trapFocus);
    };
  }, [isCartOpen, handleClose]);

  useEffect(() => {
    if (checkoutStep === 'checkout') {
      const timer = setTimeout(() => {
        const nameInput = document.querySelector<HTMLInputElement>('#name');
        nameInput?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
    if (isCartOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [isCartOpen, checkoutStep]);

  const renderCartContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 sm:p-6 border-b" data-vaul-no-drag style={{ borderColor: 'hsl(var(--border))' }}>
        {checkoutStep === 'cart' ? (
          <h2 className="text-xl font-bold flex items-center" style={{ color: 'hsl(var(--foreground))' }}>
            <ShoppingCart className="w-6 h-6 mr-2" style={{ color: 'hsl(var(--primary))' }} />
            Your Cart ({totalItems}{totalItems !== 1 ? ' items' : ' item'})
          </h2>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCheckoutStep('cart')}
              className="p-2.5 rounded-full transition-all duration-200 active:scale-90"
              style={{
                background: 'hsl(var(--muted))',
                color: 'hsl(var(--muted-foreground))',
              }}
              aria-label="Back to cart"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
              Checkout
            </h2>
          </div>
        )}
        <button
          ref={checkoutStep === 'cart' ? firstFocusableRef : undefined}
          onClick={handleClose}
          className="p-3 rounded-full transition-colors"
          style={{
            color: 'hsl(var(--muted-foreground))',
          }}
          aria-label="Close cart"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {checkoutStep === 'confirmed' ? (
        <div className="flex flex-col items-center justify-center flex-1 p-4 sm:p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(34, 197, 94, 0.15)' }}>
            <Check className="w-8 h-8" style={{ color: '#22c55e' }} />
          </div>
          <div>
            <h3 className="text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>
              Order Saved!
            </h3>
            <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Your order is saved. Please send the message in WhatsApp to confirm it.
            </p>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'hsl(var(--primary))', borderTopColor: 'transparent' }} />
          <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Closing automatically...
          </p>
        </div>
      ) : null}

      <div className={checkoutStep === 'checkout' ? 'flex-1 flex flex-col overflow-hidden' : 'hidden'}>
        <CheckoutForm
          cartItems={cartItems}
          total={total}
          totalItems={totalItems}
          onBack={() => setCheckoutStep('cart')}
          onSubmit={handleCheckoutSubmit}
          isSubmitting={isPlacingOrder}
        />
      </div>

      {checkoutStep !== 'checkout' && checkoutStep !== 'confirmed' ? (
        cartItems.length === 0 ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{
                background: 'hsl(var(--muted) / 0.3)'
              }}>
                <ShoppingCart className="w-10 h-10" style={{ color: 'hsl(var(--muted))' }} />
              </div>
              <p className="text-lg font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Your cart is empty</p>
              <p className="text-sm mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Bites from Ksh 69/piece</p>
              <p className="text-sm mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>Free delivery within Murang'a Town</p>
              <button
                onClick={() => {
                  closeCart();
                  document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 text-white"
                style={{
                  background: 'var(--gradient-primary)',
                  boxShadow: '0 4px 15px hsl(var(--primary) / 0.3)'
                }}
              >
                Browse Products
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6" data-vaul-no-drag>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="rounded-lg p-3 sm:p-4" style={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border) / 0.5)'
                  }}>
                    <div className="flex items-start gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                        width="56"
                        height="56"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm leading-tight mb-1 truncate" style={{ color: 'hsl(var(--foreground))' }}>
                          {item.name}
                        </h3>
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                            Ksh {item.price} each
                          </p>
                          {item.quantity > 1 && (
                            <p className="font-bold text-sm" style={{ color: 'hsl(var(--primary))' }}>
                              = Ksh {(item.price * item.quantity).toLocaleString()}
                            </p>
                          )}
                        </div>
                        {item.stock !== undefined && item.stock <= 5 && item.stock > 0 && (
                          <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#eab308' }}>
                            Only {item.stock} left
                          </p>
                        )}
                        {item.stock !== undefined && item.stock === 0 && (
                          <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'hsl(var(--destructive))' }}>
                            Currently out of stock
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleRemove(item.id, item.name)}
                        className="p-2.5 rounded-full transition-colors hover:bg-red-500/20 flex-shrink-0"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <X className="w-4 h-4" style={{ color: 'hsl(var(--destructive) / 0.6)' }} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3" style={{ borderColor: 'hsl(var(--border) / 0.3)' }}>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDecrease(item.id, item.quantity)}
                          className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                          style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>

                        <span className="font-semibold w-10 text-center text-sm" style={{ color: 'hsl(var(--foreground))' }}>{item.quantity}</span>

                        <button
                          onClick={() => {
                            if (item.stock !== undefined && item.quantity >= item.stock) {
                              toast.warning(`Only ${item.stock} available`);
                              return;
                            }
                            updateQuantity(item.id, item.quantity + 1);
                          }}
                          className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                          style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="font-bold text-sm" style={{ color: 'hsl(var(--primary))' }}>
                        Ksh {item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t p-4 sm:p-6 space-y-4 flex-shrink-0" data-vaul-no-drag style={{ borderColor: 'hsl(var(--border))' }}>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <span>{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
                  <span>Ksh {total.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: 'hsl(var(--muted-foreground))' }}>Delivery</span>
                  <span style={{ color: '#22c55e' }}>Free</span>
                </div>
              <div className="flex items-center justify-between text-xl font-bold">
                <span style={{ color: 'hsl(var(--foreground))' }}>Total:</span>
                <span style={{ color: 'hsl(var(--primary))' }}>Ksh {total.toLocaleString()}</span>
              </div>
            </div>

            {total < MIN_ORDER_AMOUNT && (
                <p className="text-xs text-center" style={{ color: 'hsl(var(--destructive))' }}>
                  Minimum order is Ksh {MIN_ORDER_AMOUNT.toLocaleString()} (Ksh {(MIN_ORDER_AMOUNT - total).toLocaleString()} more needed)
                </p>
              )}

              <button
                onClick={handleProceedToCheckout}
                disabled={total < MIN_ORDER_AMOUNT}
                className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: 'var(--gradient-primary)',
                  boxShadow: '0 10px 30px hsl(var(--primary) / 0.3)'
                }}
              >
                <MessageCircle className="w-5 h-5" />
                Continue to Checkout
              </button>

              <p className="text-xs text-center" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Free delivery within Murang'a Town &bull; Delivered in 2 hours
              </p>
            </div>
          </>
        )
      ) : null}
    </div>
  );

  if (!isCartOpen) return null;

  return (
    <>
      <div className="md:hidden">
        <Drawer open={isCartOpen} onOpenChange={(open) => { if (!open) closeCart(); }}>
          <DrawerContent className="h-[95dvh] max-h-[95vh] [margin-top:0] pt-8 border-0 rounded-t-[10px]">
            {renderCartContent()}
          </DrawerContent>
        </Drawer>
      </div>

      <div className="hidden md:flex fixed inset-0 z-50">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={handleBackdropClick}
          style={{ pointerEvents: pointerEventsEnabled ? 'auto' : 'none', touchAction: 'none' }}
          aria-hidden="true"
        ></div>

        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
          className="ml-auto w-full max-w-md shadow-2xl animate-slideInRight"
          style={{ background: 'hsl(var(--background))', height: '100dvh' }}
        >
          {renderCartContent()}
        </div>
      </div>
    </>
  );
};

export default Cart;
