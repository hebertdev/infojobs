export interface Candidate {
    id:                       number;
    email:                    string;
    emailHash:                string;
    key:                      string;
    hasPhoto:                 boolean;
    photo:                    string;
    name:                     string;
    surname1:                 string;
    surname2:                 string;
    fullName:                 string;
    city:                     string;
    province:                 Province;
    publicProfileLink:        string;
    status:                   number;
    validatedMail:            number;
    accountCreation:          string;
    lastCVUpdate:             string;
    lastInscripcion:          string;
    extendedBannerAttributes: string;
    subSegment:               string;
    doesNotWantNotifications: boolean;
    photoAccepted:            boolean;
}

export interface Province {
    id:    number;
    value: string;
}

export interface Cv {
    id:              number;
    code:            string;
    name:            string;
    principal:       boolean;
    completed:       boolean;
    incompleteSteps: any[];
}

export interface FutureJob {
    employmentStatus:                string;
    motivationToChange:              string;
    futureJobGoals:                  string;
    lastJobSearch:                   string;
    preferredPosition:               string;
    subcategories:                   string[];
    contractTypes:                   string[];
    workDay:                         string;
    availabilityToChangeHomeAddress: string;
    availabilityToTravel:            string;
    preferredDestinations:           string[];
    salaryPeriod:                    string;
    salaryMin:                       string;
    preferredSalary:                 string;
    monthlyNewsletter:               boolean;
    newsAnnouncements:               boolean;
}
