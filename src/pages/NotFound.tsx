
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../lib/env';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'hsl(var(--background))' }}>
      <header
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl"
        style={{
          background: 'hsl(var(--background) / 0.8)',
          borderBottom: '1px solid hsl(var(--primary) / 0.15)',
          paddingTop: 'env(safe-area-inset-top, 0px)'
        }}
      >
        <div className="container py-4">
          <Link
            to="/"
            className="font-bold bg-gradient-to-r bg-clip-text text-transparent sm:text-2xl text-lg tracking-wider"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              backgroundImage: 'var(--gradient-primary)'
            }}
          >
            HUNGARIAN BITES
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-md">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <p className="text-2xl font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Page Not Found</p>
          <p className="text-lg mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl text-white"
              style={{
                background: 'var(--gradient-primary)',
                boxShadow: '0 10px 30px hsl(var(--primary) / 0.3)'
              }}
            >
              <Home className="w-5 h-5" />
              Back to Home
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105"
              style={{
                color: '#25D366',
                border: '2px solid #25D366'
              }}
            >
              <MessageCircle className="w-5 h-5" />
              Contact Us
            </a>
          </div>
          <nav className="mt-12" aria-label="Quick links">
            <p className="text-sm mb-3 font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>Quick Links</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'Menu', to: '/#products' },
                { label: 'About', to: '/legal/about' },
                { label: 'FAQ', to: '/#faq' },
                { label: 'Terms', to: '/legal/terms' },
                { label: 'Privacy', to: '/legal/privacy' },
              ].map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="px-4 py-2 rounded-lg text-sm transition-colors hover:scale-105"
                  style={{
                    background: 'hsl(var(--muted))',
                    color: 'hsl(var(--foreground))',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
