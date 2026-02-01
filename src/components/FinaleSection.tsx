import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';
import { fadeInUp, scaleIn, staggerContainer } from '../constants/animations';

/**
 * Finale Section Component
 * Celebration section with confetti animation and floating hearts
 * Mobile-optimized with responsive layout and touch-friendly controls
 */
const FinaleSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        };

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#f668a8', '#a855f7', '#fde047']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#f668a8', '#a855f7', '#fde047']
            });
        }, 250);
    };

    useEffect(() => {
        // Trigger confetti when section comes into view
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        triggerConfetti();
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const scrollToTop = () => {
        const hero = document.getElementById('hero');
        hero?.scrollIntoView({ behavior: 'smooth' });
    };

    // Generate floating hearts
    const hearts = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4
    }));

    return (
        <section
            ref={sectionRef}
            id="finale"
            className="scroll-section min-h-[100dvh] flex items-center justify-center relative overflow-hidden px-4 py-12"
        >
            {/* Floating hearts background */}
            <div className="absolute inset-0 -z-10">
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        className="absolute"
                        style={{ left: heart.left }}
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{
                            y: '-100%',
                            opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                            duration: heart.duration,
                            delay: heart.delay,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                    >
                        <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400 fill-primary-200" />
                    </motion.div>
                ))}
            </div>

            {/* Main content */}
            <div className="container mx-auto text-center max-w-3xl">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-6 sm:space-y-8"
                >
                    {/* Celebration emoji */}
                    <motion.div
                        variants={scaleIn}
                        className="text-6xl sm:text-7xl md:text-8xl"
                    >
                        🎉🎂🎈
                    </motion.div>

                    {/* Main message */}
                    <motion.h2
                        variants={fadeInUp}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold gradient-text leading-tight px-2"
                    >
                        Here's to You!
                    </motion.h2>

                    <motion.p
                        variants={fadeInUp}
                        className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed px-4"
                    >
                        You bring so much joy, love, and light into this world.
                        Thank you for being the amazing person you are!
                    </motion.p>

                    <motion.p
                        variants={fadeInUp}
                        className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary-600 px-4"
                    >
                        Happy 22nd Birthday! 🌟
                    </motion.p>

                    {/* Action buttons - Touch-friendly */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
                    >
                        <Link
                            to="/games"
                            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 min-h-[48px] flex items-center justify-center gap-2"
                        >
                            <span>Mini Games</span>
                            <span>🎮</span>
                        </Link>
                        <button
                            onClick={scrollToTop}
                            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white/80 backdrop-blur-sm text-primary-600 border-2 border-primary-300 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 min-h-[48px]"
                        >
                            Back to Start ↑
                        </button>
                    </motion.div>

                    {/* WhatsApp Action */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-6"
                    >
                        <a
                            href="https://wa.me/6281564960617?text=Alhamdulillah%2C%20makasih%20banyak%20aa%20faizal%20%E2%9D%A4%EF%B8%8F"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-[#25D366] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-[#128C7E] transition-all duration-300 active:scale-95 group"
                        >
                            <span>Kirim Pesan ke Faizal</span>
                            <span className="group-hover:translate-x-1 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </span>
                        </a>
                    </motion.div>
                    {/* Footer Watermark */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-12 sm:mt-16 text-center"
                    >
                        <p className="text-sm font-medium text-gray-500 opacity-70">
                            selasa 03 februari 2026. made with love by FaizalAG
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section >
    );
};

export default FinaleSection;
