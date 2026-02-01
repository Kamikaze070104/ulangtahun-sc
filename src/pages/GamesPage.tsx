import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import BalloonPop from '../components/games/BalloonPop';
import BirthdayQuiz from '../components/games/BirthdayQuiz';
import RockPaperScissors from '../components/games/RockPaperScissors';

type GameType = 'menu' | 'balloon' | 'quiz' | 'rps';

const games = [
    {
        id: 'balloon' as const,
        title: 'Balloon Pop',
        emoji: '🎈',
        description: 'Ledakkan balon sebanyak-banyaknya!',
        color: 'from-pink-500 to-red-500'
    },
    {
        id: 'quiz' as const,
        title: 'Birthday Quiz',
        emoji: '🎂',
        description: 'Tebak hal-hal tentang Faizal, berani??',
        color: 'from-purple-500 to-indigo-500'
    },
    {
        id: 'rps' as const,
        title: 'Suit',
        emoji: '✊',
        description: 'Batu Gunting Kertas lawan komputer!',
        color: 'from-amber-500 to-orange-500'
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
        <div className="min-h-[100dvh] bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4 py-6 sm:py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto mb-6 sm:mb-8"
            >
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors mb-4 p-2 -ml-2 rounded-lg hover:bg-white/50"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">
                        {currentGame === 'menu' ? 'Kembali' : 'Menu Games'}
                    </span>
                </button>

                {currentGame === 'menu' && (
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-4"
                        >
                            <Gamepad2 className="w-5 h-5 text-primary-500" />
                            <span className="font-semibold text-gray-700">Mini Games</span>
                        </motion.div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                            Pilih Game! 🎮
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Main game seru bareng gweh~
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {games.map((game, index) => (
                                <motion.button
                                    key={game.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setCurrentGame(game.id)}
                                    className="group relative overflow-hidden rounded-2xl p-6 sm:p-8 text-left bg-white shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                                    <div className="relative z-10">
                                        <span className="text-4xl sm:text-5xl block mb-3">
                                            {game.emoji}
                                        </span>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                                            {game.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {game.description}
                                        </p>
                                    </div>
                                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${game.color} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`} />
                                </motion.button>
                            ))}
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
