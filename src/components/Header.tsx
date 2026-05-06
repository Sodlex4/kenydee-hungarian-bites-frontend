
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const sections = ['home', 'products', 'about', 'testimonials', 'order'];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { cartItems, toggleCart, isCartOpen } = useCart();
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const firstMobileButtonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !mobileNavRef.current) return;

      const focusable = mobileNavRef.current.querySelectorAll('button');
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
    firstMobileButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', trapFocus);
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navButtons = sections.map((item, i) => ({
    label: item.charAt(0).toUpperCase() + item.slice(1),
    id: item,
    ref: i === 0 ? firstMobileButtonRef : undefined
  }));

  return (
    <header
      className="fixed top-0 left-0 right-0 transition-all duration-300 backdrop-blur-xl"
      style={{
        zIndex: 40,
        background: 'hsl(var(--background) / 0.8)',
        borderBottom: '1px solid hsl(var(--primary) / 0.15)'
      }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          className="font-bold bg-gradient-to-r bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform leading-tight truncate max-w-[140px] sm:max-w-none sm:text-2xl text-xl"
          onClick={() => scrollToSection('home')}
          style={{
            fontFamily: 'Pacifico, cursive',
            backgroundImage: 'var(--gradient-primary)'
          }}
          aria-label="Go to top"
        >
          HUNGARIAN BITES
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
          {[
            { label: 'Home', id: 'home' },
            { label: 'Menu', id: 'products' },
            { label: 'About', id: 'about' },
            { label: 'Reviews', id: 'testimonials' },
            { label: 'Order', id: 'order' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`transition-all duration-300 relative group font-medium ${
                activeSection === item.id ? 'font-semibold' : ''
              }`}
              style={{ color: activeSection === item.id ? 'hsl(var(--foreground))' : 'hsl(var(--primary))' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--foreground))'}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = activeSection === item.id ? 'hsl(var(--foreground))' : 'hsl(var(--primary))';
              }}
              aria-label={`Navigate to ${item.label}`}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                  activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
                style={{ background: 'var(--gradient-primary)' }}
              ></span>
            </button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <button
            onClick={toggleCart}
            className="relative p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              background: 'hsl(var(--primary) / 0.3)',
              border: '1px solid hsl(var(--primary) / 0.4)',
              backdropFilter: 'blur(12px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'hsl(var(--primary) / 0.45)';
              e.currentTarget.style.borderColor = 'hsl(var(--primary) / 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'hsl(var(--primary) / 0.3)';
              e.currentTarget.style.borderColor = 'hsl(var(--primary) / 0.4)';
            }}
            aria-label={`Shopping cart, ${totalItems} items`}
          >
            <ShoppingCart className="w-6 h-6" style={{ color: 'hsl(var(--primary-foreground))' }} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 text-xs rounded-full min-w-[1.25rem] h-5 px-1 flex items-center justify-center font-bold shadow-lg animate-badgePop" style={{
                background: 'hsl(var(--destructive))',
                color: 'hsl(var(--destructive-foreground))'
              }}>
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-full transition-all duration-300"
            style={{
              background: 'hsl(var(--primary) / 0.3)',
              border: '1px solid hsl(var(--primary) / 0.4)',
              backdropFilter: 'blur(12px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'hsl(var(--primary) / 0.45)';
              e.currentTarget.style.borderColor = 'hsl(var(--primary) / 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'hsl(var(--primary) / 0.3)';
              e.currentTarget.style.borderColor = 'hsl(var(--primary) / 0.4)';
            }}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" style={{ color: 'hsl(var(--primary-foreground))' }} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: 'hsl(var(--primary-foreground))' }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav
          ref={mobileNavRef}
          className="md:hidden"
          style={{
            background: 'hsl(var(--background) / 0.98)',
            borderTop: '1px solid hsl(var(--primary) / 0.2)'
          }}
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            {navButtons.map((item) => (
              <button
                key={item.id}
                ref={item.ref}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors text-left py-2 text-lg font-medium ${
                  activeSection === item.id ? 'font-semibold' : ''
                }`}
                style={{
                  color: activeSection === item.id ? 'hsl(var(--foreground))' : 'hsl(var(--primary))',
                  borderBottom: activeSection === item.id ? '2px solid hsl(var(--primary))' : '2px solid transparent'
                }}
                aria-label={`Navigate to ${item.label}`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
