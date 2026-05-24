
import { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { Sparkles, MessageCircle, Plus, Minus } from 'lucide-react';
import { WHATSAPP_NUMBER, API_URL } from '../lib/env';

interface Package {
  id: string;
  label: string;
  pieces: number;
  price: number;
  originalPrice: number;
  savings?: number;
  popular: boolean;
  image: string;
  fallback: string;
  stock: number;
}

const defaultPackages: Package[] = [
  { id: '5pieces', label: '5 Pieces', pieces: 5, price: 350, originalPrice: 350, popular: false, image: '/image/hotdog.webp', fallback: '/image/hotdog.jpg', stock: 120 },
  { id: '10pieces', label: '10 Pieces', pieces: 10, price: 650, originalPrice: 700, savings: 50, popular: true, image: '/image/cheese-dog-bread-rolls.webp', fallback: '/image/hotdog.jpg', stock: 85 },
  { id: '20pieces', label: '20 Pieces', pieces: 20, price: 1200, originalPrice: 1400, savings: 200, popular: false, image: '/image/hotdog.webp', fallback: '/image/hotdog.jpg', stock: 15 },
];

function parsePieces(name: string): number {
  const match = name.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function mapApiToPackages(api: { id: number; name: string; price: number; stock: number; image: string }[]): Package[] {
  return api.map((p, i) => {
    const pieces = parsePieces(p.name);
    const basePrice = pieces * 70;
    const originalPrice = p.price + (pieces * (i === 1 ? 5 : i === 2 ? 10 : 0));
    return {
      id: `${pieces}pieces`,
      label: `${pieces} Pieces`,
      pieces,
      price: p.price,
      originalPrice,
      savings: originalPrice > p.price ? originalPrice - p.price : undefined,
      popular: i === 1,
      image: p.image,
      fallback: p.image.replace(/\.webp$/, '.jpg'),
      stock: p.stock,
    };
  });
}

const OrderSection = () => {
  const [packages, setPackages] = useState<Package[]>(defaultPackages);
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [packageQty, setPackageQty] = useState<{ [key: string]: number }>({});
  const [isAdding, setIsAdding] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const { addToCartAndOpen } = useCart();
  const mountTime = useRef(Date.now());

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_URL}/products`)
      .then(res => { if (!res.ok) throw new Error('Failed to fetch'); return res.json(); })
      .then(data => { if (!cancelled) setPackages(mapApiToPackages(data)); })
      .catch(() => { if (!cancelled) setPackages(defaultPackages); })
    return () => { cancelled = true; };
  }, []);

  const getQty = (id: string) => packageQty[id] || 1;

  const handleQtyChange = (id: string, delta: number) => {
    setPackageQty(prev => ({
      ...prev,
      [id]: Math.max(1, Math.min(50, (prev[id] || 1) + delta))
    }));
  };

  const handleAddToCart = () => {
    if (!selectedQuantity) {
      toast.error('Please select a package first!');
      return;
    }

    if (isAdding) return;

    const selectedPackage = packages.find(pkg => pkg.id === selectedQuantity);
    if (selectedPackage) {
      const qty = getQty(selectedPackage.id);
      if (selectedPackage.stock !== undefined && qty > selectedPackage.stock) {
        toast.error(`Only ${selectedPackage.stock} available. Please reduce quantity.`);
        return;
      }
      setIsAdding(true);
      addToCartAndOpen({
        id: selectedPackage.id,
        name: `Hungarian Hot Dog Rolls - ${selectedPackage.label}`,
        price: selectedPackage.price,
        quantity: qty,
        image: selectedPackage.image,
        stock: selectedPackage.stock,
      });

      toast.success(`Added ${qty}x ${selectedPackage.label} to cart!`);

      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'add_to_cart', {
          currency: 'KES',
          value: selectedPackage.price * qty,
          items: [{
            item_id: selectedPackage.id,
            item_name: selectedPackage.label,
            price: selectedPackage.price,
            quantity: qty
          }]
        });
      }

      setTimeout(() => setIsAdding(false), 1000);
    }
  };

  const handleQuickWhatsApp = () => {
    fetch(`${API_URL}/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'order',
        title: 'New WhatsApp Inquiry',
        message: 'A customer is inquiring about products via WhatsApp.',
        time: 'Just now',
        read: false,
      }),
    }).catch(() => {});
    const message = `Hello! I'd like to order Hungarian Hot Dog Rolls. Please confirm availability and delivery details.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="order" className="py-20 relative overflow-hidden section-gradient-order">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ background: 'hsl(var(--primary) / 0.1)' }}></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ background: 'hsl(var(--accent) / 0.1)' }}></div>
      </div>

      <div className="container text-center relative z-10">
        <div className="mb-4">
          <div className="badge-chip">
            Limited Time Offers
          </div>
        </div>

        <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'hsl(var(--foreground))' }}>
          Ready to <span className="text-gradient-primary">Experience</span> Perfection?
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
                role="radio"
                aria-checked={selectedQuantity === pkg.id}
                aria-label={`${pkg.label} - Ksh ${pkg.price}`}
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

                <div className={`border-2 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl ${
                  selectedQuantity === pkg.id
                    ? 'glass-card border-pink-500'
                    : 'glass-card hover:border-pink-500/40'
                }`}>

                  <div className="text-center">
                    <div className="relative mb-4" style={{ minHeight: '128px' }}>
                      <div className={`absolute inset-0 rounded-xl bg-muted animate-pulse transition-opacity duration-500 ${loadedImages.has(pkg.id) ? 'opacity-0 pointer-events-none' : ''}`} />
                      <picture>
                        <source srcSet={`${pkg.image}?v=${mountTime.current}`} type="image/webp" />
                        <img
                          src={`${pkg.fallback}?v=${mountTime.current}`}
                          alt={pkg.label}
                          className="w-full h-32 object-cover rounded-xl relative z-10"
                          width="300"
                          height="128"
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, 300px"
                          style={{ background: 'transparent' }}
                          onLoad={() => setLoadedImages(prev => new Set(prev).add(pkg.id))}
                          onError={(e) => {
                            setLoadedImages(prev => new Set(prev).add(pkg.id));
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                          ref={(el) => {
                            if (el && el.complete) {
                              setLoadedImages(prev => {
                                if (prev.has(pkg.id)) return prev;
                                return new Set(prev).add(pkg.id);
                              });
                            }
                          }}
                        />
                      </picture>
                      <div className="absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md" style={{
                        background: pkg.id === '20pieces' ? 'hsl(142 70% 40%)' : pkg.id === '10pieces' ? 'hsl(var(--primary))' : 'hsl(30 80% 50%)'
                      }}>
                        {pkg.id === '5pieces' ? '🔥 Starter' : pkg.id === '10pieces' ? '⭐ Popular' : '💰 Best Value'}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4" style={{ color: 'hsl(var(--foreground))' }}>{pkg.label}</h3>

                    <div className="mb-6">
                      <div className="text-4xl font-bold text-gradient-primary">
                        Ksh {pkg.price}
                      </div>
                      {pkg.originalPrice !== pkg.price && (
                        <div className="text-lg mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          <span className="line-through">Ksh {pkg.originalPrice}</span>
                        </div>
                      )}
                    </div>

                    <div className="text-sm mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      Ksh {Math.round(pkg.price / pkg.pieces)} per piece
                    </div>

                    {selectedQuantity === pkg.id && (
                      <div className="flex items-center justify-center gap-3 mb-4" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleQtyChange(pkg.id, -1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-700"
                          style={{ background: 'hsl(var(--muted))' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" style={{ color: 'hsl(var(--foreground))' }} />
                        </button>
                        <span className="font-semibold w-8 text-center text-sm" style={{ color: 'hsl(var(--foreground))' }}>
                          {getQty(pkg.id)}
                        </span>
                        <button
                          onClick={() => handleQtyChange(pkg.id, 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-700"
                          style={{ background: 'hsl(var(--muted))' }}
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" style={{ color: 'hsl(var(--foreground))' }} />
                        </button>
                      </div>
                    )}

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

          {selectedQuantity && (() => {
            const selected = packages.find(p => p.id === selectedQuantity);
            const qty = getQty(selectedQuantity);
            return (
              <div className="mb-6 inline-flex items-center gap-3 px-6 py-3 rounded-xl border animate-fadeIn" style={{
                background: 'hsl(var(--primary) / 0.1)',
                borderColor: 'hsl(var(--primary) / 0.3)'
              }}>
                <span className="text-sm font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>Selected:</span>
                <span className="text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>{selected?.label} × {qty}</span>
                <span className="text-lg font-bold text-gradient-primary">Ksh {selected ? selected.price * qty : 0}</span>
              </div>
            );
          })()}

          <button
            onClick={handleAddToCart}
            className={`btn-gradient ${!selectedQuantity ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!selectedQuantity || isAdding}
            style={{ transform: isAdding ? 'scale(0.95)' : '' }}
          >
            {isAdding ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Adding...
              </span>
            ) : 'Add to Cart'}
          </button>

          <button
            onClick={handleQuickWhatsApp}
            className="btn-outline-primary mt-4 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Order via WhatsApp
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
