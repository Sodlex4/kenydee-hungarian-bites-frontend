
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';

interface LoadingScreenProps {
  onSkip: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onSkip }) => {
  const [phase, setPhase] = useState<'entering' | 'pulsing' | 'exiting'>('entering');
  const [canSkip, setCanSkip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReturning = typeof window !== 'undefined' && localStorage.getItem('has-visited') === null;

  useEffect(() => {
    if (prefersReducedMotion()) {
      localStorage.setItem('has-visited', 'true');
      onSkip();
      return;
    }

    const timeout = setTimeout(() => {
      if (isReturning) {
        setPhase('exiting');
      } else {
        setPhase('pulsing');
      }
    }, isReturning ? 300 : 600);

    const enableSkipTimer = setTimeout(() => setCanSkip(true), 800);

    return () => {
      clearTimeout(timeout);
      clearTimeout(enableSkipTimer);
    };
  }, [onSkip, isReturning]);

  useEffect(() => {
    if (phase === 'pulsing') {
      const t = setTimeout(() => setPhase('exiting'), 900);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const handleAnimationEnd = useCallback(() => {
    if (phase === 'exiting') {
      localStorage.setItem('has-visited', 'true');
      onSkip();
    }
  }, [phase, onSkip]);

  const handleSkip = useCallback(() => {
    setPhase('exiting');
  }, []);

  return (
    <div
      ref={containerRef}
      className="loading-screen fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 flex items-center justify-center z-50"
      style={{
        opacity: phase === 'exiting' ? 0 : 1,
        transition: 'opacity 0.8s ease-out',
      }}
      onTransitionEnd={phase === 'exiting' ? handleAnimationEnd : undefined}
    >
      <div className="loading-gradient absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center">
        <h1
          className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            animation: phase === 'entering'
              ? 'fade-scale-in 0.6s ease-out both'
              : phase === 'pulsing'
                ? 'pulse-scale 0.3s ease-in-out 3'
                : 'fade-in 0.3s ease-out both',
          }}
        >
          kila bite ina Slap
        </h1>

        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {canSkip && (
          <button
            onClick={handleSkip}
            className="mt-6 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 border"
            style={{
              color: 'hsl(0 0% 80%)',
              borderColor: 'hsl(0 0% 40% / 0.3)',
              background: 'transparent'
            }}
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
