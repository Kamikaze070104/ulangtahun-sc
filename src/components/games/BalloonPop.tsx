import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Clock, Trophy, RotateCcw, Gamepad2, MousePointerClick } from 'lucide-react';

interface Balloon {
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
}

const colors = [
    'bg-primary',
    'bg-secondary',
    'bg-accent',
    'bg-white'
];

const GAME_DURATION = 30; // seconds

const BalloonPop = () => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [balloons, setBalloons] = useState<Balloon[]>([]);
    const [gameState, setGameState] = useState<'ready' | 'playing' | 'ended'>('ready');

    const containerRef = useRef<HTMLDivElement>(null);
    const startTimeRef = useRef<number | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const lastSpawnTimeRef = useRef<number>(0);
    const lastTickRef = useRef<number>(0);
    const poppedBalloonsRef = useRef<Set<number>>(new Set());

    const [highScore, setHighScore] = useState(() => {
        const saved = localStorage.getItem('balloonHighScore');
        return saved ? parseInt(saved) : 0;
    });

    const spawnBalloon = useCallback(() => {
        const containerHeight = containerRef.current?.clientHeight || 500;

        const newBalloon: Balloon = {
            id: Date.now() + Math.random(),
            x: 10 + Math.random() * 80,
            y: containerHeight + 100,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 60 + Math.random() * 40
        };
        setBalloons(prev => [...prev, newBalloon]);
    }, []);

    const popBalloon = (id: number) => {
        if (gameState !== 'playing') return;

        if (poppedBalloonsRef.current.has(id)) return;
        poppedBalloonsRef.current.add(id);

        if (navigator.vibrate) navigator.vibrate(10);

        setBalloons(prev => prev.filter(b => b.id !== id));
        setScore(prev => prev + 1);
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setBalloons([]);
        setGameState('playing');
        startTimeRef.current = Date.now();
        lastSpawnTimeRef.current = 0;
        lastTickRef.current = Date.now();
        poppedBalloonsRef.current.clear();
    };

    useEffect(() => {
        if (gameState !== 'playing') {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            return;
        }

        const tick = () => {
            const now = Date.now();
            const deltaTime = lastTickRef.current === 0 ? 0.016 : (now - lastTickRef.current) / 1000;
            lastTickRef.current = now;

            const start = startTimeRef.current || now;
            const elapsed = (now - start) / 1000;
            const remaining = Math.max(0, GAME_DURATION - elapsed);

            setTimeLeft(Math.ceil(remaining));

            if (remaining <= 0) {
                setGameState('ended');
                return;
            }

            if (now - lastSpawnTimeRef.current > 500) {
                spawnBalloon();
                lastSpawnTimeRef.current = now;
            }

            const moveSpeed = 200;

            setBalloons(prev =>
                prev
                    .map(b => ({ ...b, y: b.y - (moveSpeed * deltaTime) }))
                    .filter(b => b.y > -150)
            );

            animationFrameRef.current = requestAnimationFrame(tick);
        };

        lastTickRef.current = Date.now();
        lastSpawnTimeRef.current = Date.now();
        animationFrameRef.current = requestAnimationFrame(tick);

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [gameState, spawnBalloon]);

    useEffect(() => {
        if (gameState === 'ended' && score > highScore) {
            setHighScore(score);
            localStorage.setItem('balloonHighScore', score.toString());
        }
    }, [gameState, score, highScore]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto"
        >
            {/* Game Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="neo-box bg-white px-6 py-3 flex items-center gap-2">
                    <Target className="w-6 h-6 text-dark" />
                    <span className="font-black text-xl text-dark uppercase tracking-widest">SKOR: {score}</span>
                </div>
                <div className={`neo-box px-6 py-3 flex items-center gap-2 ${timeLeft <= 10 ? 'bg-primary animate-bounce-neo' : 'bg-white'}`}>
                    <Clock className="w-6 h-6 text-dark" />
                    <span className="font-black text-xl text-dark uppercase tracking-widest">
                        {timeLeft}S
                    </span>
                </div>
            </div>

            {/* Game Area */}
            <div
                ref={containerRef}
                className="relative neo-box bg-accent overflow-hidden shadow-neo touch-none select-none"
                style={{ height: '60vh', minHeight: '400px', maxHeight: '500px' }}
            >
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.1 }}></div>

                {gameState === 'ready' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border-4 border-dark m-4 p-8 neo-box z-10 max-h-fit self-center max-w-sm mx-auto">
                        <Gamepad2 className="w-16 h-16 text-dark mb-4" />
                        <h2 className="text-3xl sm:text-4xl font-black text-dark uppercase mb-2 text-center tracking-tighter">
                            BALLOON POP
                        </h2>
                        <p className="text-dark font-bold mb-6 text-center border-b-4 border-dark pb-2">
                            KLIK/SENTUH BALON YANG MUNCUL!
                        </p>
                        <div className="flex items-center gap-2 bg-secondary border-4 border-dark px-4 py-2 mb-6">
                            <Trophy className="w-5 h-5 text-dark" />
                            <span className="text-dark font-black tracking-widest uppercase">HIGH SCORE: {highScore}</span>
                        </div>
                        <button
                            onClick={startGame}
                            className="neo-btn px-8 py-4 w-full flex items-center justify-center gap-3 text-lg"
                        >
                            <MousePointerClick className="w-6 h-6" />
                            <span>MULAI MAIN</span>
                        </button>
                    </div>
                )}

                {gameState === 'ended' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border-4 border-dark m-4 p-8 neo-box z-10 max-h-fit self-center max-w-sm mx-auto">
                        <Clock className="w-16 h-16 text-dark mb-4" />
                        <h2 className="text-3xl sm:text-4xl font-black text-dark uppercase mb-2 tracking-tighter">
                            WAKTU HABIS!
                        </h2>
                        <p className="text-5xl sm:text-6xl font-black text-primary mb-4" style={{ textShadow: '4px 4px 0 #1a1a1a' }}>
                            {score}
                        </p>
                        {score > highScore - 1 && score > 0 && (
                            <div className="flex items-center gap-2 bg-secondary border-4 border-dark px-4 py-2 mb-6 animate-bounce-neo">
                                <Trophy className="w-6 h-6 text-dark" />
                                <span className="text-dark font-black tracking-widest uppercase">REKOR BARU!</span>
                            </div>
                        )}
                        <button
                            onClick={startGame}
                            className="neo-btn bg-secondary px-8 py-4 w-full flex items-center justify-center gap-3 text-lg mt-2"
                        >
                            <RotateCcw className="w-6 h-6" />
                            <span>MAIN LAGI</span>
                        </button>
                    </div>
                )}

                {/* Balloons */}
                <AnimatePresence>
                    {balloons.map(balloon => (
                        <motion.button
                            key={balloon.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            onPointerDown={() => popBalloon(balloon.id)}
                            className={`absolute rounded-full border-4 border-dark ${balloon.color} shadow-neo cursor-pointer active:scale-90 touch-manipulation`}
                            style={{
                                left: `${balloon.x}%`,
                                top: 0,
                                width: balloon.size,
                                height: balloon.size * 1.2,
                                y: balloon.y,
                                x: '-50%',
                                WebkitTapHighlightColor: 'transparent',
                            }}
                        >
                            <div className="absolute top-2 left-1/4 w-3 h-3 bg-white border-2 border-dark rounded-full" />
                        </motion.button>
                    ))}
                </AnimatePresence>

                {/* Ground decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-dark" />
                <div className="absolute bottom-4 left-0 right-0 h-4 bg-primary border-t-4 border-dark" />
            </div>
        </motion.div>
    );
};

export default BalloonPop;
