import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Choice = 'rock' | 'paper' | 'scissors';
type Result = 'win' | 'lose' | 'draw';

const choices: { id: Choice; emoji: string; label: string }[] = [
    { id: 'rock', emoji: '✊', label: 'Batu' },
    { id: 'paper', emoji: '✋', label: 'Kertas' },
    { id: 'scissors', emoji: '✌️', label: 'Gunting' }
];

const getResult = (player: Choice, computer: Choice): Result => {
    if (player === computer) return 'draw';
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'win';
    }
    return 'lose';
};

const RockPaperScissors = () => {
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [round, setRound] = useState(1);
    const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
    const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
    const [result, setResult] = useState<Result | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);

    const maxRounds = 5;

    const play = (choice: Choice) => {
        if (isPlaying) return;

        setIsPlaying(true);
        setPlayerChoice(choice);

        // Animate computer choice
        let counter = 0;
        const interval = setInterval(() => {
            setComputerChoice(choices[counter % 3].id);
            counter++;
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            const compChoice = choices[Math.floor(Math.random() * 3)].id;
            setComputerChoice(compChoice);

            const roundResult = getResult(choice, compChoice);
            setResult(roundResult);

            if (roundResult === 'win') setPlayerScore(prev => prev + 1);
            if (roundResult === 'lose') setComputerScore(prev => prev + 1);

            setTimeout(() => {
                if (round >= maxRounds) {
                    setGameEnded(true);
                } else {
                    setRound(prev => prev + 1);
                    setPlayerChoice(null);
                    setComputerChoice(null);
                    setResult(null);
                    setIsPlaying(false);
                }
            }, 1500);
        }, 1000);
    };

    const restart = () => {
        setPlayerScore(0);
        setComputerScore(0);
        setRound(1);
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult(null);
        setIsPlaying(false);
        setGameEnded(false);
    };

    const getFinalResult = () => {
        if (playerScore > computerScore) return { emoji: '🎉', text: 'Kamu Menang!', color: 'text-green-500' };
        if (playerScore < computerScore) return { emoji: '😢', text: 'Kamu Kalah!', color: 'text-red-500' };
        return { emoji: '🤝', text: 'Seri!', color: 'text-yellow-500' };
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-md mx-auto"
        >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Score Header */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white">
                    <div className="flex justify-between items-center">
                        <div className="text-center flex-1">
                            <div className="text-3xl font-bold">{playerScore}</div>
                            <div className="text-sm opacity-80">Kamu</div>
                        </div>
                        <div className="text-center px-4">
                            <div className="text-sm opacity-80 mb-1">Ronde</div>
                            <div className="text-xl font-bold">{round}/{maxRounds}</div>
                        </div>
                        <div className="text-center flex-1">
                            <div className="text-3xl font-bold">{computerScore}</div>
                            <div className="text-sm opacity-80">Komputer</div>
                        </div>
                    </div>
                </div>

                {!gameEnded ? (
                    <>
                        {/* Battle Area */}
                        <div className="p-6 sm:p-8">
                            <div className="flex justify-between items-center mb-8">
                                {/* Player */}
                                <div className="text-center flex-1">
                                    <motion.div
                                        key={playerChoice}
                                        initial={{ scale: 0.5, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        className="text-5xl sm:text-6xl mb-2"
                                    >
                                        {playerChoice ? choices.find(c => c.id === playerChoice)?.emoji : '❓'}
                                    </motion.div>
                                    <div className="text-sm text-gray-500">Kamu</div>
                                </div>

                                {/* VS */}
                                <div className="px-4">
                                    <AnimatePresence mode="wait">
                                        {result ? (
                                            <motion.div
                                                key="result"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                className={`text-xl font-bold ${result === 'win' ? 'text-green-500' :
                                                        result === 'lose' ? 'text-red-500' : 'text-yellow-500'
                                                    }`}
                                            >
                                                {result === 'win' ? 'WIN!' : result === 'lose' ? 'LOSE' : 'DRAW'}
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="vs"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="text-2xl font-bold text-gray-300"
                                            >
                                                VS
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Computer */}
                                <div className="text-center flex-1">
                                    <motion.div
                                        key={computerChoice}
                                        initial={{ scale: 0.5, rotate: 180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        className="text-5xl sm:text-6xl mb-2"
                                    >
                                        {computerChoice ? choices.find(c => c.id === computerChoice)?.emoji : '🤖'}
                                    </motion.div>
                                    <div className="text-sm text-gray-500">Komputer</div>
                                </div>
                            </div>

                            {/* Choice Buttons */}
                            <div className="grid grid-cols-3 gap-3">
                                {choices.map(choice => (
                                    <motion.button
                                        key={choice.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => play(choice.id)}
                                        disabled={isPlaying}
                                        className={`p-4 rounded-xl border-2 transition-all ${isPlaying
                                                ? 'opacity-50 cursor-not-allowed border-gray-200'
                                                : 'border-gray-200 hover:border-amber-400 hover:bg-amber-50 active:bg-amber-100'
                                            }`}
                                    >
                                        <div className="text-3xl sm:text-4xl mb-1">{choice.emoji}</div>
                                        <div className="text-xs sm:text-sm text-gray-600">{choice.label}</div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 sm:p-8 text-center"
                    >
                        <div className="text-6xl mb-4">{getFinalResult().emoji}</div>
                        <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${getFinalResult().color}`}>
                            {getFinalResult().text}
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Skor akhir: {playerScore} - {computerScore}
                        </p>
                        <button
                            onClick={restart}
                            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl active:scale-95 transition-all"
                        >
                            Main Lagi! 🔄
                        </button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default RockPaperScissors;
