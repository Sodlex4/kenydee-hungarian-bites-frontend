
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';

const OrderSection = () => {
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const { addToCart } = useCart();

  const packages = [
    { id: '5pieces', label: '5 Pieces', price: 350, originalPrice: 350, popular: false },
    { id: '10pieces', label: '10 Pieces', price: 650, originalPrice: 700, savings: 50, popular: true },
    { id: '20pieces', label: '20 Pieces', price: 1200, originalPrice: 1400, savings: 200, popular: false }
  ];

  const handleAddToCart = () => {
    if (!selectedQuantity) {
      toast.error('Please select a package first!');
      return;
    }

    const selectedPackage = packages.find(pkg => pkg.id === selectedQuantity);
    if (selectedPackage) {
      addToCart({
        id: selectedPackage.id,
        name: `Hungarian Hot Dog Rolls - ${selectedPackage.label}`,
        price: selectedPackage.price,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop&crop=center"
      });

      toast.success(`Added ${selectedPackage.label} to cart!`);

      if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
        gtag('event', 'add_to_cart', {
          currency: 'KES',
          value: selectedPackage.price,
          items: [{
            item_id: selectedPackage.id,
            item_name: selectedPackage.label,
            price: selectedPackage.price,
            quantity: 1
          }]
        });
      }
    }
  };

  return (
    <section id="order" className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ background: 'hsl(var(--primary) / 0.1)' }}></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ background: 'hsl(var(--accent) / 0.1)' }}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="mb-4">
          <div className="inline-block backdrop-blur-sm border rounded-full px-6 py-2 text-sm font-medium mb-6" style={{
            background: 'hsl(var(--primary) / 0.2)',
            borderColor: 'hsl(var(--primary) / 0.3)',
            color: 'hsl(var(--primary))'
          }}>
            Limited Time Offers
          </div>
        </div>

        <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'hsl(var(--foreground))' }}>
          Ready to <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Experience</span> Perfection?
        </h2>

        <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Choose your perfect package and let us deliver authentic Hungarian flavors
          straight to your doorstep within 2 hours.
        </p>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative cursor-pointer transition-all duration-500 hover:scale-105 ${
                  selectedQuantity === pkg.id ? 'scale-105' : ''
                }`}
                onClick={() => setSelectedQuantity(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-1 shadow-lg" style={{
                      background: 'var(--gradient-primary)'
                    }}>
                      <Sparkles className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                {pkg.savings && !pkg.popular && (
                  <div className="absolute -top-3 right-4 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg" style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))'
                  }}>
                    Save Ksh {pkg.savings}
                  </div>
                )}

                <div className={`backdrop-blur-xl border-2 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl ${
                  selectedQuantity === pkg.id
                    ? 'border-pink-500'
                    : 'hover:border-pink-500/40'
                }`} style={{
                  background: selectedQuantity === pkg.id
                    ? 'hsl(var(--primary) / 0.2)'
                    : 'hsl(var(--card) / 0.5)',
                  borderColor: selectedQuantity === pkg.id
                    ? 'hsl(var(--primary))'
                    : 'hsl(var(--primary) / 0.2)'
                }}>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4" style={{ color: 'hsl(var(--foreground))' }}>{pkg.label}</h3>

                    <div className="mb-6">
                      <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        Ksh {pkg.price}
                      </div>
                      {pkg.originalPrice !== pkg.price && (
                        <div className="text-lg mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          <span className="line-through">Ksh {pkg.originalPrice}</span>
                        </div>
                      )}
                    </div>

                    <div className="text-sm mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      Ksh {Math.round(pkg.price / parseInt(pkg.label))} per piece
                    </div>

                    <div className={`w-6 h-6 rounded-full mx-auto transition-all duration-300 ${
                      selectedQuantity === pkg.id
                        ? 'shadow-lg'
                        : 'border-2 border-gray-400'
                    }`} style={{
                      background: selectedQuantity === pkg.id ? 'var(--gradient-primary)' : 'transparent'
                    }}>
                      {selectedQuantity === pkg.id && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-2"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
              selectedQuantity
                ? 'hover:scale-105'
                : 'cursor-not-allowed'
            }`}
            disabled={!selectedQuantity}
            style={{
              background: selectedQuantity ? 'var(--gradient-primary)' : 'hsl(var(--muted))',
              color: selectedQuantity ? 'white' : 'hsl(var(--muted-foreground))',
              boxShadow: selectedQuantity ? '0 10px 30px hsl(var(--primary) / 0.3)' : 'none'
            }}
          >
            Add to Cart
          </button>

          <div className="mt-8 grid md:grid-cols-3 gap-4 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(var(--primary))' }}></div>
              <span>Free delivery to your doorstep within Murang'a</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(var(--accent))' }}></div>
              <span>Fresh within 2 hours</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(var(--indigo))' }}></div>
              <span>100% satisfaction guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
