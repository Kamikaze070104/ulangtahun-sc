import { useState } from 'react';
import { motion } from 'framer-motion';

interface Question {
    question: string;
    options: string[];
    correctIndex: number;
}

// Questions about Faizal for Latifah to answer
const questions: Question[] = [
    {
        question: "Kapan pertama kali Faizal kenal sama Latifah?",
        options: ["SD", "SMP", "SMA", "Kuliah"],
        correctIndex: 1 // SMP based on reasons.ts
    },
    {
        question: "Waifu faizal siapa :v?",
        options: ["Latifah", "Waguri", "Hutao", "Robin"],
        correctIndex: 0 // "Unik" based on reasons.ts
    },
    {
        question: "Apa yang ditakutkan oleh faizal?",
        options: ["Gak ada", "Kecoa", "Begal", "Kesepian"],
        correctIndex: 3 // "Tertutup" based on reasons.ts
    },
    {
        question: "Apa makanan favorit Faizal yang tiada tandingannya?",
        options: ["Nasi Goreng", "Mie Ayam", "Semua benar", "Bakso"],
        correctIndex: 1 // Placeholder: Nasi Goreng
    },
    {
        question: "Kalau lagi gabut, Faizal biasanya ngapain?",
        options: ["Tidur seharian", "Scroll TikTok", "Coding / Ngulik Laptop", "Jalan-jalan"],
        correctIndex: 1 // Coding fits the profile
    },
    {
        question: "Apa warna yang paling sering dipakai Faizal?",
        options: ["Merah", "Kuning", "Hitam / Gelap", "Pink"],
        correctIndex: 2 // Safe bet for guys/devs
    },
    {
        question: "website ini dibuat pake teknologi apa?",
        options: ["React", "Laravel", "Next", "Angular"],
        correctIndex: 0 // Flattery answer
    },
    {
        question: "Hal apa yang paling Faizal GAK suka?",
        options: ["Dibohongi", "Dikhianati", "Disuruh-suruh", "Menunggu lama"],
        correctIndex: 1 // Generic safe answer
    },
    {
        question: "Apa yang bisa bikin faizal seneng?",
        options: ["Senyum kamu", "Liburan", "Coding", "Jailin adik :v"],
        correctIndex: 0 // Placeholder
    },
    {
        question: "Apa harapan Faizal buat Latifah di umur 22 ini?",
        options: ["ngerjain 1/3 :v", "Cepat lulus", "Bahagia & Panjang Umur", "Semua jawaban benar"],
        correctIndex: 3 // The sweet ending
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
        const isCorrect = index === questions[currentQ].correctIndex;

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
        if (percentage === 100) return { emoji: "🏆", text: "KELASS! bisa tau semua gitu, kamu intel ya??" };
        if (percentage >= 80) return { emoji: "🎉", text: "Hebat! Kamu kenal Faizal banget!" };
        if (percentage >= 60) return { emoji: "😊", text: "Lumayan! Masih perlu kenal lebih dekat~" };
        if (percentage >= 40) return { emoji: "🤔", text: "Hmm, perlu belajar lagi nih!" };
        return { emoji: "😅", text: "Yuk kenalan lagi sama Faizal!" };
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-xl mx-auto"
        >
            {!gameEnded ? (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Progress bar */}
                    <div className="h-2 bg-gray-100">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                        />
                    </div>

                    {/* Question header */}
                    <div className="p-4 sm:p-6 border-b border-gray-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500">
                                Pertanyaan {currentQ + 1}/{questions.length}
                            </span>
                            <span className="text-sm font-semibold text-primary-600">
                                Skor: {score}
                            </span>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                            {questions[currentQ].question}
                        </h2>
                    </div>

                    {/* Options */}
                    <div className="p-4 sm:p-6 space-y-3">
                        {questions[currentQ].options.map((option, index) => {
                            const isSelected = selectedAnswer === index;
                            const isCorrect = index === questions[currentQ].correctIndex;
                            const showCorrect = showResult && isCorrect;
                            const showWrong = showResult && isSelected && !isCorrect;

                            return (
                                <motion.button
                                    key={index}
                                    whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                                    onClick={() => handleAnswer(index)}
                                    disabled={selectedAnswer !== null}
                                    className={`w-full p-4 rounded-xl text-left font-medium transition-all duration-300 ${showCorrect
                                        ? 'bg-green-100 border-2 border-green-500 text-green-700'
                                        : showWrong
                                            ? 'bg-red-100 border-2 border-red-500 text-red-700'
                                            : isSelected
                                                ? 'bg-primary-100 border-2 border-primary-500'
                                                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:border-gray-200'
                                        }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${showCorrect
                                            ? 'bg-green-500 text-white'
                                            : showWrong
                                                ? 'bg-red-500 text-white'
                                                : 'bg-gray-200 text-gray-600'
                                            }`}>
                                            {showCorrect ? '✓' : showWrong ? '✗' : String.fromCharCode(65 + index)}
                                        </span>
                                        {option}
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
                    className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center"
                >
                    <div className="text-6xl mb-4">{getResultMessage().emoji}</div>
                    <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
                        Quiz Selesai!
                    </h2>
                    <p className="text-gray-600 mb-4">{getResultMessage().text}</p>
                    <div className="text-4xl font-bold text-primary-600 mb-6">
                        {score}/{questions.length}
                    </div>
                    <button
                        onClick={restartQuiz}
                        className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl active:scale-95 transition-all"
                    >
                        Main Lagi! 🔄
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default BirthdayQuiz;
