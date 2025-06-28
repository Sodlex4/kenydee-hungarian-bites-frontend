
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const OrderSection = () => {
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const { addToCart } = useCart();

  const packages = [
    { id: '5pieces', label: '5 Pieces', price: 350, originalPrice: 350 },
    { id: '10pieces', label: '10 Pieces', price: 650, originalPrice: 700, savings: 50 },
    { id: '20pieces', label: '20 Pieces', price: 1200, originalPrice: 1400, savings: 200 }
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
    <section id="order" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Ready to <span className="text-orange-500">Order?</span>
        </h2>
        
        <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
          Get your Hungarian Hot Dog Rolls delivered fresh and hot to your doorstep. 
          Perfect for snacks, parties, or whenever you crave something delicious!
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedQuantity === pkg.id
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-gray-600 hover:border-orange-500/50'
                }`}
                onClick={() => setSelectedQuantity(pkg.id)}
                role="radio"
                aria-checked={selectedQuantity === pkg.id}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedQuantity(pkg.id)}
              >
                {pkg.savings && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Save Ksh {pkg.savings}
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{pkg.label}</h3>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-orange-500">
                      Ksh {pkg.price}
                    </div>
                    {pkg.originalPrice !== pkg.price && (
                      <div className="text-gray-400 line-through text-lg">
                        Ksh {pkg.originalPrice}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-gray-300 text-sm">
                    Ksh {Math.round(pkg.price / parseInt(pkg.label))} per piece
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 ${
              selectedQuantity
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl hover:shadow-orange-500/30'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!selectedQuantity}
            aria-label="Add selected package to cart"
          >
            Add to Cart
          </button>

          <div className="mt-8 text-gray-400 text-sm space-y-2">
            <p>🚚 Free delivery within Nairobi</p>
            <p>⏰ Delivered fresh within 2 hours</p>
            <p>💯 100% satisfaction guaranteed</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
