// Type definitions for the birthday website

export interface Reason {
    id: number;
    title: string;
    description: string;
    emoji: string;
    color: 'primary' | 'secondary' | 'accent';
}

export interface AnimationVariant {
    hidden: {
        opacity: number;
        y?: number;
        scale?: number;
        x?: number;
    };
    visible: {
        opacity: number;
        y?: number;
        scale?: number;
        x?: number;
        transition?: {
            duration?: number;
            delay?: number;
            ease?: string | number[];
        };
    };
}
