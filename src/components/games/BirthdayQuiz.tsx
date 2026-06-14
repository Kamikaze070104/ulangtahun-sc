import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, PartyPopper, Smile, Brain, Frown, Check, X, RotateCcw } from 'lucide-react';

interface Question {
    question: string;
    options: string[];
    correctIndex: number | number[];
}

const questions: Question[] = [
    {
        question: "Kapan pertama kali Faizal kenal sama Latifah?",
        options: ["SD", "SMP", "SMA", "Kuliah"],
        correctIndex: 1
    },
    {
        question: "Waifu faizal siapa :v?",
        options: ["Latifah", "Waguri", "Hutao", "Robin"],
        correctIndex: 0
    },
    {
        question: "kapan pertama kali kita jalan bareng",
        options: ["Gak ada", "pulang dari muara", "gacoan", "tegalega"],
        correctIndex: 1
    },
    {
        question: "Apa hobi latifah :v?",
        options: ["Masak", "Olahraga", "Makan", "Tidur"],
        correctIndex: 3
    },
    {
        question: "Apa yang ditakutin latifah?",
        options: ["Tikus", "Kecoa", "Cicak", "kucing"],
        correctIndex: 1
    },
    {
        question: "Apa warna kesukaan latifah?",
        options: ["Merah", "Kuning", "Hitam / Gelap", "Pink"],
        correctIndex: 2
    },
    {
        question: "website ini dibuat pake teknologi apa? (iseng dikit :v)",
        options: ["React", "Laravel", "Next", "Angular"],
        correctIndex: 0
    },
    {
        question: "Apakah Faizal suka Latifah?",
        options: ["Iya", "Yes", "Enya", "Pasti"],
        correctIndex: [0, 1, 2, 3]
    },
    {
        question: "Apa yang bisa bikin faizal seneng?",
        options: ["Senyum kamu", "Liburan", "Coding", "Jailin adik :v"],
        correctIndex: 0
    },
    {
        question: "Apa harapan Faizal buat Latifah di umur 22 ini?",
        options: ["ngerjain 1/3 :v", "Cepat lulus", "Bahagia & Panjang Umur", "Semua jawaban benar"],
        correctIndex: 3
    }
];

const BirthdayQuiz = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);

    const handleAnswer = (index: number) => {
        if (selectedAnswer !== null) return;

        setSelectedAnswer(index);

        const currentCorrect = questions[currentQ].correctIndex;
        const isCorrect = Array.isArray(currentCorrect)
            ? currentCorrect.includes(index)
            : index === currentCorrect;

        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        setShowResult(true);

        setTimeout(() => {
            if (currentQ < questions.length - 1) {
                setCurrentQ(prev => prev + 1);
                setSelectedAnswer(null);
                setShowResult(false);
            } else {
                setGameEnded(true);
            }
        }, 1500);
    };

    const restartQuiz = () => {
        setCurrentQ(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setGameEnded(false);
    };

    const getResultMessage = () => {
        const percentage = (score / questions.length) * 100;
        if (percentage === 100) return { icon: Trophy, text: "KELASS! bisa tau semua gitu, kamu intel ya??" };
        if (percentage >= 80) return { icon: PartyPopper, text: "Hebat! Kerja bagus!" };
        if (percentage >= 60) return { icon: Smile, text: "Lumayan!" };
        if (percentage >= 40) return { icon: Brain, text: "Hmm, perlu belajar lagi nih!" };
        return { icon: Frown, text: "Yuk belajar lagi!" };
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-xl mx-auto"
        >
            {!gameEnded ? (
                <div className="neo-box bg-white overflow-hidden">
                    {/* Progress bar */}
                    <div className="h-6 bg-white border-b-4 border-dark flex">
                        <motion.div
                            className="h-full bg-accent border-r-4 border-dark"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                            transition={{ type: 'spring', bounce: 0 }}
                        />
                    </div>

                    {/* Question header */}
                    <div className="p-6 sm:p-8 border-b-4 border-dark bg-secondary">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-black text-dark tracking-widest uppercase bg-white border-2 border-dark px-3 py-1">
                                Q {currentQ + 1}/{questions.length}
                            </span>
                            <span className="text-sm font-black text-dark tracking-widest uppercase bg-white border-2 border-dark px-3 py-1">
                                SKOR: {score}
                            </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-dark uppercase tracking-tight">
                            {questions[currentQ].question}
                        </h2>
                    </div>

                    {/* Options */}
                    <div className="p-6 sm:p-8 space-y-4 bg-white">
                        {questions[currentQ].options.map((option, index) => {
                            const isSelected = selectedAnswer === index;
                            const currentCorrect = questions[currentQ].correctIndex;
                            const isCorrect = Array.isArray(currentCorrect)
                                ? currentCorrect.includes(index)
                                : index === currentCorrect;

                            const showCorrect = showResult && isCorrect;
                            const showWrong = showResult && isSelected && !isCorrect;

                            return (
                                <motion.button
                                    key={index}
                                    whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                                    onClick={() => handleAnswer(index)}
                                    disabled={selectedAnswer !== null}
                                    className={`w-full p-4 border-4 border-dark text-left font-bold uppercase transition-all duration-300 flex items-center justify-between ${showCorrect
                                        ? 'bg-green-400 translate-x-1 translate-y-1'
                                        : showWrong
                                            ? 'bg-red-400 translate-x-1 translate-y-1'
                                            : isSelected
                                                ? 'bg-primary'
                                                : 'bg-white hover:bg-primary-100 hover:-translate-y-1 hover:shadow-neo'
                                        }`}
                                >
                                    <span className="flex items-center gap-4">
                                        <span className={`w-10 h-10 border-4 border-dark flex items-center justify-center text-lg font-black ${showCorrect
                                            ? 'bg-white text-green-600'
                                            : showWrong
                                                ? 'bg-white text-red-600'
                                                : 'bg-secondary text-dark'
                                            }`}>
                                            {showCorrect ? <Check strokeWidth={4} className="w-6 h-6" /> : showWrong ? <X strokeWidth={4} className="w-6 h-6" /> : String.fromCharCode(65 + index)}
                                        </span>
                                        <span className="text-dark tracking-wide">{option}</span>
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="neo-box bg-accent p-8 sm:p-12 text-center"
                >
                    {(() => {
                        const ResultIcon = getResultMessage().icon;
                        return (
                            <div className="bg-white border-4 border-dark w-24 h-24 mx-auto flex items-center justify-center mb-8 shadow-neo animate-bounce-neo">
                                <ResultIcon className="w-12 h-12 text-dark" />
                            </div>
                        );
                    })()}
                    
                    <h2 className="text-4xl sm:text-5xl font-black text-dark uppercase mb-4 tracking-tighter">
                        QUIZ SELESAI!
                    </h2>
                    <p className="text-xl font-bold text-dark border-b-4 border-dark inline-block pb-2 mb-8 uppercase">
                        {getResultMessage().text}
                    </p>
                    
                    <div className="neo-box bg-white inline-block px-8 py-4 mb-8">
                        <div className="text-sm font-black text-dark tracking-widest uppercase mb-1">SKOR AKHIR</div>
                        <div className="text-5xl font-black text-primary" style={{ textShadow: '4px 4px 0 #1a1a1a' }}>
                            {score}/{questions.length}
                        </div>
                    </div>
                    
                    <button
                        onClick={restartQuiz}
                        className="neo-btn bg-secondary w-full px-8 py-4 flex items-center justify-center gap-3 text-lg"
                    >
                        <RotateCcw className="w-6 h-6" />
                        <span>MAIN LAGI</span>
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default BirthdayQuiz;
