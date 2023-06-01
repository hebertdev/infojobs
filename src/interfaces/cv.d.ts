export interface CVMin {
    id:              number;
    code:            string;
    name:            string;
    principal:       boolean;
    completed:       boolean;
    incompleteSteps: any[];
}

export interface CvExperienseResponse {
    experience: Experience[];
}

export interface Experience {
    id:            string;
    company:       string;
    job:           string;
    description:   string;
    startingDate:  Date;
    finishingDate: Date;
    onCourse:      boolean;
    category:      string;
    subcategories: any[];
    industry:      string;
    level:         string;
    staff:         string;
    salaryMin:     string;
    salaryMax:     string;
    hideSalary:    boolean;
    visible:       boolean;
    expertise:     Expertise[];
}

export interface Expertise {
    skill: string;
}



export interface CvEducationResponse {
    education: Education[];
}

export interface EducationRes {
    id:                 number;
    educationLevelCode: string;
    courseName?:        string;
    finishingDate:      Date;
    stillEnrolled:      boolean;
    institutionName:    string;
    hideEducation:      boolean;
    courseCode?:        string;
    startingDate?:      Date;
}
