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
        let minDistance = Infinity;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            // Calculate distance from top of viewport (considering offset)
            const distance = Math.abs(rect.top);

            // If this section is closer to the top than the previous closest
            // AND it's within a reasonable range to be considered "active"
            if (distance < minDistance && rect.top < window.innerHeight / 2 && rect.bottom > 0) {
                minDistance = distance;
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
