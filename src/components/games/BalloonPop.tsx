import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Balloon {
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
}

const colors = [
    'bg-red-400',
    'bg-pink-400',
    'bg-purple-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-yellow-400',
    'bg-orange-400'
];

const GAME_DURATION = 30; // seconds

const BalloonPop = () => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [balloons, setBalloons] = useState<Balloon[]>([]);
    const [gameState, setGameState] = useState<'ready' | 'playing' | 'ended'>('ready');

    // Use refs for values needed in intervals/loops without triggering re-renders
    const startTimeRef = useRef<number | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const lastSpawnTimeRef = useRef<number>(0);

    const [highScore, setHighScore] = useState(() => {
        const saved = localStorage.getItem('balloonHighScore');
        return saved ? parseInt(saved) : 0;
    });

    const spawnBalloon = useCallback(() => {
        const newBalloon: Balloon = {
            id: Date.now() + Math.random(),
            x: 10 + Math.random() * 80,
            y: 100 + Math.random() * 20,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 40 + Math.random() * 30
        };
        setBalloons(prev => [...prev, newBalloon]);
    }, []);

    const popBalloon = (id: number) => {
        // Prevent popping after game ends
        if (gameState !== 'playing') return;

        // Vibrate on mobile if supported
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
    };

    // Main Game Loop (Timer & Spawning & Movement)
    useEffect(() => {
        if (gameState !== 'playing') {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            return;
        }

        const tick = () => {
            const now = Date.now();
            const start = startTimeRef.current || now;
            const elapsed = (now - start) / 1000;
            const remaining = Math.max(0, GAME_DURATION - elapsed);

            setTimeLeft(Math.ceil(remaining));

            if (remaining <= 0) {
                setGameState('ended');
                return;
            }

            // Spawn balloons every 500ms (approx)
            if (now - lastSpawnTimeRef.current > 500) {
                spawnBalloon();
                lastSpawnTimeRef.current = now;
            }

            // Move balloons
            setBalloons(prev =>
                prev
                    .map(b => ({ ...b, y: b.y - 0.5 })) // Smoother movement speed
                    .filter(b => b.y > -20)
            );

            animationFrameRef.current = requestAnimationFrame(tick);
        };

        animationFrameRef.current = requestAnimationFrame(tick);

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [gameState, spawnBalloon]);

    // Save high score
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
            <div className="flex justify-between items-center mb-4 px-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow">
                    <span className="font-bold text-primary-600">Skor: {score}</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow">
                    <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-700'}`}>
                        ⏱️ {timeLeft}s
                    </span>
                </div>
            </div>

            {/* Game Area */}
            <div className="relative bg-gradient-to-b from-sky-200 to-sky-400 rounded-2xl overflow-hidden shadow-xl touch-none select-none"
                style={{ height: '60vh', minHeight: '400px', maxHeight: '500px' }}
            >
                {gameState === 'ready' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm z-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center px-4">
                            🎈 Balloon Pop!
                        </h2>
                        <p className="text-white/80 mb-4 text-center px-4">
                            Klik/Sentuh balon yang muncul!
                        </p>
                        <p className="text-white/60 text-sm mb-4">
                            High Score: {highScore}
                        </p>
                        <button
                            onClick={startGame}
                            className="px-8 py-3 bg-white text-primary-600 rounded-full font-bold text-lg shadow-lg hover:shadow-xl active:scale-95 transition-all"
                        >
                            Mulai! 🎮
                        </button>
                    </div>
                )}

                {gameState === 'ended' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm z-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            ⏰ Waktu Habis!
                        </h2>
                        <p className="text-4xl sm:text-5xl font-bold text-yellow-300 mb-2">
                            {score} 🎈
                        </p>
                        {score > highScore - 1 && score > 0 && (
                            <p className="text-green-300 font-semibold mb-4">
                                🎉 High Score Baru!
                            </p>
                        )}
                        <button
                            onClick={startGame}
                            className="px-8 py-3 bg-white text-primary-600 rounded-full font-bold text-lg shadow-lg hover:shadow-xl active:scale-95 transition-all"
                        >
                            Main Lagi! 🔄
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
                            // Handle both click and touch start for responsiveness
                            onPointerDown={() => popBalloon(balloon.id)}
                            className={`absolute rounded-full ${balloon.color} shadow-lg cursor-pointer active:scale-90 transition-transform touch-manipulation`}
                            style={{
                                left: `${balloon.x}%`,
                                top: `${balloon.y}%`,
                                width: balloon.size,
                                height: balloon.size * 1.2,
                                transform: 'translate(-50%, -50%)',
                                WebkitTapHighlightColor: 'transparent'
                            }}
                        >
                            <div className="absolute top-1 left-1/4 w-2 h-2 bg-white/40 rounded-full" />
                        </motion.button>
                    ))}
                </AnimatePresence>

                {/* Ground decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-green-500 to-green-400" />
            </div>
        </motion.div>
    );
};

export default BalloonPop;
