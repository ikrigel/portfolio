import { useEffect, useState } from 'react';

export function useParallax() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Parallax offset: moves 40% of scroll distance (slower than page scroll)
      setOffset(window.scrollY * 0.4);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return offset;
}
