
import React from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const Cart = () => {
  const { cartItems, isCartOpen, toggleCart, updateQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
      gtag('event', 'begin_checkout', {
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

    const message = `Hello! I'd like to order:${cartItems.map(item =>
      `\n• ${item.name} (Qty: ${item.quantity}) - Ksh ${item.price * item.quantity}`
    ).join('')}\n\nTotal: Ksh ${total}\n\nPlease confirm my order and delivery details.`;

    const whatsappUrl = `https://wa.me/254700123456?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast.success('Redirecting to WhatsApp for order confirmation!');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={toggleCart}
        aria-hidden="true"
      ></div>

      <div className="ml-auto w-full max-w-md shadow-2xl" style={{
        background: 'hsl(var(--background))'
      }}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
            <h2 className="text-xl font-bold flex items-center" style={{ color: 'hsl(var(--foreground))' }}>
              <ShoppingCart className="w-6 h-6 mr-2" style={{ color: 'hsl(var(--primary))' }} />
              Your Cart ({cartItems.length})
            </h2>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" style={{ color: 'hsl(var(--muted-foreground))' }} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4" style={{ color: 'hsl(var(--muted))' }} />
                <p className="text-lg" style={{ color: 'hsl(var(--muted-foreground))' }}>Your cart is empty</p>
                <p className="text-sm mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>Add some delicious hot dog rolls!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="rounded-lg p-4 flex items-center space-x-4" style={{
                    background: 'hsl(var(--card))'
                  }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium text-sm leading-tight" style={{ color: 'hsl(var(--foreground))' }}>{item.name}</h3>
                      <p className="font-bold" style={{ color: 'hsl(var(--primary))' }}>Ksh {item.price}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        style={{ background: 'hsl(var(--muted))' }}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" style={{ color: 'hsl(var(--foreground))' }} />
                      </button>

                      <span className="font-medium w-8 text-center" style={{ color: 'hsl(var(--foreground))' }}>{item.quantity}</span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        style={{ background: 'hsl(var(--muted))' }}
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" style={{ color: 'hsl(var(--foreground))' }} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                      aria-label="Remove item from cart"
                    >
                      <X className="w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t p-6 space-y-4" style={{ borderColor: 'hsl(var(--border))' }}>
              <div className="flex items-center justify-between text-xl font-bold">
                <span style={{ color: 'hsl(var(--foreground))' }}>Total:</span>
                <span style={{ color: 'hsl(var(--primary))' }}>Ksh {total}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg text-white"
                style={{
                  background: 'var(--gradient-primary)'
                }}
              >
                Order via WhatsApp
              </button>

              <p className="text-xs text-center" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Free delivery within Murang'a Town • Delivered in 2 hours
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
