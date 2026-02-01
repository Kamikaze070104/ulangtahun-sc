import { motion } from 'framer-motion';
import Masonry from './Masonry';
import { fadeInUp, staggerContainer } from '../constants/animations';

/**
 * Memory Gallery Section
 * Displays a beautiful masonry grid of memory photos
 * Placed between the last reason card and finale section
 */

// Photo data with varying heights for masonry effect
const memoryPhotos = [
    { id: 1, image: '/assets/1.webp', height: 350 },
    { id: 2, image: '/assets/2.webp', height: 280 },
    { id: 3, image: '/assets/3.webp', height: 320 },
    { id: 4, image: '/assets/4.webp', height: 250 },
    { id: 5, image: '/assets/5.webp', height: 300 },
    { id: 6, image: '/assets/6.webp', height: 280 },
    { id: 7, image: '/assets/7.webp', height: 240 },
    { id: 8, image: '/assets/8.webp', height: 260 },
    { id: 9, image: '/assets/9.webp', height: 350 },
    { id: 10, image: '/assets/10.webp', height: 270 },
    { id: 11, image: '/assets/11.webp', height: 230 },
    { id: 12, image: '/assets/12.webp', height: 380 },  // Portrait orientation - tall
    { id: 13, image: '/assets/13.webp', height: 290 },
    { id: 14, image: '/assets/14.webp', height: 260 },
    { id: 15, image: '/assets/15.webp', height: 300 },  // Family photo - square-ish
];

const MemoryGallery = () => {
    return (
        <section
            id="memories"
            className="scroll-section min-h-[100dvh] flex flex-col items-center justify-start relative overflow-hidden px-4 py-12 sm:py-16"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
                <div className="absolute bottom-1/4 right-10 w-48 h-48 sm:w-64 sm:h-64 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />
            </div>

            {/* Header */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center mb-8 sm:mb-12"
            >
                <motion.div
                    variants={fadeInUp}
                    className="text-5xl sm:text-6xl mb-4"
                >
                    📸
                </motion.div>
                <motion.h2
                    variants={fadeInUp}
                    className="text-3xl sm:text-4xl md:text-5xl font-display font-bold gradient-text mb-4"
                >
                    Our Precious Memories
                </motion.h2>
                <motion.p
                    variants={fadeInUp}
                    className="text-lg sm:text-xl text-gray-600 max-w-md mx-auto"
                >
                    Moments we've shared that I'll cherish forever 💕
                </motion.p>
            </motion.div>

            {/* Masonry Gallery */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full max-w-6xl mx-auto"
            >
                {/* Responsive column count */}
                <div className="hidden lg:block">
                    <Masonry items={memoryPhotos} columnCount={4} gap={16} />
                </div>
                <div className="hidden md:block lg:hidden">
                    <Masonry items={memoryPhotos} columnCount={3} gap={14} />
                </div>
                <div className="hidden sm:block md:hidden">
                    <Masonry items={memoryPhotos} columnCount={2} gap={12} />
                </div>
                <div className="block sm:hidden">
                    <Masonry items={memoryPhotos} columnCount={2} gap={10} />
                </div>
            </motion.div>

            {/* Footer decoration */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-8 sm:mt-12 text-center"
            >
                <span className="text-2xl sm:text-3xl">
                    {'💖'.repeat(5)}
                </span>
            </motion.div>
        </section>
    );
};

export default MemoryGallery;
