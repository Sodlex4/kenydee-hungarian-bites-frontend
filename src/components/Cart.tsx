
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { X, Plus, Minus, ShoppingCart, MessageCircle, Undo2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import CheckoutForm from './CheckoutForm';
import type { CheckoutFormData } from './CheckoutForm';
import { addOrder } from '../data/orders';

const Cart = () => {
  const { cartItems, isCartOpen, toggleCart, closeCart, updateQuantity, removeFromCart, undoRemove, clearCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const isPointerReady = useRef(false);
  const [pointerEventsEnabled, setPointerEventsEnabled] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout'>('cart');
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
        action: {
          label: <><Undo2 className="w-3 h-3" /> Undo</>,
          onClick: () => undoRemove()
        }
      });
      return;
    }
    updateQuantity(id, currentQty - 1);
  }, [updateQuantity, removeFromCart, undoRemove]);

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    setCheckoutStep('checkout');
  };

  const handleCheckoutSubmit = useCallback((data: CheckoutFormData) => {
    setIsPlacingOrder(true);

    const orderId = `#${Date.now().toString(36).toUpperCase()}`;
    const order = {
      id: orderId,
      customer: {
        name: data.name,
        email: '',
        phone: data.phone,
      },
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      amount: total,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending' as const,
      method: data.paymentMethod === 'mpesa' ? 'M-Pesa' as const : 'Cash' as const,
      deliveryAddress: data.deliveryAddress,
    };

    addOrder(order);

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

    const timeInfo = data.deliveryTime === 'asap'
      ? 'ASAP (within 2 hours)'
      : data.scheduledTime || 'Scheduled';
    const itemsList = cartItems.map(item =>
      `• ${item.name} × ${item.quantity} = Ksh ${item.price * item.quantity}`
    ).join('\n');
    const notes = data.specialInstructions
      ? `\n\n📝 Notes: ${data.specialInstructions}`
      : '';
    const message = `*Hungarian Bites - Order Confirmation*\n\n👤 *Name:* ${data.name}\n📞 *Phone:* ${data.phone}\n📍 *Delivery:* ${data.deliveryAddress}\n⏰ *Time:* ${timeInfo}\n💳 *Payment:* ${order.method}\n\n*Items:*\n${itemsList}\n\n*Total: Ksh ${total.toLocaleString()}*${notes}\n\n_Please confirm my order and delivery details._`;

    const whatsappUrl = `https://wa.me/254759233065?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    clearCart();
    setCheckoutStep('cart');
    setIsPlacingOrder(false);
    closeCart();
    toast.success('Order placed! Check WhatsApp for confirmation.', {
      duration: 5000,
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
    if (isCartOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
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
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
            {checkoutStep === 'cart' ? (
              <h2 className="text-xl font-bold flex items-center" style={{ color: 'hsl(var(--foreground))' }}>
                <ShoppingCart className="w-6 h-6 mr-2" style={{ color: 'hsl(var(--primary))' }} />
                Your Cart ({totalItems}{totalItems !== 1 ? ' items' : ' item'})
              </h2>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="p-2 rounded-full transition-colors hover:bg-gray-700"
                  aria-label="Back to cart"
                >
                  <ArrowLeft className="w-5 h-5" style={{ color: 'hsl(var(--muted-foreground))' }} />
                </button>
                <h2 className="text-xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                  Checkout
                </h2>
              </div>
            )}
            <button
              ref={checkoutStep === 'cart' ? firstFocusableRef : undefined}
              onClick={handleClose}
              className="p-2 rounded-full transition-colors hover:bg-gray-800"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" style={{ color: 'hsl(var(--muted-foreground))' }} />
            </button>
          </div>

          {checkoutStep === 'checkout' ? (
            <CheckoutForm
              cartItems={cartItems}
              total={total}
              totalItems={totalItems}
              onBack={() => setCheckoutStep('cart')}
              onSubmit={handleCheckoutSubmit}
              isSubmitting={isPlacingOrder}
            />
          ) : cartItems.length === 0 ? (
            <div className="flex-1 overflow-y-auto p-6">
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
              <div className="flex-1 overflow-y-auto p-6">
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
                          className="w-16 h-16 sm:w-14 sm:h-14 object-cover rounded-lg flex-shrink-0"
                          width="64"
                          height="64"
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
                                = Ksh {item.price * item.quantity}
                              </p>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id, item.name)}
                          className="p-1 rounded-full transition-colors hover:bg-red-500/20 flex-shrink-0"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <X className="w-4 h-4" style={{ color: 'hsl(var(--destructive) / 0.6)' }} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3" style={{ borderColor: 'hsl(var(--border) / 0.3)' }}>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDecrease(item.id, item.quantity)}
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-700"
                            style={{ background: 'hsl(var(--muted))' }}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" style={{ color: 'hsl(var(--foreground))' }} />
                          </button>

                          <span className="font-semibold w-8 text-center text-sm" style={{ color: 'hsl(var(--foreground))' }}>{item.quantity}</span>

                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-700"
                            style={{ background: 'hsl(var(--muted))' }}
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" style={{ color: 'hsl(var(--foreground))' }} />
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

              <div className="border-t p-6 space-y-4 flex-shrink-0" style={{ borderColor: 'hsl(var(--border))' }}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    <span>{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
                    <span>Ksh {total}</span>
                  </div>
                  <div className="flex items-center justify-between text-xl font-bold">
                    <span style={{ color: 'hsl(var(--foreground))' }}>Total:</span>
                    <span style={{ color: 'hsl(var(--primary))' }}>Ksh {total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg text-white flex items-center justify-center gap-2"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
