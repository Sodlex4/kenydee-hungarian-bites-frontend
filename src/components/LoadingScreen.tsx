
import React, { useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../lib/motion';

interface LoadingScreenProps {
  onSkip: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onSkip }) => {
  const [canSkip, setCanSkip] = useState(false);
  const isReturning = typeof window !== 'undefined' && localStorage.getItem('has-visited') === null;

  useEffect(() => {
    if (prefersReducedMotion()) {
      onSkip();
      return;
    }

    const tl = gsap.timeline();

    if (isReturning) {
      tl.fromTo(".loading-text", { opacity: 0, scale: 0.8 }, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(".loading-screen", {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
        onComplete: onSkip
      });

      setCanSkip(true);
    } else {
      const enableSkipTimer = setTimeout(() => setCanSkip(true), 800);

      tl.fromTo(".loading-text", { opacity: 0, scale: 0 }, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(".loading-text", {
        scale: 1.1,
        duration: 0.3,
        yoyo: true,
        repeat: 2,
        ease: "power2.inOut"
      })
      .to(".loading-gradient", {
        scale: 1.5,
        opacity: 0.3,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.6")
      .to(".loading-screen", {
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        onComplete: onSkip
      });

      return () => {
        clearTimeout(enableSkipTimer);
        tl.kill();
      };
    }

    return () => {
      tl.kill();
    };
  }, [onSkip, isReturning]);

  const handleSkip = useCallback(() => {
    gsap.to(".loading-screen", {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: onSkip
    });
  }, [onSkip]);

  return (
    <div className="loading-screen fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 flex items-center justify-center z-50">

      <div className="loading-gradient absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center">
        <h1 className="loading-text text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
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
