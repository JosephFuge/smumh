/*
 this.age = 0;
        this.gender = '';
        this.relationship = '';
        this.occupation = '';
        this.organizationTypes = new Set();
        this.doesUseSocialMedia = false;
        this.socialMediaPlatforms = new Set();
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
*/

function getSurveyInfoList(pageNum) {
    const orgTypeSet = new Set(['University', 'Private', 'Government', 'Organization']);
    const platformSet = new Set(['Youtube', 'Instagram']);
    const testSurvey1 = new SurveyData(18, 'M', 'Single', 'University Student', orgTypeSet, true, platformSet, 'Between 1 and 2 hours', 2, 3, 1, 4, 3, 5, 2, 3, 5, 4, 2, 1);
    const testSurvey2 = new SurveyData();
    const testSurveys = [testSurvey1, testSurvey2];

    return testSurveys;
}

// let tableBody = document.getElementById('surveyTable').getElementsByTagName('tbody')[0];
// function populateTable(tableBody) {
//     const surveyList = getSurveyInfoList();

//     surveyList.forEach(survey => {
//         let row = tableBody.insertRow();
//         row.insertCell(0).innerHTML = survey.age;
//         row.insertCell(1).innerHTML = survey.gender;
//         row.insertCell(2).innerHTML = survey.relationship;
//         row.insertCell(3).innerHTML = survey.occupation;
//         row.insertCell(4).innerHTML = Array.from(survey.organizationTypes).join(', ');
//         row.insertCell(5).innerHTML = survey.doesUseSocialMedia ? 'Yes' : 'No';
//         row.insertCell(6).innerHTML = Array.from(survey.socialMediaPlatforms).join(', ');
//         row.insertCell(7).innerHTML = survey.averageTimeSpent;
//         for (let questionIndex = 8; questionIndex < 20; questionIndex++) {
//             row.insertCell(questionIndex).innerHTML = survey[`q${questionIndex + 1}`];
//         }
//     });
// }
