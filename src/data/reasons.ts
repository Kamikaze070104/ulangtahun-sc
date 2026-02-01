import type { Reason } from '../types';

/**
 * Data containing 22 reasons why she's amazing
 * TODO: Replace placeholder content with personalized messages
 */
export const reasons: Reason[] = [
    {
        id: 1,
        title: "Konsisten",
        description: "Kamu konsisten banget dalam hal apapun, mulai dari hal kecil sampe hal besar.",
        emoji: "🎯",
        color: "primary"
    },
    {
        id: 2,
        title: "Baik hati dan tidak sombong",
        description: "Kamu baik banget dan gak pernah sombong, selalu rendah hati.",
        emoji: "💖",
        color: "secondary"
    },
    {
        id: 3,
        title: "Pinter",
        description: "Kamu pinter banget, selalu bisa ngasih solusi buat masalah.",
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
        description: "kamu perempuan paling cantik yang pernah aku liat.",
        emoji: "😁",
        color: "accent"
    },
    {
        id: 7,
        title: "Rajin Menabung",
        description: "wkwkwkwk gatau sih tapi mungkin aja :v.",
        emoji: "💰",
        color: "secondary"
    },
    {
        id: 8,
        title: "Sholehah",
        description: "aamiin ya robbal aalamin.",
        emoji: "👍",
        color: "secondary"
    },
    {
        id: 9,
        title: "Konsisten",
        description: "kamu konsisten banget dalam hal apapun, mulai dari hal kecil sampe hal besar.",
        emoji: "🔥",
        color: "accent"
    },
    {
        id: 10,
        title: "Penyabar",
        description: "keren sih sabar banget wkwkwk.",
        emoji: "😇",
        color: "primary"
    },
    {
        id: 11,
        title: "Penyayang",
        description: "sayang kucing? :v.",
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
        description: "mau belajar hal baru.",
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
        description: "jujur banget, gak pernah bohong.",
        emoji: "🗣️",
        color: "accent"
    },
    {
        id: 16,
        title: "Setia",
        description: "setia banget, gak pernah ninggalin.",
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
        description: "pemalu apa malu maluin? wkwkwk.",
        emoji: "🫣",
        color: "accent"
    },
    {
        id: 19,
        title: "Beda Dari Cewe Lain",
        description: "keren sih gak mau pacaran karena belum halal.",
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
