export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getGsapDuration = (baseDuration: number): number => {
  return prefersReducedMotion() ? 0.01 : baseDuration;
};
