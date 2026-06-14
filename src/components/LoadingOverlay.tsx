import { useState, useEffect } from 'react';
import { PartyPopper, Lightbulb } from 'lucide-react';

interface LoadingOverlayProps {
    onLoadingComplete?: () => void;
}

const LoadingOverlay = ({ onLoadingComplete }: LoadingOverlayProps) => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [loadingText, setLoadingText] = useState('LOADING SURPRISE...');

    const loadingMessages = [
        'LOADING SURPRISE...',
        'PREPARING GIFTS...',
        'GATHERING MEMORIES...',
        'ADDING PARTY POPPERS...',
        'WRITING REASONS...',
        'ALMOST THERE...',
        'READY TO GO!',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const increment = Math.random() * 20 + 10;
                return Math.min(prev + increment, 100);
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const messageIndex = Math.min(
            Math.floor(progress / 15),
            loadingMessages.length - 1
        );
        setLoadingText(loadingMessages[messageIndex]);
    }, [progress]);

    useEffect(() => {
        if (progress >= 100) {
            const timeout = setTimeout(() => {
                setIsVisible(false);
                onLoadingComplete?.();
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [progress, onLoadingComplete]);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 bg-primary z-[9999] flex flex-col items-center justify-center transition-transform duration-500 ${
                progress >= 100 ? '-translate-y-full' : ''
            }`}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(#000 2px, transparent 2px)',
                backgroundSize: '30px 30px'
            }}></div>

            <div className="neo-box p-8 max-w-lg w-full mx-4 flex flex-col items-center gap-8 relative bg-white">
                
                {/* Icon */}
                <div className="bg-secondary p-4 rounded-none border-4 border-dark shadow-neo animate-bounce-neo">
                    <PartyPopper className="w-16 h-16 text-dark" />
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-display font-black text-dark text-center uppercase">
                    Loading Birthday Surprise
                </h1>

                {/* Progress container */}
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full h-12 bg-white border-4 border-dark relative overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-accent border-r-4 border-dark transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                        {/* Segments */}
                        <div className="absolute inset-0 flex justify-evenly pointer-events-none">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-1 h-full bg-dark"></div>
                            ))}
                        </div>
                    </div>

                    {/* Progress info */}
                    <div className="flex justify-between items-center font-bold font-display text-dark uppercase text-sm sm:text-base">
                        <span>{loadingText}</span>
                        <span className="text-xl sm:text-2xl">{Math.round(progress)}%</span>
                    </div>
                </div>

                {/* Loading tip */}
                <div className="flex items-center gap-3 p-4 bg-secondary border-4 border-dark w-full">
                    <Lightbulb className="w-6 h-6 text-dark flex-shrink-0" />
                    <span className="text-dark font-bold uppercase text-sm">
                        {progress < 50
                            ? 'TIP: SCROLL DOWN TO SEE ALL THE REASONS!'
                            : progress < 90
                                ? 'TIP: TAP ELEMENTS FOR FUN INTERACTIONS!'
                                : 'GET READY!'
                        }
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
