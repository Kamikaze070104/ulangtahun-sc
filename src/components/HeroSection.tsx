import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { fadeInUp, fadeInDown, staggerContainer } from '../constants/animations';

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
            className="scroll-section min-h-[100dvh] flex items-center justify-center relative overflow-hidden px-4 bg-[#fffce5]"
        >
            {/* Background decorative brutalist elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-primary neo-box animate-bounce-neo" />
                <div className="absolute top-40 right-10 w-40 h-40 bg-accent rounded-full border-4 border-dark shadow-neo" style={{ animationDelay: '1s' }} />
                <div className="absolute -bottom-10 left-1/4 w-48 h-48 bg-secondary neo-box rotate-12" />
            </div>

            {/* Main content */}
            <div className="container mx-auto text-center z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isLoading ? "hidden" : "visible"}
                    className="space-y-8 neo-box p-8 sm:p-12 max-w-4xl mx-auto bg-white"
                >
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary p-4 rounded-full border-4 border-dark shadow-neo">
                            <Sparkles className="w-12 h-12 text-dark" />
                        </div>
                    </div>

                    {/* Animated title */}
                    <motion.h1
                        className="text-5xl sm:text-6xl md:text-8xl font-display font-black text-dark uppercase tracking-tighter leading-none"
                        variants={fadeInDown}
                    >
                        {title.split(' ').map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-block whitespace-nowrap mr-4 mb-2">
                                {word}
                            </span>
                        ))}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-xl sm:text-2xl md:text-3xl text-dark font-bold px-4 border-t-4 border-dark pt-6 mt-6"
                        variants={fadeInUp}
                    >
                        {subtitle}
                    </motion.p>

                    {/* CTA Button */}
                    <motion.button
                        onClick={scrollToReasons}
                        className="mt-8 px-8 py-4 neo-btn text-xl sm:text-2xl w-full sm:w-auto flex justify-center items-center gap-2"
                        variants={fadeInUp}
                    >
                        LET'S GOOO <ChevronDown className="w-6 h-6" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
