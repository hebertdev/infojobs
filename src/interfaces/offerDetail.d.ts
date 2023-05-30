export interface OfferDetail {
    title:                          string;
    id:                             string;
    state:                          number;
    creationDate:                   string;
    updateDate:                     string;
    city:                           string;
    externalUrlForm:                string;
    blocked:                        boolean;
    applications:                   number;
    province:                       Category;
    experienceMin:                  Category;
    category:                       Category;
    subcategory:                    Category;
    studiesMin:                     Category;
    residence:                      Category;
    country:                        Category;
    contractType:                   Category;
    journey:                        Category;
    subSegment:                     number;
    profile:                        Profile;
    cityPD:                         number;
    zipCode:                        string;
    latitude:                       number;
    longitude:                      number;
    exactLocation:                  boolean;
    department:                     string;
    vacancies:                      number;
    minRequirements:                string;
    description:                    string;
    desiredRequirements:            string;
    commissions:                    string;
    contractDuration:               string;
    referenceId:                    string;
    detailedStudiesId:              number;
    studying:                       boolean;
    showPay:                        boolean;
    multiProvince:                  boolean;
    maxPay:                         Pay;
    minPay:                         Pay;
    schedule:                       string;
    jobLevel:                       Category;
    staffInCharge:                  Category;
    hasKillerQuestions:             number;
    hasOpenQuestions:               number;
    upsellings:                     Upsellings;
    epreselec:                      boolean;
    fiscalAddress:                  string;
    shouldAskExportConsent:         boolean;
    exportConsentName:              string;
    link:                           string;
    active:                         boolean;
    archived:                       boolean;
    deleted:                        boolean;
    disponibleForFullVisualization: boolean;
    availableForVisualization:      boolean;
    skillsList:                     any[];
    salaryDescription:              string;
}

export interface Category {
    id:    number;
    value: string;
}

export interface Pay {
    amount:      number;
    amountId:    number;
    periodId:    number;
    periodValue: string;
    amountValue: string;
}

export interface Profile {
    id:                    string;
    name:                  string;
    description:           string;
    province:              Category;
    web:                   string;
    numberWorkers:         number;
    url:                   string;
    corporateWebsiteUrl:   string;
    websiteUrl:            string;
    hidden:                boolean;
    typeIndustry:          Category;
    country:               Category;
    corporateResponsive:   boolean;
    showCorporativeHeader: boolean;
    clientId:              number;
    followable:            boolean;
}

export interface Upsellings {
    highlightHomeMonth:     boolean;
    highlightHomeWeek:      boolean;
    highlightSubcategory:   boolean;
    highlightLogo:          boolean;
    highlightColor:         boolean;
    highlightUrgent:        boolean;
    highlightStandingOffer: boolean;
}
