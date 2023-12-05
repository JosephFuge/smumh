class SurveyData {
    constructor() {
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
    }
}

let surveyInfo = new SurveyData();

function changePage(pageNum) {
    if (pageNum === 1) {
        document.getElementById("scaleQuestions").style.display = "none";
        document.getElementById("non-scaleQuestions").style.display = "block";
        document.getElementById("nextButton").style.display = "inline-block";
    } else if (pageNum === 2 && validateForm(1)) {
        document.getElementById("scaleQuestions").style.display = "block";
        document.getElementById("non-scaleQuestions").style.display = "none";
        document.getElementById("nextButton").style.display = "none";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function submitSurvey() {
    if (validateForm(2)) {
        // Send the form
    } else {
        console.log('Bad page 2');
    }
}

function validateForm(pageNum) {
    let validPage = true;
    if (pageNum === 1) {
        const ageElement = document.getElementById('age');

        if (!Number.isNaN(parseInt(ageElement.value))) {
            surveyInfo.age = parseInt(ageElement.value);
        } else {
            validPage = false;
            //TODO: Set Error Text
        }

        const genderElement = document.getElementById('gender');
        if (genderElement.value != 'select') {
            surveyInfo.gender = genderElement.value.substring(0, 1);
        } else {
            validPage = false;
            //TODO: Set Error Text
        }


        const relationshipElement = document.getElementById('relationship-status');
        if (relationshipElement.value != 'select') {
            surveyInfo.relationship = relationshipElement.value;
        } else {
            validPage = false;
            //TODO: Set Error Text
        }

        const occupationElement = document.getElementById('occupation');
        if (occupationElement.value != 'select') {
            surveyInfo.occupation = occupationElement.value;
        } else {
            validPage = false;
            //TODO: Set Error Text
        }

        /*
        <label class="organization-type-checkbox"><input type="checkbox" name="optionUniversity" value="University">University</label>
            <label class="organization-type-checkbox"><input type="checkbox" name="optionPrivate" value="Private">Private</label>
            <label class="organization-type-checkbox"><input type="checkbox" name="optionSchool" value="School">School</label>
            <label class="organization-type-checkbox"><input type="checkbox" name="optionGovernment" value="Government">Government</label>
            <label class="organization-type-checkbox"><input type="checkbox" name="optionCompany" value="Company">Company</label>
            <label class="organization-type-checkbox"><input type="checkbox" name="optionNA" value="N/A">N/A</label>
        */
        
        const organizationTypeElements = Array.from(document.getElementsByClassName('organization-type-checkbox')).map((element) => element.firstChild);
        for (let orgTypeElement of organizationTypeElements) {
            if (orgTypeElement.checked) {
                surveyInfo.organizationTypes.add(orgTypeElement.value);
                // switch (orgTypeElement.value) {
                //     case "University":
                //         break;
                //     case "Private":
                //         break;
                //     case "School":
                //         break;
                //     case "Government":
                //         break;
                //     case "Company":
                //         break;
                //     case "N/A":
                //         break;
                // }
            }
        }

        if (surveyInfo.organizationTypes.size === 0) {
            surveyInfo.organizationTypes.add("N/A");
        }


        const doesUseSocialMediaYesElement = document.getElementById('useSocialMedia-yes');
        const doesUseSocialMediaNoElement = document.getElementById('useSocialMedia-no');

        if (doesUseSocialMediaYesElement.checked) {
            surveyInfo.doesUseSocialMedia = true;
        } else if (doesUseSocialMediaNoElement.checked) {
            surveyInfo.doesUseSocialMedia = false;
        } else {
            validPage = false;
            // TODO: Set Error Text
        }

        const platformElements = Array.from(document.getElementsByClassName('platform-checkbox')).map((element) => element.firstChild);
        for (let tempPlatform of platformElements) {
            if (tempPlatform.checked) {
                surveyInfo.socialMediaPlatforms.add(tempPlatform.value);
            }
        }

        const averageTimeSpentElement = document.getElementById('averageTimeSpent');
        if (averageTimeSpentElement.value != 'select') {
            surveyInfo.averageTimeSpent = averageTimeSpentElement.value;
        } else {
            validPage = false;
            //TODO: Set Error Text
        }

        // console.log("Valid page: " + validPage);
    } else if (pageNum === 2) {
        for (let i = 9; i <= 20; i++) {
            const scaleQuestionElement = document.getElementById(`scaleQ${i}`);
            surveyInfo[`q${i}`] = scaleQuestionElement.value;
        }
        console.log(surveyInfo)
    }

    console.log("Valid page: " + validPage);
    return validPage;
}