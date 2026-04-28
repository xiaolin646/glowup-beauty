import { useState, useEffect, useCallback } from 'react';

export function useCarousel<T>(items: T[], interval: number = 3000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const previous = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!isPaused && items.length > 1) {
      const timer = setInterval(next, interval);
      return () => clearInterval(timer);
    }
  }, [next, interval, isPaused, items.length]);

  return {
    currentIndex,
    next,
    previous,
    goTo,
    setIsPaused,
  };
}
