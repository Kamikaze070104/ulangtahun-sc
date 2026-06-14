import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HandMetal, Hand, Scissors, Bot, User, RotateCcw, Trophy, Frown, Handshake } from 'lucide-react';

type Choice = 'rock' | 'paper' | 'scissors';
type Result = 'win' | 'lose' | 'draw';

const choices: { id: Choice; icon: any; label: string }[] = [
    { id: 'rock', icon: HandMetal, label: 'BATU' },
    { id: 'paper', icon: Hand, label: 'KERTAS' },
    { id: 'scissors', icon: Scissors, label: 'GUNTING' }
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
        if (playerScore > computerScore) return { icon: Trophy, text: 'KAMU MENANG!', color: 'text-primary' };
        if (playerScore < computerScore) return { icon: Frown, text: 'KAMU KALAH!', color: 'text-dark' };
        return { icon: Handshake, text: 'SERI!', color: 'text-dark' };
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-xl mx-auto"
        >
            <div className="neo-box bg-white overflow-hidden">
                {/* Score Header */}
                <div className="bg-primary border-b-4 border-dark p-6">
                    <div className="flex justify-between items-center text-dark">
                        <div className="text-center flex-1 bg-white border-4 border-dark py-2 shadow-neo">
                            <div className="text-3xl font-black">{playerScore}</div>
                            <div className="text-xs font-bold uppercase tracking-widest">KAMU</div>
                        </div>
                        <div className="text-center px-6">
                            <div className="text-sm font-black uppercase tracking-widest mb-1">RONDE</div>
                            <div className="text-2xl font-black bg-white border-4 border-dark px-4 py-1">{round}/{maxRounds}</div>
                        </div>
                        <div className="text-center flex-1 bg-dark text-white border-4 border-dark py-2 shadow-neo">
                            <div className="text-3xl font-black">{computerScore}</div>
                            <div className="text-xs font-bold uppercase tracking-widest">BOT</div>
                        </div>
                    </div>
                </div>

                {!gameEnded ? (
                    <>
                        {/* Battle Area */}
                        <div className="p-6 sm:p-8 bg-secondary">
                            <div className="flex justify-between items-center mb-8 bg-white border-4 border-dark p-6 shadow-neo">
                                {/* Player */}
                                <div className="text-center flex-1 flex flex-col items-center">
                                    <motion.div
                                        key={playerChoice}
                                        initial={{ scale: 0.5, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        className="mb-4 bg-primary border-4 border-dark w-20 h-20 flex items-center justify-center"
                                    >
                                        {playerChoice ? (() => {
                                            const Icon = choices.find(c => c.id === playerChoice)?.icon;
                                            return Icon ? <Icon className="w-10 h-10 text-dark" /> : null;
                                        })() : <User className="w-10 h-10 text-dark" />}
                                    </motion.div>
                                    <div className="text-sm font-black uppercase tracking-widest text-dark bg-white border-2 border-dark px-3 py-1">Kamu</div>
                                </div>

                                {/* VS */}
                                <div className="px-6 flex flex-col items-center">
                                    <AnimatePresence mode="wait">
                                        {result ? (
                                            <motion.div
                                                key="result"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                className={`text-2xl font-black uppercase tracking-widest px-4 py-2 border-4 border-dark bg-white shadow-[4px_4px_0_0_#1a1a1a] ${result === 'win' ? 'text-green-500' :
                                                        result === 'lose' ? 'text-red-500' : 'text-dark'
                                                    }`}
                                            >
                                                {result === 'win' ? 'WIN!' : result === 'lose' ? 'LOSE' : 'DRAW'}
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="vs"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="text-4xl font-black text-dark"
                                            >
                                                VS
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Computer */}
                                <div className="text-center flex-1 flex flex-col items-center">
                                    <motion.div
                                        key={computerChoice}
                                        initial={{ scale: 0.5, rotate: 180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        className="mb-4 bg-dark border-4 border-dark w-20 h-20 flex items-center justify-center text-white"
                                    >
                                        {computerChoice ? (() => {
                                            const Icon = choices.find(c => c.id === computerChoice)?.icon;
                                            return Icon ? <Icon className="w-10 h-10" /> : null;
                                        })() : <Bot className="w-10 h-10" />}
                                    </motion.div>
                                    <div className="text-sm font-black uppercase tracking-widest text-white bg-dark border-2 border-dark px-3 py-1">Bot</div>
                                </div>
                            </div>

                            {/* Choice Buttons */}
                            <div className="grid grid-cols-3 gap-4">
                                {choices.map(choice => {
                                    const Icon = choice.icon;
                                    return (
                                        <motion.button
                                            key={choice.id}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => play(choice.id)}
                                            disabled={isPlaying}
                                            className={`neo-box bg-white p-4 flex flex-col items-center justify-center gap-3 transition-all ${isPlaying
                                                    ? 'opacity-50 cursor-not-allowed shadow-none translate-y-1 translate-x-1'
                                                    : 'hover:bg-primary-100 hover:-translate-y-1'
                                                }`}
                                        >
                                            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-dark" />
                                            <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-dark">{choice.label}</div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 sm:p-12 text-center bg-accent"
                    >
                        {(() => {
                            const ResultIcon = getFinalResult().icon;
                            return (
                                <div className={`bg-white border-4 border-dark w-24 h-24 mx-auto flex items-center justify-center mb-8 shadow-neo ${playerScore > computerScore ? 'animate-bounce-neo' : ''}`}>
                                    <ResultIcon className="w-12 h-12 text-dark" />
                                </div>
                            );
                        })()}
                        <h2 className={`text-4xl sm:text-5xl font-black mb-4 uppercase tracking-tighter ${getFinalResult().color}`} style={getFinalResult().color === 'text-primary' ? { textShadow: '3px 3px 0 #1a1a1a' } : {}}>
                            {getFinalResult().text}
                        </h2>
                        
                        <div className="neo-box bg-white inline-block px-8 py-4 mb-8">
                            <div className="text-sm font-black text-dark tracking-widest uppercase mb-1">SKOR AKHIR</div>
                            <div className="text-5xl font-black text-dark">
                                {playerScore} - {computerScore}
                            </div>
                        </div>

                        <button
                            onClick={restart}
                            className="neo-btn bg-primary w-full px-8 py-4 flex items-center justify-center gap-3 text-lg"
                        >
                            <RotateCcw className="w-6 h-6" />
                            <span>MAIN LAGI</span>
                        </button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default RockPaperScissors;
