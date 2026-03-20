// hooks/useCountAnimation.tsx
import { useEffect, useRef, useState } from "react";

interface UseCountAnimationProps {
  end: number;
  duration?: number;
  startAnimation?: boolean;
  prefix?: string;
  suffix?: string;
}

export const useCountAnimation = ({
  end,
  duration = 2000,
  startAnimation = false,
  prefix = "",
  suffix = "",
}: UseCountAnimationProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!startAnimation) {
      setCount(0);
      countRef.current = 0;
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min(
        (timestamp - startTimeRef.current) / duration,
        1
      );

      // Easing function para uma animação mais suave
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      countRef.current = Math.floor(easeOutQuart * end);
      setCount(countRef.current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      startTimeRef.current = null;
    };
  }, [end, duration, startAnimation]);

  return `${prefix}${count.toLocaleString("pt-BR")}${suffix}`;
};

// Hook para detectar quando um elemento entra na viewport
export const useInViewport = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.3,
        ...options,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, options]);

  return { ref, isInView };
};
