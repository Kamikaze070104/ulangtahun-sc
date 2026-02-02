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
            className="fixed bottom-4 left-4 z-50 flex items-center gap-2"
        >
            <div className="relative group">
                <button
                    onClick={togglePlay}
                    className={`
                        w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center 
                        shadow-lg transition-all duration-300 backdrop-blur-sm border-2
                        ${isPlaying
                            ? 'bg-primary-500/80 border-primary-400 text-white animate-spin-slow'
                            : 'bg-white/80 border-gray-200 text-gray-500 hover:bg-gray-50'
                        }
                    `}
                    aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                    <Music className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Mute Control - Appears on hover/active */}
                <AnimatePresence>
                    {(isPlaying || hasInteracted) && (
                        <motion.button
                            initial={{ width: 0, opacity: 0, x: -10 }}
                            animate={{ width: 'auto', opacity: 1, x: 0 }}
                            exit={{ width: 0, opacity: 0, x: -10 }}
                            onClick={toggleMute}
                            className="absolute left-full ml-2 top-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-primary-600 hover:scale-110 transition-transform"
                        >
                            {isMuted ? (
                                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default AudioPlayer;
