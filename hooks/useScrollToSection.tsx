import { useCallback, useEffect, useState } from "react";

interface ScrollOptions {
    offset?: number;
    duration?: number;
}

export const useScrollToSection = () => {
    const [isScrolling, setIsScrolling] = useState(false);

    const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const scrollToSection = useCallback(
        (sectionId: string, options: ScrollOptions = {}) => {
        const { offset = 80, duration = 800 } = options;
        const element = document.getElementById(sectionId);

        if (!element) return;

        const targetPosition =
            element.getBoundingClientRect().top + window.pageYOffset - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();

        setIsScrolling(true);

        const animateScroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeInOutCubic(progress);

            window.scrollTo(0, startPosition + distance * ease);

            if (progress < 1) {
            requestAnimationFrame(animateScroll);
            } else {
            setIsScrolling(false);
            }
        };

        requestAnimationFrame(animateScroll);
        },
        []
    );

    return { scrollToSection, isScrolling };
};