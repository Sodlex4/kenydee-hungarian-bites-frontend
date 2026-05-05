
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems, toggleCart, isCartOpen } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 transition-all duration-300 backdrop-blur-xl"
      style={{
        zIndex: isCartOpen ? 50 : 40,
        background: isScrolled ? 'hsl(var(--background) / 0.95)' : 'hsl(var(--background) / 0.6)',
        borderBottom: '1px solid hsl(var(--primary) / 0.15)'
      }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          className="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
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
            { label: 'Products', id: 'products' },
            { label: 'About', id: 'about' },
            { label: 'Contact', id: 'contact' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="transition-colors duration-300 relative group font-medium"
              style={{ color: 'hsl(var(--primary))' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--primary-light, var(--primary)))'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(var(--primary))'}
              aria-label={`Navigate to ${item.label}`}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{
                background: 'var(--gradient-primary)'
              }}></span>
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
        <nav className="md:hidden" style={{
          background: 'hsl(var(--background) / 0.98)',
          borderTop: '1px solid hsl(var(--primary) / 0.2)'
        }} aria-label="Mobile navigation">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            {[
              { label: 'Home', id: 'home' },
              { label: 'Products', id: 'products' },
              { label: 'About', id: 'about' },
              { label: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="transition-colors text-left py-2 text-lg font-medium"
                style={{ color: 'hsl(var(--primary))' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--primary-light, var(--primary)))'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(var(--primary))'}
                aria-label={`Navigate to ${item.label}`}
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
