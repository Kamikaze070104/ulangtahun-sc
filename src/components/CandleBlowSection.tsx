import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { fadeInUp, scaleIn, staggerContainer } from '../constants/animations';
import { Mic, Flame, Sparkles } from 'lucide-react';

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

    useEffect(() => {
        if (!isInView || !candlesLit || hasBlown) {
            setAudioVolume(0);
            return;
        }

        const initMic = async () => {
            try {
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

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
        }
        const average = sum / bufferLength;

        if (isHoldingRef.current) {
            setAudioVolume(average);

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
    };

    const triggerCelebration = () => {
        const colors = ['#ff90e8', '#ffc900', '#00e5ff', '#1a1a1a'];

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
            <div className="container mx-auto text-center max-w-2xl">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    {/* Title */}
                    <motion.div variants={fadeInUp} className="neo-box p-6 bg-secondary">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-dark uppercase mb-2">
                            {hasBlown ? 'SELAMAT!' : 'MAKE A WISH!'}
                        </h2>
                        <p className="text-lg sm:text-xl text-dark font-bold uppercase">
                            {hasBlown
                                ? 'SEMOGA HARAPANMU TERKABUL!'
                                : micPermission === false
                                    ? 'TEKAN TOMBOL DI BAWAH UNTUK TIUP LILIN!'
                                    : 'TAHAN TOMBOL MIC SAMBIL TIUP LILINNYA!'}
                        </p>
                    </motion.div>

                    {/* Brutalist Birthday Cake */}
                    <motion.div
                        variants={scaleIn}
                        className="relative flex flex-col items-center mt-12 mb-8"
                    >
                        {/* Candles */}
                        <div className="flex gap-8 mb-[-16px] z-10 relative">
                            {/* Number 2 */}
                            <div className="flex flex-col items-center">
                                <AnimatePresence>
                                    {candlesLit && (
                                        <motion.div
                                            initial={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0, transition: { duration: 0.4 } }}
                                            className="text-primary mb-2 animate-bounce-neo"
                                        >
                                            <Flame className="w-12 h-12 fill-primary" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div className="neo-box w-12 h-20 bg-white flex items-center justify-center -mb-2 border-b-0 border-t-4 border-l-4 border-r-4 border-dark">
                                    <span className="font-display font-black text-4xl text-dark">2</span>
                                </div>
                            </div>
                            
                            {/* Number 2 */}
                            <div className="flex flex-col items-center">
                                <AnimatePresence>
                                    {candlesLit && (
                                        <motion.div
                                            initial={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0, transition: { duration: 0.4, delay: 0.1 } }}
                                            className="text-secondary mb-2 animate-bounce-neo"
                                        >
                                            <Flame className="w-12 h-12 fill-secondary" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div className="neo-box w-12 h-20 bg-white flex items-center justify-center -mb-2 border-b-0 border-t-4 border-l-4 border-r-4 border-dark">
                                    <span className="font-display font-black text-4xl text-dark">2</span>
                                </div>
                            </div>
                        </div>

                        {/* Cake Top Tier */}
                        <div className="w-48 sm:w-56 h-16 sm:h-20 bg-primary neo-box z-10 relative flex justify-center items-center">
                            <Sparkles className="w-8 h-8 text-dark absolute -left-4 -top-4 bg-white rounded-full p-1 border-2 border-dark" />
                        </div>
                        
                        {/* Cake Bottom Tier */}
                        <div className="w-64 sm:w-72 h-20 sm:h-24 bg-accent neo-box -mt-4 z-0 relative flex justify-center items-center">
                            <div className="absolute top-4 left-4 w-4 h-4 bg-dark rounded-full"></div>
                            <div className="absolute bottom-4 right-8 w-4 h-4 bg-dark rounded-full"></div>
                            <div className="absolute top-8 right-4 w-4 h-4 bg-dark rounded-full"></div>
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
                                    <div className="flex items-center gap-2 text-dark bg-white px-6 py-2 border-4 border-dark shadow-neo uppercase font-bold tracking-widest mb-4">
                                        <Mic className={`w-5 h-5 ${isHolding && audioVolume > 10 ? 'animate-bounce-neo text-primary' : ''}`} />
                                        <span>
                                            {isHolding ? 'MENDENGARKAN...' : 'MICROPHONE SIAP'}
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
                                    className="neo-btn px-8 py-4 w-full sm:w-auto text-xl"
                                    style={{ touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
                                >
                                    <span className="flex items-center gap-3 justify-center">
                                        {isBlowing ? (
                                            <>MENIUP...</>
                                        ) : isHolding ? (
                                            <>TIUP SEKARANG!</>
                                        ) : (
                                            <><Mic className="w-6 h-6" /> {micPermission ? 'TAHAN & TIUP' : 'TIUP LILIN!'}</>
                                        )}
                                    </span>
                                </motion.button>
                            </>
                        ) : (
                            <motion.button
                                onClick={relightCandles}
                                className="neo-btn bg-white px-8 py-4 text-xl flex items-center justify-center gap-2"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                            >
                                <Flame className="w-6 h-6" /> NYALAKAN LAGI
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
                                className="neo-box p-4 bg-primary"
                            >
                                <motion.p
                                    className="text-xl sm:text-2xl text-dark font-black uppercase"
                                >
                                    HARAPANMU SUDAH TERKIRIM KE ALAM SEMESTA!
                                </motion.p>
                                <p className="text-dark font-bold mt-2 uppercase">
                                    SCROLL KE BAWAH UNTUK PESAN SPESIAL
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
