import { motion, useScroll, useSpring } from 'framer-motion';
import type { RefObject } from 'react';

interface ProgressBarProps {
    containerRef: RefObject<HTMLElement | null>;
}

/**
 * ProgressBar Component
 * Displays a fixed progress bar at the top of the screen
 * Indicates how far the user has scrolled through the birthday journey
 * Tracks scroll progress of the specific container
 */
const ProgressBar = ({ containerRef }: ProgressBarProps) => {
    const { scrollYProgress } = useScroll({
        container: containerRef
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 origin-left z-50 shadow-md"
            style={{ scaleX }}
        />
    );
};

export default ProgressBar;
