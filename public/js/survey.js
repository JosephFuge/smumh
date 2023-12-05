
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
        }

        const genderElement = document.getElementById('gender');
        if (genderElement.value != 'select') {
            surveyInfo.gender = genderElement.value.substring(0, 1);
            document.getElementById("genderError").style.display = "none";
        } else {
            validPage = false;
            document.getElementById("genderError").style.display = "block";
        }


        const relationshipElement = document.getElementById('relationship-status');
        if (relationshipElement.value != 'select') {
            surveyInfo.relationship = relationshipElement.value;
            document.getElementById("relationshipError").style.display = "none";
        } else {
            validPage = false;
            document.getElementById("relationshipError").style.display = "block";
        }

        const occupationElement = document.getElementById('occupation');
        if (occupationElement.value != 'select') {
            surveyInfo.occupation = occupationElement.value;
            document.getElementById("occupationError").style.display = "none";
        } else {
            validPage = false;
            document.getElementById("occupationError").style.display = "block";
        }
        
        const organizationTypeElements = Array.from(document.getElementsByClassName('organization-type-checkbox')).map((element) => element.firstChild);
        surveyInfo.organizationTypes.clear();
        for (let orgTypeElement of organizationTypeElements) {
            if (orgTypeElement.checked) {
                surveyInfo.organizationTypes.add(orgTypeElement.value);
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