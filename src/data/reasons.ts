import { 
    Target, Heart, Brain, Ear, Smile, Sparkles, Coins, 
    ThumbsUp, Flame, HeartHandshake, Cat, HandHeart, BookOpen, 
    Coffee, MessageCircle, ShieldCheck, Home, EyeOff, 
    Star, Gem, PartyPopper, Palette 
} from 'lucide-react';
import type { Reason } from '../types';

/**
 * Data containing 22 reasons why she's amazing
 */
export const reasons: Reason[] = [
    {
        id: 1,
        title: "Konsisten",
        description: "selama aku kenal kamu, aku lihat kamu konsisten dalam beribadah, belajar, dll. pertahankan yaa.",
        icon: Target,
        color: "primary"
    },
    {
        id: 2,
        title: "Baik hati dan tidak sombong",
        description: "Kalau baik hati jelass, itu yang bikin aku suka. kalo sombong selama kenal kamu gapernah liat kamu sombong.",
        icon: Heart,
        color: "secondary"
    },
    {
        id: 3,
        title: "Pinter",
        description: "Pinter bukan cuma soal akademik aja kak, tapi pinter dalam bersikap, pinter dalam menghadapi masalah, dll.",
        icon: Brain,
        color: "accent"
    },
    {
        id: 4,
        title: "Pendengar yang baik",
        description: "Kamu pendengar yang baik, selalu bisa ngasih solusi buat masalah.",
        icon: Ear,
        color: "primary"
    },
    {
        id: 5,
        title: "Lucu",
        description: "lucu banget (tingginya 148cm jir) wkwkwk.",
        icon: Smile,
        color: "secondary"
    },
    {
        id: 6,
        title: "Cantik",
        description: "kamu perempuan paling cantik yang pernah aku liat, semangat yaa cantik.",
        icon: Sparkles,
        color: "accent"
    },
    {
        id: 7,
        title: "Rajin Menabung",
        description: "wkwkwkwk gatau sih tapi mungkin aja aku gatau soalnya, tapi aku yakin kamu rajin menabung.",
        icon: Coins,
        color: "secondary"
    },
    {
        id: 8,
        title: "Sholehah",
        description: "aamiin ya robbal aalamin, semoga istiqomah yaa.",
        icon: ThumbsUp,
        color: "secondary"
    },
    {
        id: 9,
        title: "unik",
        description: "unik disini itu maksudnya gak fomo kemakan standar tiktok dll, keren sih tidak terbawa arus.",
        icon: Flame,
        color: "accent"
    },
    {
        id: 10,
        title: "Penyabar",
        description: "sabar dalam menghadapi masalah.",
        icon: HeartHandshake,
        color: "primary"
    },
    {
        id: 11,
        title: "Penyayang",
        description: "waktu aku pertama kali denger kamu suka ngasih makan kucing yang lewat, disitu aku simpulin kamu itu penyayang, ak jg mw.",
        icon: Cat,
        color: "secondary"
    },
    {
        id: 12,
        title: "Perhatian",
        description: "perhatian banget, gak ekspek.",
        icon: HandHeart,
        color: "accent"
    },
    {
        id: 13,
        title: "Mau Belajar",
        description: "mau belajar hal baru walaupun pelan pelan yang penting berusaha.",
        icon: BookOpen,
        color: "primary"
    },
    {
        id: 14,
        title: "Malas",
        description: "malesan kadang wkwkwk.",
        icon: Coffee,
        color: "secondary"
    },
    {
        id: 15,
        title: "Jujur",
        description: "mulai terbuka, sering jujur cerita kalau dulu masih cukup tertutup.",
        icon: MessageCircle,
        color: "accent"
    },
    {
        id: 16,
        title: "Setia",
        description: "bayangin dari awal-awal masuk smp sampai sekarang masih berteman baik, kerenn.",
        icon: ShieldCheck,
        color: "primary"
    },
    {
        id: 17,
        title: "Introvert",
        description: "introvert tapi kalo udah kenal asik.",
        icon: Home,
        color: "secondary"
    },
    {
        id: 18,
        title: "Pemalu",
        description: "nah ini yang jadi point plus dari kamu, pemalu tapi bikin gemes tapi tetep harus berani bersosialisasi yaa.",
        icon: EyeOff,
        color: "accent"
    },
    {
        id: 19,
        title: "Ramah",
        description: "ramah dan punya senyum yang manis.",
        icon: Star,
        color: "primary"
    },
    {
        id: 20,
        title: "Mandiri",
        description: "mandiri banget, gak pernah nyusahin orang.",
        icon: Gem,
        color: "secondary"
    },
    {
        id: 21,
        title: "Seru",
        description: "seru banget diajak ngobrol.",
        icon: PartyPopper,
        color: "accent"
    },
    {
        id: 22,
        title: "Jadi Diri Sendiri",
        description: "kamu jadi diri sendiri, gak pernah nyoba jadi orang lain.",
        icon: Palette,
        color: "primary"
    }
];

export const getReasonById = (id: number): Reason | undefined => {
    return reasons.find(reason => reason.id === id);
};

export const getAllReasons = (): Reason[] => {
    return reasons;
};
