
class SurveyData {
    // constructor() {
    //     this.age = 0;
    //     this.gender = '';
    //     this.relationship = '';
    //     this.occupation = '';
    //     this.organizationTypes = new Set();
    //     this.doesUseSocialMedia = false;
    //     this.socialMediaPlatforms = new Set();
    //     this.averageTimeSpent = '';
    //     this.q9 = 1;
    //     this.q10 = 1;
    //     this.q11 = 1;
    //     this.q12 = 1;
    //     this.q13 = 1;
    //     this.q14 = 1;
    //     this.q15 = 1;
    //     this.q16 = 1;
    //     this.q17 = 1;
    //     this.q18 = 1;
    //     this.q19 = 1;
    //     this.q20 = 1;
    // }

    constructor(age, gender, relationship, occupation, organizationTypes, doesUseSocialMedia, socialMediaPlatforms, averageTimeSpent, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20) {
        this.age = age ? age : 0;
        this.gender = gender ? gender : '';
        this.relationship = relationship ? relationship : '';
        this.occupation = occupation ? occupation : '';
        this.organizationTypes = organizationTypes ? organizationTypes : new Set();
        this.doesUseSocialMedia = doesUseSocialMedia ? doesUseSocialMedia : false;
        this.socialMediaPlatforms = socialMediaPlatforms ? socialMediaPlatforms : new Set();
        this.averageTimeSpent = averageTimeSpent ? averageTimeSpent : '';
        this.q9 = q9 ? q9 : 1;
        this.q10 = q10 ? q10 : 1;
        this.q11 = q11 ? q11 : 1;
        this.q12 = q12 ? q12 : 1;
        this.q13 = q13 ? q13 : 1;
        this.q14 = q14 ? q14 : 1;
        this.q15 = q15 ? q15 : 1;
        this.q16 = q16 ? q16 : 1;
        this.q17 = q17 ? q17 : 1;
        this.q18 = q18 ? q18 : 1;
        this.q19 = q19 ? q19 : 1;
        this.q20 = q20 ? q20 : 1;
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = SurveyData;
} else {
    // For browser environment
    window.SurveyData = SurveyData;
}