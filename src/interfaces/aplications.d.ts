export interface AplicationResponse {
    totalFound:              number;
    htmlApplicationsEnabled: boolean;
    applications:            Application[];
}

export interface Application {
    rejected:          boolean;
    offerRemoved:      boolean;
    processClosed:     boolean;
    code:              string;
    date:              string;
    lastEvent:         Event;
    cvReceivedEvent:   Event;
    eventsReadPending: number;
    jobOffer:          JobOffer;
}

export interface Event {
    tipoId:          number;
    date:            string;
    description:     string;
    initializer:     boolean;
    finisher:        boolean;
    rejectedReasons: any[];
}

export interface JobOffer {
    code:    string;
    title:   string;
    company: string;
    city:    string;
    logoUrl: string;
}
