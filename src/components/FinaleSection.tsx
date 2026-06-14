import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { PartyPopper, Gamepad2, ArrowUp, MessageCircle } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../constants/animations';

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
                colors: ['#ff90e8', '#ffc900', '#00e5ff']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#ff90e8', '#ffc900', '#00e5ff']
            });
        }, 250);
    };

    useEffect(() => {
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

    return (
        <section
            ref={sectionRef}
            id="finale"
            className="scroll-section min-h-[100dvh] flex items-center justify-center relative overflow-hidden px-4 py-12 bg-secondary"
        >
            {/* Background decorative brutalist elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-24 h-24 bg-primary border-4 border-dark shadow-neo rotate-45" />
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent rounded-full border-4 border-dark shadow-neo" />
            </div>

            {/* Main content */}
            <div className="container mx-auto text-center max-w-3xl">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-8 bg-white p-8 sm:p-12 neo-box"
                >
                    {/* Celebration icon */}
                    <div className="flex justify-center">
                        <div className="bg-primary p-6 border-4 border-dark shadow-neo rounded-none transform -rotate-6">
                            <PartyPopper className="w-16 h-16 text-dark" />
                        </div>
                    </div>

                    {/* Main message */}
                    <motion.h2
                        variants={fadeInUp}
                        className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-dark uppercase leading-none"
                    >
                        YEEEYYY! UDAH SAMPE SINI
                    </motion.h2>

                    <motion.p
                        variants={fadeInUp}
                        className="text-lg sm:text-xl md:text-2xl text-dark font-bold leading-relaxed px-4 border-l-4 border-r-4 border-dark"
                    >
                        Baarakallah fii umrik Latifah nur aini yang ke-22 tahun
                        semoga panjang umur, sehat selalu, dan sukses selalu. apa yang dicita-citakan
                        semoga menjadi kenyataan, jangan mudah menyerah, hadapi semuanya aku tau kamu bisa kok
                        semangatt ada aku disini yang selalu support kamu. doa yang terbaik buat kamu, aamiin, hadiah? hmmm.....
                        kasih enggak yaaa??
                    </motion.p>

                    <motion.p
                        variants={fadeInUp}
                        className="text-2xl sm:text-3xl md:text-4xl font-black text-accent bg-dark inline-block px-4 py-2 uppercase"
                    >
                        Happy 22nd Birthday!
                    </motion.p>

                    {/* Action buttons */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
                    >
                        <Link
                            to="/games"
                            className="neo-btn px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-3 text-lg"
                        >
                            <span>MINI GAMES</span>
                            <Gamepad2 className="w-6 h-6" />
                        </Link>
                        <button
                            onClick={scrollToTop}
                            className="neo-btn bg-white px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-3 text-lg"
                        >
                            <span>BACK TO START</span>
                            <ArrowUp className="w-6 h-6" />
                        </button>
                    </motion.div>

                    {/* WhatsApp Action */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-8 pt-8 border-t-4 border-dark"
                    >
                        <a
                            href="https://wa.me/6281564960617?text=Alhamdulillah%2C%20makasih%20banyak%20aa%20faizal%20❤️"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neo-btn bg-[#25D366] px-8 py-4 inline-flex items-center gap-3 text-lg"
                        >
                            <span>KIRIM PESAN KE FAIZAL</span>
                            <MessageCircle className="w-6 h-6" />
                        </a>
                    </motion.div>
                    
                    {/* Footer Watermark */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-8 pt-4"
                    >
                        <p className="text-sm font-bold text-dark uppercase tracking-widest">
                            Selasa 03 Februari 2026. Made with <span className="text-primary">♥</span> by FaizalAG
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default FinaleSection;
