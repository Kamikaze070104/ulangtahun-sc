import { motion } from 'framer-motion';
import type { Reason } from '../types';
import { fadeInUp, scaleIn } from '../constants/animations';

interface ReasonCardProps {
    reason: Reason;
    index: number;
}

const ReasonCard = ({ reason, index }: ReasonCardProps) => {
    const isEven = index % 2 === 0;
    const IconComponent = reason.icon;

    // Color mapping for neobrutalism background
    const bgColors = {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        accent: 'bg-accent'
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
                <div
                    className={`
                        relative p-8 sm:p-12 
                        ${bgColors[reason.color]}
                        neo-box
                        transition-all duration-300
                        hover:-translate-y-2 hover:shadow-neo-lg
                    `}
                >
                    {/* Number badge */}
                    <div
                        className="absolute -top-6 -left-6 w-16 h-16 bg-white border-4 border-dark shadow-neo flex items-center justify-center text-dark font-black text-2xl rotate-[-10deg]"
                    >
                        #{reason.id}
                    </div>

                    <div className="space-y-6">
                        {/* Icon */}
                        <div
                            className="inline-flex items-center justify-center w-20 h-20 bg-white border-4 border-dark shadow-neo rounded-none text-dark"
                        >
                            <IconComponent className="w-10 h-10" />
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-dark uppercase tracking-tighter leading-none border-b-4 border-dark pb-4">
                            {reason.title}
                        </h2>

                        {/* Description */}
                        <p className="text-xl sm:text-2xl text-dark font-bold leading-relaxed pt-2">
                            {reason.description}
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default ReasonCard;
