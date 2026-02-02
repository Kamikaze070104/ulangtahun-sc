import type { Reason } from '../types';

/**
 * Data containing 22 reasons why she's amazing
 * TODO: Replace placeholder content with personalized messages
 */
export const reasons: Reason[] = [
    {
        id: 1,
        title: "Konsisten",
        description: "selama aku kenal kamu, aku lihat kamu konsisten dalam beribadah, belajar, dll. pertahankan yaa.",
        emoji: "🎯",
        color: "primary"
    },
    {
        id: 2,
        title: "Baik hati dan tidak sombong",
        description: "Kalau baik hati jelass, itu yang bikin aku suka. kalo sombong selama kenal kamu gapernah liat kamu sombong.",
        emoji: "💖",
        color: "secondary"
    },
    {
        id: 3,
        title: "Pinter",
        description: "Pinter bukan cuma soal akademik aja kak, tapi pinter dalam bersikap, pinter dalam menghadapi masalah, dll.",
        emoji: "🧠",
        color: "accent"
    },
    {
        id: 4,
        title: "Pendengar yang baik",
        description: "Kamu pendengar yang baik, selalu bisa ngasih solusi buat masalah.",
        emoji: "👂",
        color: "primary"
    },
    {
        id: 5,
        title: "Lucu",
        description: "lucu banget (tingginya 148cm jir) wkwkwk.",
        emoji: "😂",
        color: "secondary"
    },
    {
        id: 6,
        title: "Cantik",
        description: "kamu perempuan paling cantik yang pernah aku liat, semangat yaa cantik.",
        emoji: "😁",
        color: "accent"
    },
    {
        id: 7,
        title: "Rajin Menabung",
        description: "wkwkwkwk gatau sih tapi mungkin aja aku gatau soalnya, tapi aku yakin kamu rajin menabung.",
        emoji: "💰",
        color: "secondary"
    },
    {
        id: 8,
        title: "Sholehah",
        description: "aamiin ya robbal aalamin, semoga istiqomah yaa.",
        emoji: "👍",
        color: "secondary"
    },
    {
        id: 9,
        title: "unik",
        description: "unik disini itu maksudnya gak fomo kemakan standar tiktok dll, keren sih tidak terbawa arus.",
        emoji: "🔥",
        color: "accent"
    },
    {
        id: 10,
        title: "Penyabar",
        description: "sabar dalam menghadapi masalah.",
        emoji: "😇",
        color: "primary"
    },
    {
        id: 11,
        title: "Penyayang",
        description: "waktu aku pertama kali denger kamu suka ngasih makan kucing yang lewat, disitu aku simpulin kamu itu penyayang, ak jg mw.",
        emoji: "🐱",
        color: "secondary"
    },
    {
        id: 12,
        title: "Perhatian",
        description: "perhatian banget, gak ekspek.",
        emoji: "👌",
        color: "accent"
    },
    {
        id: 13,
        title: "Mau Belajar",
        description: "mau belajar hal baru walaupun pelan pelan yang penting berusaha.",
        emoji: "📚",
        color: "primary"
    },
    {
        id: 14,
        title: "Malas",
        description: "malesan kadang wkwkwk.",
        emoji: "😴",
        color: "secondary"
    },
    {
        id: 15,
        title: "Jujur",
        description: "mulai terbuka, sering jujur cerita kalau dulu masih cukup tertutup.",
        emoji: "🗣️",
        color: "accent"
    },
    {
        id: 16,
        title: "Setia",
        description: "bayangin dari awal-awal masuk smp sampai sekarang masih berteman baik, kerenn.",
        emoji: "🤞",
        color: "primary"
    },
    {
        id: 17,
        title: "Introvert",
        description: "introvert tapi kalo udah kenal asik.",
        emoji: "🏠",
        color: "secondary"
    },
    {
        id: 18,
        title: "Pemalu",
        description: "nah ini yang jadi point plus dari kamu, pemalu tapi bikin gemes tapi tetep harus berani bersosialisasi yaa.",
        emoji: "🫣",
        color: "accent"
    },
    {
        id: 19,
        title: "Ramah",
        description: "ramah dan punya senyum yang manis.",
        emoji: "😱",
        color: "primary"
    },
    {
        id: 20,
        title: "Mandiri",
        description: "mandiri banget, gak pernah nyusahin orang.",
        emoji: "💎",
        color: "secondary"
    },
    {
        id: 21,
        title: "Seru",
        description: "seru banget diajak ngobrol.",
        emoji: "🥳",
        color: "accent"
    },
    {
        id: 22,
        title: "Jadi Diri Sendiri",
        description: "kamu jadi diri sendiri, gak pernah nyoba jadi orang lain.",
        emoji: "🌈",
        color: "primary"
    }
];

/**
 * Get a reason by its ID
 */
export const getReasonById = (id: number): Reason | undefined => {
    return reasons.find(reason => reason.id === id);
};

/**
 * Get all reasons
 */
export const getAllReasons = (): Reason[] => {
    return reasons;
};
