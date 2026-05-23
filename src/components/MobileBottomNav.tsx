import React, { useState, useEffect } from 'react';
import { Home, Grid3X3, ShoppingCart, MessageCircle, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

const sections = ['home', 'products', 'about', 'order'];

const MobileBottomNav = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { cartItems, toggleCart, isCartOpen } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-20% 0px -70% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'products', icon: Grid3X3, label: 'Menu' },
    { id: 'about', icon: Info, label: 'About' },
    { id: 'order', icon: MessageCircle, label: 'Order' },
  ];

  return (
    <nav
      aria-hidden={isCartOpen}
      className={`fixed bottom-0 left-0 right-0 md:hidden backdrop-blur-xl border-t transition-opacity ${isCartOpen ? 'opacity-0 pointer-events-none z-0' : 'z-50'}`}
      style={{
        background: 'hsl(var(--background) / 0.95)',
        borderColor: 'hsl(var(--primary) / 0.15)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
    >
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px] ${
              activeSection === item.id ? 'scale-105' : 'opacity-60'
            }`}
            style={{
              color: activeSection === item.id ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
              background: activeSection === item.id ? 'hsl(var(--primary) / 0.12)' : 'transparent'
            }}
            aria-label={`Navigate to ${item.label}`}
            aria-current={activeSection === item.id ? 'page' : undefined}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-tight">{item.label}</span>
          </button>
        ))}

        <button
          onClick={toggleCart}
          className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px] ${
            isCartOpen ? 'scale-105' : 'opacity-60'
          }`}
          style={{
            color: isCartOpen ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
            background: isCartOpen ? 'hsl(var(--primary) / 0.12)' : 'transparent'
          }}
          aria-label={`Shopping cart, ${totalItems} items`}
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 text-[9px] rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center font-bold shadow-lg" style={{
                background: 'hsl(var(--destructive))',
                color: 'hsl(var(--destructive-foreground))'
              }}>
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium leading-tight">Cart</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
