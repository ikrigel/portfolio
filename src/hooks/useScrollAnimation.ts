import { useEffect, useRef, useState } from 'react';
import type { SxProps, Theme } from '@mui/material';

export interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export type UseScrollAnimationReturn<T extends HTMLElement> = [React.RefObject<T>, boolean];

/**
 * Hook that uses IntersectionObserver to detect when an element enters the viewport.
 * Returns a ref and a boolean indicating visibility.
 *
 * @param options - Configuration for IntersectionObserver
 * @returns Tuple of [ref, isVisible]
 */
export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  options: ScrollAnimationOptions = {},
): UseScrollAnimationReturn<T> {
  const { threshold = 0.15, rootMargin = '-40px 0px', once = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        hasAnimated.current = true;
        if (once) {
          observer.unobserve(entry.target);
        }
      } else if (!once) {
        setIsVisible(false);
      }
    }, { threshold, rootMargin });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}

/**
 * Returns standard fade + slide-up animation sx props.
 * Use in conjunction with useScrollAnimation hook.
 */
export function getAnimationSx(isVisible: boolean, delayMs = 0): SxProps<Theme> {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.6s ease ${delayMs}ms, transform 0.6s ease ${delayMs}ms`,
  };
}
