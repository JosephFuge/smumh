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

// document.getElementById("age").addEventListener('input', function (event) {
//     const value = parseInt(document.getElementById("age").value);
//     if (Number.isNaN(value) || value < 8 || value > 130) {
//         document.getElementById("age").value = value.toString().substring(0, value.toString().length - 1);
//     }
// });

function ageOnChange() {
    const value = parseInt(document.getElementById("age").value);
    if (Number.isNaN(value) || value < 8 || value > 130) {
        document.getElementById("age").value = value.toString().substring(0, value.toString().length - 1);
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
            document.getElementById("ageError").style.display = "none";
        } else {
            validPage = false;
            document.getElementById("ageError").style.display = "block";
            //TODO: Set Error Text
        }

        const genderElement = document.getElementById('gender');
        if (genderElement.value != 'select') {
            surveyInfo.gender = genderElement.value.substring(0, 1);
            document.getElementById("genderError").style.display = "none";
        } else {
            validPage = false;
            document.getElementById("genderError").style.display = "block";
            //TODO: Set Error Text
        }


        const relationshipElement = document.getElementById('relationship-status');
        if (relationshipElement.value != 'select') {
            surveyInfo.relationship = relationshipElement.value;
            document.getElementById("relationshipError").style.display = "none";
        } else {
            validPage = false;
            document.getElementById("relationshipError").style.display = "block";
            //TODO: Set Error Text
        }

        const occupationElement = document.getElementById('occupation');
        if (occupationElement.value != 'select') {
            surveyInfo.occupation = occupationElement.value;
            document.getElementById("occupationError").style.display = "none";
        } else {
            validPage = false;
            document.getElementById("occupationError").style.display = "block";
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
        surveyInfo.organizationTypes.clear();
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
            document.getElementById("useSocialMediaError").style.display = "none";
        } else if (doesUseSocialMediaNoElement.checked) {
            surveyInfo.doesUseSocialMedia = false;
            document.getElementById("useSocialMediaError").style.display = "none";
        } else {
            validPage = false;
            document.getElementById("useSocialMediaError").style.display = "block";
            // TODO: Set Error Text
        }

        const platformElements = Array.from(document.getElementsByClassName('platform-checkbox')).map((element) => element.firstChild);
        surveyInfo.socialMediaPlatforms.clear();
        for (let tempPlatform of platformElements) {
            if (tempPlatform.checked) {
                surveyInfo.socialMediaPlatforms.add(tempPlatform.value);
            }
        }

        const averageTimeSpentElement = document.getElementById('averageTimeSpent');
        if (averageTimeSpentElement.value != 'select') {
            surveyInfo.averageTimeSpent = averageTimeSpentElement.value;
            document.getElementById("averageTimeSpentError").style.display = "none";
        } else {
            validPage = false;
            document.getElementById("averageTimeSpentError").style.display = "block";
            //TODO: Set Error Text
        }
    } else if (pageNum === 2) {
        for (let i = 9; i <= 20; i++) {
            const scaleQuestionElement = document.getElementById(`scaleQ${i}`);
            surveyInfo[`q${i}`] = scaleQuestionElement.value;
        }
        console.log(surveyInfo)
    }
    return validPage;
}