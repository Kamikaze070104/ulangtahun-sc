import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Gamepad2, Target, Brain, Swords } from 'lucide-react';
import BalloonPop from '../components/games/BalloonPop';
import BirthdayQuiz from '../components/games/BirthdayQuiz';
import RockPaperScissors from '../components/games/RockPaperScissors';

type GameType = 'menu' | 'balloon' | 'quiz' | 'rps';

const games = [
    {
        id: 'balloon' as const,
        title: 'BALLOON POP',
        icon: Target,
        description: 'Ledakkan balon sebanyak-banyaknya!',
        bgColor: 'bg-primary'
    },
    {
        id: 'quiz' as const,
        title: 'BIRTHDAY QUIZ',
        icon: Brain,
        description: 'Tebak-tebakan tentang Latifah',
        bgColor: 'bg-accent'
    },
    {
        id: 'rps' as const,
        title: 'SUIT',
        icon: Swords,
        description: 'Batu Gunting Kertas lawan komputer!',
        bgColor: 'bg-secondary'
    }
];

const GamesPage = () => {
    const [currentGame, setCurrentGame] = useState<GameType>('menu');

    const handleBack = () => {
        if (currentGame === 'menu') {
            window.history.back();
        } else {
            setCurrentGame('menu');
        }
    };

    return (
        <div className="min-h-[100dvh] bg-white px-4 py-6 sm:py-8 overflow-x-hidden">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto mb-8 sm:mb-12"
            >
                <button
                    onClick={handleBack}
                    className="neo-btn bg-white inline-flex items-center gap-2 mb-8 px-4 py-2 text-sm sm:text-base"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>
                        {currentGame === 'menu' ? 'KEMBALI' : 'MENU GAMES'}
                    </span>
                </button>

                {currentGame === 'menu' && (
                    <div className="text-center neo-box bg-secondary p-8 sm:p-12 mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-4 border-dark shadow-neo mb-6"
                        >
                            <Gamepad2 className="w-6 h-6 text-dark" />
                            <span className="font-black text-dark tracking-widest uppercase">MINI GAMES</span>
                        </motion.div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-dark uppercase mb-4 tracking-tighter">
                            PILIH GAME!
                        </h1>
                        <p className="text-dark font-bold text-lg sm:text-xl uppercase border-b-4 border-dark inline-block pb-1">
                            MAIN GAME SERU BARENG GWEH
                        </p>
                    </div>
                )}
            </motion.div>

            {/* Game Content */}
            <AnimatePresence mode="wait">
                {currentGame === 'menu' ? (
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {games.map((game, index) => {
                                const IconComponent = game.icon;
                                return (
                                    <motion.button
                                        key={game.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => setCurrentGame(game.id)}
                                        className={`group relative overflow-hidden text-left neo-box ${game.bgColor} p-6 sm:p-8 hover:-translate-y-2 hover:shadow-neo-lg flex flex-col items-start`}
                                    >
                                        <div className="bg-white border-4 border-dark p-4 shadow-neo mb-6 group-hover:scale-110 transition-transform">
                                            <IconComponent className="w-10 h-10 text-dark" />
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-black text-dark mb-2 uppercase tracking-tight">
                                            {game.title}
                                        </h3>
                                        <p className="text-base font-bold text-dark border-l-4 border-dark pl-3">
                                            {game.description}
                                        </p>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                ) : currentGame === 'balloon' ? (
                    <BalloonPop key="balloon" />
                ) : currentGame === 'quiz' ? (
                    <BirthdayQuiz key="quiz" />
                ) : (
                    <RockPaperScissors key="rps" />
                )}
            </AnimatePresence>
        </div>
    );
};

export default GamesPage;
