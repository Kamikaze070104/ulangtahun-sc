import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { fadeInUp, fadeInDown, staggerContainer, titleLetterAnimation } from '../constants/animations';

/**
 * Hero Section Component
 * Landing section with animated title and scroll prompt
 * Optimized for mobile with responsive typography and spacing
 */
interface HeroSectionProps {
    isLoading?: boolean;
}

const HeroSection = ({ isLoading = false }: HeroSectionProps) => {
    const title = "Happy 22nd Birthday!";
    const subtitle = "ciee ultah ke 22 nih panjang umur yaa, aku kasih 22 alasan kenapa kamu keren";

    const scrollToReasons = () => {
        const firstReason = document.getElementById('reason-1');
        firstReason?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="hero"
            className="scroll-section min-h-[100dvh] flex items-center justify-center relative overflow-hidden px-4"
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
                <div className="absolute top-40 right-10 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }} />
                <div className="absolute -bottom-8 left-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />
            </div>

            {/* Main content */}
            <div className="container mx-auto text-center">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isLoading ? "hidden" : "visible"}
                    className="space-y-6 sm:space-y-8"
                >
                    {/* Animated title */}
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold gradient-text leading-tight px-2 max-w-full break-words flex flex-wrap justify-center gap-x-2"
                        variants={fadeInDown}
                    >
                        {title.split(' ').map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-block whitespace-nowrap">
                                {word.split('').map((char, charIndex) => {
                                    // Calculate global index for delay consistency
                                    const globalIndex = title.split(' ').slice(0, wordIndex).join('').length + charIndex;
                                    return (
                                        <motion.span
                                            key={charIndex}
                                            variants={titleLetterAnimation}
                                            transition={{
                                                duration: 0.5,
                                                delay: globalIndex * 0.05
                                            }}
                                            className="inline-block"
                                        >
                                            {char}
                                        </motion.span>
                                    );
                                })}
                                {/* Add space after word unless it's the last one */}
                                {wordIndex < title.split(' ').length - 1 && (
                                    <span className="inline-block">&nbsp;</span>
                                )}
                            </span>
                        ))}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 font-medium px-4"
                        variants={fadeInUp}
                    >
                        {subtitle}
                    </motion.p>

                    {/* CTA Button - Touch-friendly */}
                    <motion.button
                        onClick={scrollToReasons}
                        className="mt-6 sm:mt-8 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 min-h-[48px] min-w-[160px]"
                        variants={fadeInUp}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        let's gooo ✨
                    </motion.button>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 1.5,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }}
                >
                    <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500" />
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
