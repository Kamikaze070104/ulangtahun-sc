import { motion } from 'framer-motion';
import type { Reason } from '../types';
import { fadeInUp, scaleIn } from '../constants/animations';

interface ReasonCardProps {
    reason: Reason;
    index: number;
}

/**
 * ReasonCard Component
 * Individual card displaying a reason with animations
 * Applies different entrance animations based on index
 * Mobile-optimized with responsive padding and typography
 */
const ReasonCard = ({ reason, index }: ReasonCardProps) => {
    const isEven = index % 2 === 0;

    // Color mapping for glassmorphism background
    const colorClasses = {
        primary: 'from-primary-100/40 to-primary-200/40 border-primary-300/50',
        secondary: 'from-secondary-100/40 to-secondary-200/40 border-secondary-300/50',
        accent: 'from-accent-100/40 to-accent-200/40 border-accent-300/50'
    };

    // Emoji background color
    const emojiBackgrounds = {
        primary: 'bg-primary-100',
        secondary: 'bg-secondary-100',
        accent: 'bg-accent-100'
    };

    return (
        <section
            id={`reason-${reason.id}`}
            className="scroll-section min-h-[100dvh] flex items-center justify-center px-4 py-12 sm:py-16"
        >
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={isEven ? fadeInUp : scaleIn}
                className="max-w-2xl w-full"
            >
                {/* Glass card */}
                <div
                    className={`
            relative p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl
            bg-gradient-to-br ${colorClasses[reason.color]}
            backdrop-blur-xl border-2
            shadow-2xl
            transition-all duration-300
            hover:shadow-3xl hover:scale-[1.01] sm:hover:scale-[1.02]
          `}
                >
                    {/* Number badge - Responsive sizing */}
                    <motion.div
                        className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl md:text-2xl shadow-lg"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2
                        }}
                    >
                        {reason.id}
                    </motion.div>

                    {/* Decorative sparkles */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-accent-400 rounded-full opacity-60 sparkle" style={{ animationDelay: '0s' }} />
                    <div className="absolute top-6 sm:top-8 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-primary-400 rounded-full opacity-60 sparkle" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute -bottom-1 left-6 sm:left-8 w-4 h-4 sm:w-5 sm:h-5 bg-secondary-400 rounded-full opacity-60 sparkle" style={{ animationDelay: '1s' }} />

                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        {/* Emoji */}
                        <motion.div
                            className={`inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 ${emojiBackgrounds[reason.color]} rounded-xl sm:rounded-2xl text-3xl sm:text-4xl`}
                            initial={{ rotate: -10, scale: 0.8 }}
                            whileInView={{ rotate: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, type: 'spring' }}
                        >
                            {reason.emoji}
                        </motion.div>

                        {/* Title - Responsive sizing */}
                        <motion.h2
                            className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-800 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            {reason.title}
                        </motion.h2>

                        {/* Description - Responsive sizing */}
                        <motion.p
                            className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            {reason.description}
                        </motion.p>
                    </div>

                    {/* Bottom decorative line */}
                    <motion.div
                        className={`mt-6 sm:mt-8 h-1 rounded-full bg-gradient-to-r ${reason.color === 'primary' ? 'from-primary-400 to-secondary-400' :
                            reason.color === 'secondary' ? 'from-secondary-400 to-accent-400' :
                                'from-accent-400 to-primary-400'
                            }`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default ReasonCard;
