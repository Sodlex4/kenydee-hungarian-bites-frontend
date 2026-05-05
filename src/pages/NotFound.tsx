
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 text-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <p className="text-2xl font-semibold mb-2">Page Not Found</p>
        <p className="text-lg mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
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
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
