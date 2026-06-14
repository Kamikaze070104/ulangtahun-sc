import { motion } from 'framer-motion';
import Masonry from './Masonry';
import { fadeInUp, staggerContainer } from '../constants/animations';
import { Camera, Heart } from 'lucide-react';

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
    { id: 12, image: '/assets/12.webp', height: 380 },
    { id: 13, image: '/assets/13.webp', height: 290 },
    { id: 14, image: '/assets/14.webp', height: 260 },
    { id: 15, image: '/assets/15.webp', height: 300 },
];

const MemoryGallery = () => {
    return (
        <section
            id="memories"
            className="scroll-section min-h-[100dvh] flex flex-col items-center justify-start relative px-4 py-12 sm:py-16"
        >
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center mb-12 neo-box bg-white p-8 max-w-3xl w-full mx-auto"
            >
                <motion.div
                    variants={fadeInUp}
                    className="flex justify-center mb-6"
                >
                    <div className="bg-primary p-4 border-4 border-dark shadow-neo transform -rotate-3">
                        <Camera className="w-12 h-12 text-dark" />
                    </div>
                </motion.div>
                <motion.h2
                    variants={fadeInUp}
                    className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-dark uppercase tracking-tight mb-4"
                >
                    Foto-foto lucu kamu hehe :3
                </motion.h2>
                <motion.p
                    variants={fadeInUp}
                    className="text-lg sm:text-xl text-dark font-bold max-w-md mx-auto"
                >
                    Maaf aku gak bilang-bilang nyimpen foto kamu hehe, dimaafin kan?
                </motion.p>
            </motion.div>

            {/* Masonry Gallery */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full max-w-6xl mx-auto neo-box bg-accent p-4 sm:p-8"
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
                className="mt-12 text-center flex justify-center gap-4"
            >
                <Heart className="w-8 h-8 text-primary fill-primary animate-bounce-neo" />
                <Heart className="w-8 h-8 text-secondary fill-secondary animate-bounce-neo" style={{ animationDelay: '0.2s' }} />
                <Heart className="w-8 h-8 text-accent fill-accent animate-bounce-neo" style={{ animationDelay: '0.4s' }} />
            </motion.div>
        </section>
    );
};

export default MemoryGallery;
