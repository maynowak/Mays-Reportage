import { useEffect } from 'react';

/**
 * Reveals every `[data-reveal]` element once it enters the viewport.
 * Falls back to "always visible" when IntersectionObserver is unavailable
 * or the visitor asked for reduced motion.
 */
export function useScrollReveal(enabled = true): void {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (elements.length === 0) return;

    const show = (element: HTMLElement) => {
      element.dataset.revealed = 'true';
    };

    if (!enabled || typeof IntersectionObserver === 'undefined') {
      elements.forEach(show);
      return;
    }

    const root = document.documentElement;
    root.classList.add('reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, [enabled]);
}
