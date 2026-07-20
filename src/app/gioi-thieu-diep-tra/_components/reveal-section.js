'use client';

import { useEffect, useRef } from 'react';

/**
 * RevealSection – wraps any section with a smooth fade animation when it enters
 * or exits the viewport. Repeats on every scroll in both directions.
 *
 * Props:
 *   delay      – ms offset before the transition fires (e.g. 100, 200 …)
 *   from       – direction: 'bottom' (default) | 'left' | 'right' | 'top'
 *   stagger    – if true, animates direct children one-by-one with staggered delays
 *   staggerMs  – delay between each staggered child (default: 80ms)
 *   threshold  – IntersectionObserver threshold (default: 0.05)
 */
const RevealSection = ({
  children,
  delay = 0,
  from = 'bottom',
  stagger = false,
  staggerMs = 80,
  threshold = 0.05
}) => {
  const ref = useRef(null);

  const translate = {
    bottom: 'translateY(40px)',
    top: 'translateY(-40px)',
    left: 'translateX(-40px)',
    right: 'translateX(40px)'
  };

  const hiddenTransform = translate[from] ?? translate.bottom;

  useEffect(() => {
    const wrapper = ref.current;
    if (!wrapper) return;

    const targets = stagger
      ? Array.from(wrapper.children)
      : [wrapper];

    // Apply initial hidden state to all targets
    targets.forEach((el, i) => {
      const d = delay + (stagger ? i * staggerMs : 0);
      el.style.opacity = '0';
      el.style.transform = hiddenTransform;
      el.style.transition = `opacity 1.1s ease ${d}ms, transform 1.1s cubic-bezier(0.25, 1, 0.5, 1) ${d}ms`;
    });

    const show = (el, i) => {
      const d = delay + (stagger ? i * staggerMs : 0);
      el.style.transition = `opacity 1.1s ease ${d}ms, transform 1.1s cubic-bezier(0.25, 1, 0.5, 1) ${d}ms`;
      el.style.opacity = '1';
      el.style.transform = 'translate(0, 0)';
    };

    const hide = (el) => {
      el.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
      el.style.opacity = '0';
      el.style.transform = hiddenTransform;
    };

    if (stagger) {
      // For stagger mode: observe the wrapper, animate children on enter/exit
      const observer = new IntersectionObserver(
        ([entry]) => {
          targets.forEach((el, i) => {
            if (entry.isIntersecting) {
              show(el, i);
            } else {
              hide(el);
            }
          });
        },
        { threshold, rootMargin: '0px 0px -20px 0px' }
      );

      observer.observe(wrapper);
      return () => observer.disconnect();
    } else {
      // For section mode: observe the wrapper itself
      const el = wrapper;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            show(el, 0);
          } else {
            hide(el);
          }
        },
        { threshold, rootMargin: '0px 0px -20px 0px' }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref}>{children}</div>;
};

export default RevealSection;
