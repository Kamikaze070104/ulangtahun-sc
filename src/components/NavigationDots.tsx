import { motion } from 'framer-motion';
import { useState } from 'react';

interface NavigationDotsProps {
    total: number;
    currentIndex: number;
}

/**
 * NavigationDots Component
 * Side navigation with numbered dots for quick jumping between sections
 */
const NavigationDots = ({ total, currentIndex }: NavigationDotsProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const scrollToSection = (index: number) => {
        const sectionId = index === 0 ? 'hero' : `reason-${index}`;
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav
            className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block"
            aria-label="Section navigation"
        >
            <ul className="space-y-3">
                {/* Hero dot */}
                <li>
                    <button
                        onClick={() => scrollToSection(0)}
                        onMouseEnter={() => setHoveredIndex(0)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="relative group"
                        aria-label="Go to hero section"
                    >
                        <motion.div
                            className={`
                w-3 h-3 rounded-full border-2 transition-all duration-300
                ${currentIndex === 0
                                    ? 'bg-primary-500 border-primary-500 scale-125'
                                    : 'bg-white/50 border-gray-400 hover:border-primary-400'
                                }
              `}
                            whileHover={{ scale: 1.3 }}
                        />
                        {hoveredIndex === 0 && (
                            <motion.span
                                className="absolute right-6 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                            >
                                Start
                            </motion.span>
                        )}
                    </button>
                </li>

                {/* Reason dots */}
                {Array.from({ length: total }, (_, i) => i + 1).map((num) => (
                    <li key={num}>
                        <button
                            onClick={() => scrollToSection(num)}
                            onMouseEnter={() => setHoveredIndex(num)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="relative group"
                            aria-label={`Go to reason ${num}`}
                        >
                            <motion.div
                                className={`
                  w-3 h-3 rounded-full border-2 transition-all duration-300 flex items-center justify-center
                  ${currentIndex === num
                                        ? 'bg-gradient-to-br from-primary-500 to-secondary-500 border-primary-500 scale-125'
                                        : 'bg-white/50 border-gray-400 hover:border-primary-400'
                                    }
                `}
                                whileHover={{ scale: 1.3 }}
                            />
                            {hoveredIndex === num && (
                                <motion.span
                                    className="absolute right-6 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                >
                                    Reason {num}
                                </motion.span>
                            )}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavigationDots;
