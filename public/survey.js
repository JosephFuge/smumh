class SurveyData {
    constructor() {
        this.age = '';
        this.gender = '';
        this.relationship = '';
        this.occupation = '';
        this.organizationTypes = [];
        this.doesUseSocialMedia = false;
        this.socialMediaPlatforms = [];
        this.averageTimeSpent = '';
        this.q9 = 1;
        this.q10 = 1;
        this.q11 = 1;
        this.q12 = 1;
        this.q13 = 1;
        this.q14 = 1;
        this.q15 = 1;
        this.q16 = 1;
        this.q17 = 1;
        this.q18 = 1;
        this.q19 = 1;
        this.q20 = 1;
    }
}

function changePage(pageNum) {
    if (pageNum === 1) {
        document.getElementById("scaleQuestions").style.display = "none";
        document.getElementById("non-scaleQuestions").style.display = "block";
        document.getElementById("nextButton").style.display = "inline-block";
    } else if (pageNum === 2) {
        document.getElementById("scaleQuestions").style.display = "block";
        document.getElementById("non-scaleQuestions").style.display = "none";
        document.getElementById("nextButton").style.display = "none";
    } else {
        console.log('Invalid page number');
    }
}