export interface ApplyOfferBody {
    curriculumCode:       string;
    coverLetter?:          CoverLetter;
    offerOpenQuestions:   OfferOpenQuestion[];
    offerKillerQuestions: OfferKillerQuestion[];
}

export interface CoverLetter {
    name:   string;
    key:    string;
    main:   boolean;
    text:   string;
    doSave: boolean;
}

export interface OfferKillerQuestion {
    id:       number;
    answerId: number;
}

export interface OfferOpenQuestion {
    id:     number;
    answer: string;
}
