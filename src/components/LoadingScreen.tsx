
import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const LoadingScreen = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.to(".loading-text", {
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    })
    .to(".loading-text", {
      scale: 1.1,
      duration: 0.5,
      yoyo: true,
      repeat: 3,
      ease: "power2.inOut"
    })
    .to(".loading-screen", {
      opacity: 0,
      duration: 1.5,
      delay: 1
    });
  }, []);

  return (
    <div className="loading-screen fixed inset-0 bg-black flex items-center justify-center z-50">
      <h1 className="loading-text text-6xl md:text-8xl font-bold text-orange-500 opacity-0" 
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
        kenydee
      </h1>
    </div>
  );
};

export default LoadingScreen;
