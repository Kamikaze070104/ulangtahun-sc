import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { fadeInUp, scaleIn, staggerContainer } from '../constants/animations';
import { Mic } from 'lucide-react';

/**
 * Candle Blow Section Component
 * Beautiful birthday cake with number "22" candles based on reference image
 * Features: Golden glittery number candles, two-tier pink cake, flower decorations
 * UPDATE: Added microphone interaction to blow out candles
 */

const CandleBlowSection = () => {
    const [candlesLit, setCandlesLit] = useState(true);
    const [hasBlown, setHasBlown] = useState(false);
    const [isBlowing, setIsBlowing] = useState(false);
    const [micPermission, setMicPermission] = useState<boolean | null>(null);
    const [audioVolume, setAudioVolume] = useState(0);
    const [isHolding, setIsHolding] = useState(false);
    const isHoldingRef = useRef(false);

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { amount: 0.5 });

    // Initialize Microphone
    useEffect(() => {
        if (!isInView || !candlesLit || hasBlown) {
            setAudioVolume(0);
            return;
        }

        const initMic = async () => {
            try {
                // Check if browser supports getUserMedia
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    setMicPermission(false);
                    return;
                }

                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setMicPermission(true);

                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                audioContextRef.current = audioContext;

                const analyser = audioContext.createAnalyser();
                analyser.fftSize = 512;
                analyser.smoothingTimeConstant = 0.4;
                analyserRef.current = analyser;

                const microphone = audioContext.createMediaStreamSource(stream);
                microphoneRef.current = microphone;
                microphone.connect(analyser);

                detectBlow();
            } catch (err) {
                console.error("Microphone access denied:", err);
                setMicPermission(false);
            }
        };

        initMic();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, [isInView, candlesLit, hasBlown]);

    const detectBlow = () => {
        if (!analyserRef.current) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate average volume
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
        }
        const average = sum / bufferLength;

        if (isHoldingRef.current) {
            setAudioVolume(average);

            // Threshold for "blowing" (adjusted for better sensitivity)
            // Lowered from 40 to 20 based on user feedback
            const BLOW_THRESHOLD = 20;

            if (average > BLOW_THRESHOLD && candlesLit && !isBlowing) {
                blowCandles();
            }
        } else {
            setAudioVolume(0);
        }

        animationFrameRef.current = requestAnimationFrame(detectBlow);
    };

    const blowCandles = () => {
        if (!candlesLit || isBlowing) return;

        setIsBlowing(true);
        setCandlesLit(false);

        // Stop listening to mic
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        setTimeout(() => {
            setHasBlown(true);
            triggerCelebration();
            setIsBlowing(false);
        }, 800);
    };

    const relightCandles = () => {
        setCandlesLit(true);
        setHasBlown(false);
        // Effect will re-run to restart mic
    };

    const triggerCelebration = () => {
        const colors = ['#f9a8d4', '#fcd34d', '#c084fc', '#fb7185', '#fef3c7'];

        // Side bursts
        confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors: colors
        });
        confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors: colors
        });

        // Center burst
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.5 },
                colors: colors
            });
        }, 200);
    };

    const handlePressStart = (e: any) => {
        e.preventDefault();
        if (micPermission) {
            setIsHolding(true);
            isHoldingRef.current = true;
        }
    };

    const handlePressEnd = () => {
        if (micPermission) {
            setIsHolding(false);
            isHoldingRef.current = false;
        }
    };

    return (
        <section
            ref={sectionRef}
            id="candle-blow"
            className="scroll-section min-h-[100dvh] flex items-center justify-center relative overflow-hidden px-4 py-12"
        >
            {/* Floating confetti particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="confetti-particle"
                        style={{
                            left: `${10 + Math.random() * 80}%`,
                            top: `${20 + Math.random() * 60}%`,
                            backgroundColor: ['#f9a8d4', '#fcd34d', '#fef3c7', '#fbcfe8'][i % 4],
                            width: `${4 + Math.random() * 4}px`,
                            height: `${8 + Math.random() * 8}px`,
                            borderRadius: '2px',
                            transform: `rotate(${Math.random() * 360}deg)`,
                        }}
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 180, 360],
                            opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto text-center max-w-2xl">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    {/* Title */}
                    <motion.div variants={fadeInUp}>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold gradient-text mb-2">
                            {hasBlown ? '🎉 Selamat!' : '✨ Make a Wish! ✨'}
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600">
                            {hasBlown
                                ? 'Semoga semua harapanmu terkabul!'
                                : micPermission === false
                                    ? 'Tekan tombol di bawah untuk tiup lilin!'
                                    : 'Tahan tombol 🎙️ di bawah sambil tiup lilinnya! 💨'}
                        </p>
                    </motion.div>

                    {/* Birthday Cake */}
                    <motion.div
                        variants={scaleIn}
                        className="cake-scene"
                    >
                        {/* Glow effect when lit */}
                        <AnimatePresence>
                            {candlesLit && (
                                <motion.div
                                    className="candle-ambient-glow"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                                />
                            )}
                        </AnimatePresence>

                        {/* Number Candles "22" */}
                        <div className="number-candles-22">
                            {/* First "2" */}
                            <div className="number-candle-digit">
                                <div className="digit-body">2</div>
                                <AnimatePresence>
                                    {candlesLit && (
                                        <motion.div
                                            className="digit-flame"
                                            initial={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0, transition: { duration: 0.4 } }}
                                        >
                                            <div className="flame-outer" />
                                            <div className="flame-inner" />
                                            <div className="flame-glow" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                {!candlesLit && (
                                    <motion.div
                                        className="digit-smoke"
                                        initial={{ opacity: 0, y: 0 }}
                                        animate={{ opacity: [0, 0.6, 0], y: -30 }}
                                        transition={{ duration: 1.5 }}
                                    />
                                )}
                            </div>

                            {/* Second "2" */}
                            <div className="number-candle-digit">
                                <div className="digit-body">2</div>
                                <AnimatePresence>
                                    {candlesLit && (
                                        <motion.div
                                            className="digit-flame"
                                            initial={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0, transition: { duration: 0.4, delay: 0.1 } }}
                                        >
                                            <div className="flame-outer" />
                                            <div className="flame-inner" />
                                            <div className="flame-glow" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                {!candlesLit && (
                                    <motion.div
                                        className="digit-smoke"
                                        initial={{ opacity: 0, y: 0 }}
                                        animate={{ opacity: [0, 0.6, 0], y: -30 }}
                                        transition={{ duration: 1.5, delay: 0.1 }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Two-tier Cake */}
                        <div className="cute-cake">
                            {/* Top Tier */}
                            <div className="cake-tier tier-top">
                                <div className="tier-frosting" />
                                <div className="tier-body" />
                            </div>

                            {/* Bottom Tier */}
                            <div className="cake-tier tier-bottom">
                                <div className="tier-frosting" />
                                <div className="tier-body" />
                                {/* Flower decorations */}
                                <div className="flower-decoration flower-left">🌸</div>
                                <div className="flower-decoration flower-right">🌼</div>
                                <div className="flower-decoration flower-bottom-left">🌸</div>
                                <div className="flower-decoration flower-bottom-right">🌼</div>
                            </div>

                            {/* Plate */}
                            <div className="cake-plate-base" />
                        </div>
                    </motion.div>

                    {/* Action Button */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col items-center gap-4"
                    >
                        {!hasBlown ? (
                            <>
                                {micPermission === true && (
                                    <div className="flex items-center gap-2 text-primary-600 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                                        <Mic className={`w-5 h-5 ${isHolding && audioVolume > 10 ? 'animate-pulse text-red-500' : ''}`} />
                                        <span className="text-sm font-medium">
                                            {isHolding ? 'Mendengarkan...' : 'Microphone Siap'}
                                        </span>
                                    </div>
                                )}

                                <motion.button
                                    onPointerDown={handlePressStart}
                                    onPointerUp={handlePressEnd}
                                    onPointerLeave={handlePressEnd}
                                    onPointerCancel={handlePressEnd}
                                    onContextMenu={(e) => e.preventDefault()}
                                    onClick={!micPermission ? blowCandles : undefined}
                                    disabled={isBlowing || !candlesLit}
                                    className="blow-button"
                                    style={{ touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="blow-button-bg" />
                                    <span className="blow-button-text">
                                        {isBlowing ? (
                                            <><span className="animate-pulse">💨</span> Meniup...</>
                                        ) : isHolding ? (
                                            <><span className="animate-pulse">🌬️</span> Tiup Sekarang!</>
                                        ) : (
                                            <><span>🎙️</span> {micPermission ? 'Tahan & Tiup' : 'Tiup Lilin!'}</>
                                        )}
                                    </span>
                                </motion.button>
                            </>
                        ) : (
                            <motion.button
                                onClick={relightCandles}
                                className="relight-button"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                            >
                                🕯️ Nyalakan Lagi
                            </motion.button>
                        )}
                    </motion.div>

                    {/* Success Message */}
                    <AnimatePresence>
                        {hasBlown && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-3"
                            >
                                <motion.p
                                    className="text-xl sm:text-2xl text-gray-700 font-medium"
                                    animate={{ scale: [1, 1.03, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    ✨ Harapanmu sudah terkirim ke alam semesta! ✨
                                </motion.p>
                                <p className="text-gray-500 text-sm">
                                    Scroll ke bawah untuk pesan spesial 💝
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default CandleBlowSection;
