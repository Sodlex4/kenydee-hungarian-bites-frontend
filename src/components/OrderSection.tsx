
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
      
      // Track Google Analytics event
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
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="mb-4">
          <div className="inline-block bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-500/30 rounded-full px-6 py-2 text-pink-300 text-sm font-medium mb-6">
            ✨ Limited Time Offers
          </div>
        </div>

        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Ready to <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Experience</span> Perfection?
        </h2>
        
        <p className="text-gray-300 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
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
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-1 shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                {/* Savings Badge */}
                {pkg.savings && !pkg.popular && (
                  <div className="absolute -top-3 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    Save Ksh {pkg.savings}
                  </div>
                )}

                {/* Card */}
                <div className={`bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-xl border-2 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20 ${
                  selectedQuantity === pkg.id
                    ? 'border-pink-500 bg-gradient-to-br from-pink-500/20 to-purple-500/20'
                    : 'border-pink-500/20 hover:border-pink-500/40'
                }`}>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">{pkg.label}</h3>
                    
                    <div className="mb-6">
                      <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        Ksh {pkg.price}
                      </div>
                      {pkg.originalPrice !== pkg.price && (
                        <div className="text-gray-400 line-through text-lg mt-1">
                          Ksh {pkg.originalPrice}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-gray-300 text-sm mb-4">
                      Ksh {Math.round(pkg.price / parseInt(pkg.label))} per piece
                    </div>

                    {/* Selection Indicator */}
                    <div className={`w-6 h-6 rounded-full mx-auto transition-all duration-300 ${
                      selectedQuantity === pkg.id
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg'
                        : 'border-2 border-gray-400'
                    }`}>
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
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-pink-500/50 hover:scale-105'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!selectedQuantity}
          >
            Add to Cart
          </button>

          <div className="mt-8 grid md:grid-cols-3 gap-4 text-gray-400 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span>Free delivery to your doorstep within Murang'a</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Fresh within 2 hours</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span>100% satisfaction guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
