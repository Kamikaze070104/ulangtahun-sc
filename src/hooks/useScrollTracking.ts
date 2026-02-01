import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to track current visible section index
 * Used for navigation dots active state
 * Optimized for performance with throttled scroll events
 */
export const useScrollTracking = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = useCallback(() => {
        // Get all scroll sections
        const sections = document.querySelectorAll('.scroll-section');

        // Find which section is currently in view
        let currentSection = 0;
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const isInView = rect.top >= -100 && rect.top <= 200;

            if (isInView) {
                currentSection = index;
            }
        });

        setCurrentIndex(currentSection);
    }, []);

    useEffect(() => {
        // Throttle scroll event for performance
        let timeoutId: number | undefined;

        const throttledScroll = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = window.setTimeout(handleScroll, 100);
        };

        window.addEventListener('scroll', throttledScroll);

        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener('scroll', throttledScroll);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [handleScroll]);

    return currentIndex;
};
