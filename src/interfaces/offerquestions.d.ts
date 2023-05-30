export interface OpenQuestion {
    id:       number;
    question: string;
}

export interface KillerQuestion {
    id:       number;
    question: string;
    answers:  Answer[];
}

export interface Answer {
    id:     number;
    answer: string;
}

