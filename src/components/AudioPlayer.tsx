import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Create audio instance
        audioRef.current = new Audio('/assets/hbd-instrumental.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        // Cleanup
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const attemptPlay = async () => {
            if (audioRef.current && !isPlaying && !hasInteracted) {
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (error) {
                    console.log("Autoplay blocked, waiting for interaction", error);
                }
            }
        };

        const handleInteraction = () => {
            if (!hasInteracted) {
                setHasInteracted(true);
                if (audioRef.current && !isPlaying) {
                    attemptPlay();
                }
            }
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);
        window.addEventListener('keydown', handleInteraction);
        window.addEventListener('scroll', handleInteraction);

        // Try initial autoplay
        attemptPlay();

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
        };
    }, [hasInteracted, isPlaying]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-6 left-6 z-50 flex items-center gap-4"
        >
            <div className="relative group flex items-center gap-4">
                <button
                    onClick={togglePlay}
                    className={`
                        w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center 
                        border-4 border-dark shadow-neo transition-all duration-200 active:translate-x-1 active:translate-y-1 active:shadow-none
                        ${isPlaying
                            ? 'bg-accent text-dark'
                            : 'bg-white text-dark hover:bg-gray-100'
                        }
                    `}
                    aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                    <Music className={`w-6 h-6 sm:w-8 sm:h-8 ${isPlaying ? 'animate-bounce-neo' : ''}`} />
                </button>

                {/* Mute Control - Appears on hover/active */}
                <AnimatePresence>
                    {(isPlaying || hasInteracted) && (
                        <motion.button
                            initial={{ width: 0, opacity: 0, x: -10 }}
                            animate={{ width: 'auto', opacity: 1, x: 0 }}
                            exit={{ width: 0, opacity: 0, x: -10 }}
                            onClick={toggleMute}
                            className="w-10 h-10 sm:w-12 sm:h-12 bg-white border-4 border-dark shadow-neo flex items-center justify-center text-dark hover:bg-gray-100 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-200"
                        >
                            {isMuted ? (
                                <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
                            ) : (
                                <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
                            )}
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default AudioPlayer;
