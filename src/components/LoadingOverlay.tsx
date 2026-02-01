import { useState, useEffect } from 'react';

interface LoadingOverlayProps {
    onLoadingComplete?: () => void;
}

const LoadingOverlay = ({ onLoadingComplete }: LoadingOverlayProps) => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [loadingText, setLoadingText] = useState('Memuat cinta...');

    // Fun loading messages
    const loadingMessages = [
        'Memuat cinta... 💕',
        'Menyiapkan kejutan... 🎁',
        'Mengumpulkan kebahagiaan... ✨',
        'Menabur confetti... 🎊',
        'Merangkai alasan... 💝',
        'Siap-siap terharu... 🥹',
        'Hampir selesai... 🎂',
        'Selamat datang! 🎉',
    ];

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Random increment for more realistic feel
                const increment = Math.random() * 15 + 5;
                return Math.min(prev + increment, 100);
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    // Update loading text based on progress
    useEffect(() => {
        const messageIndex = Math.min(
            Math.floor(progress / 12.5),
            loadingMessages.length - 1
        );
        setLoadingText(loadingMessages[messageIndex]);
    }, [progress]);

    // Handle completion
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
            className={`loading-overlay ${progress >= 100 ? 'fade-out' : ''}`}
        >
            {/* Floating hearts background */}
            <div className="floating-elements">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="floating-heart"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            fontSize: `${Math.random() * 20 + 15}px`,
                        }}
                    >
                        {['💕', '💖', '💗', '💓', '🌸', '✨', '🎀'][i % 7]}
                    </div>
                ))}
            </div>

            {/* Main loading content */}
            <div className="loading-content">
                {/* Cute mascot/icon */}
                <div className="loading-mascot">
                    <span className="mascot-emoji">🎂</span>
                    <div className="mascot-glow"></div>
                </div>

                {/* Title */}
                <h1 className="loading-title">
                    Loading Birthday Surprise
                    <span className="title-sparkle">✨</span>
                </h1>

                {/* Progress bar container */}
                <div className="progress-container">
                    <div className="progress-bar-bg">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="progress-shine"></div>
                        </div>
                        {/* Progress bar segments for game-like feel */}
                        <div className="progress-segments">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="segment-line" />
                            ))}
                        </div>
                    </div>

                    {/* Percentage display */}
                    <div className="progress-info">
                        <span className="progress-text">{loadingText}</span>
                        <span className="progress-percentage">
                            {Math.round(progress)}%
                        </span>
                    </div>
                </div>

                {/* Loading tips - game style */}
                <div className="loading-tip">
                    <span className="tip-icon">💡</span>
                    <span className="tip-text">
                        {progress < 50
                            ? 'Tip: Scroll ke bawah untuk melihat semua alasan special!'
                            : progress < 90
                                ? 'Tip: Klik ❤️ untuk interaksi yang lebih seru!'
                                : 'Siap untuk terharu? 🥹'
                        }
                    </span>
                </div>
            </div>

            {/* Bottom decorative elements */}
            <div className="loading-footer">
                <div className="footer-hearts">
                    {'💕'.repeat(5)}
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
