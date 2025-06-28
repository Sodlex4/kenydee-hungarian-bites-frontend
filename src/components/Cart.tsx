
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

    // Track Google Analytics event
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

    // Create WhatsApp message
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
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={toggleCart}
        aria-hidden="true"
      ></div>

      {/* Cart Panel */}
      <div className="ml-auto w-full max-w-md bg-gray-900 shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white flex items-center">
              <ShoppingCart className="w-6 h-6 mr-2 text-orange-500" />
              Your Cart ({cartItems.length})
            </h2>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Your cart is empty</p>
                <p className="text-gray-500 text-sm mt-2">Add some delicious hot dog rolls!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-sm leading-tight">{item.name}</h3>
                      <p className="text-orange-500 font-bold">Ksh {item.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4 text-white" />
                      </button>
                      
                      <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                      aria-label="Remove item from cart"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-700 p-6 space-y-4">
              <div className="flex items-center justify-between text-xl font-bold text-white">
                <span>Total:</span>
                <span className="text-orange-500">Ksh {total}</span>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Order via WhatsApp
              </button>
              
              <p className="text-gray-400 text-xs text-center">
                🚚 Free delivery within Nairobi • ⏰ Delivered in 2 hours
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
