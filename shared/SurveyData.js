
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
        this.Age = age ? age : 0;
        this.Gender = gender ? gender : '';
        this.RelationshipStatus = relationship ? relationship : '';
        this.OccupationStatus = occupation ? occupation : '';
        this.OrganizationTypes = organizationTypes ? organizationTypes : [];
        this.UseSocial = doesUseSocialMedia ? doesUseSocialMedia : false;
        this.SocialMediaPlatforms = socialMediaPlatforms ? socialMediaPlatforms : [];
        this.AvgTimePerDay = averageTimeSpent ? averageTimeSpent : '';
        this.Q9 = q9 ? q9 : 1;
        this.Q10 = q10 ? q10 : 1;
        this.Q11 = q11 ? q11 : 1;
        this.Q12 = q12 ? q12 : 1;
        this.Q13 = q13 ? q13 : 1;
        this.Q14 = q14 ? q14 : 1;
        this.Q15 = q15 ? q15 : 1;
        this.Q16 = q16 ? q16 : 1;
        this.Q17 = q17 ? q17 : 1;
        this.Q18 = q18 ? q18 : 1;
        this.Q19 = q19 ? q19 : 1;
        this.Q20 = q20 ? q20 : 1;
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = SurveyData;
} else {
    // For browser environment
    window.SurveyData = SurveyData;
}