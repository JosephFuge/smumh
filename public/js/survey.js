
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
        const surveyDataBody = JSON.stringify(surveyInfo);
        console.log(surveyDataBody);
        fetch('/api/createSurvey', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: surveyDataBody
        });
    }
}

function validateForm(pageNum) {
    let validPage = true;
    if (pageNum === 1) {
        const ageElement = document.getElementById('age');

        if (!Number.isNaN(parseInt(ageElement.value))) {
            surveyInfo.Age = parseInt(ageElement.value);
            document.getElementById("ageError").style.display = "none";
        } else {
            validPage = false;
            document.getElementById("ageError").style.display = "block";
        }

        const genderElement = document.getElementById('gender');
        if (genderElement.value != 'select') {
            surveyInfo.Gender = genderElement.value;
            document.getElementById("genderError").style.display = "none";
        } else {
            validPage = false;
            document.getElementById("genderError").style.display = "block";
        }


        const relationshipElement = document.getElementById('relationship-status');
        if (relationshipElement.value != 'select') {
            surveyInfo.RelationshipStatus = relationshipElement.value;
            document.getElementById("relationshipError").style.display = "none";
        } else {
            validPage = false;
            document.getElementById("relationshipError").style.display = "block";
        }

        const occupationElement = document.getElementById('occupation');
        if (occupationElement.value != 'select') {
            surveyInfo.OccupationStatus = occupationElement.value;
            document.getElementById("occupationError").style.display = "none";
        } else {
            validPage = false;
            document.getElementById("occupationError").style.display = "block";
        }
        
        const organizationTypeElements = Array.from(document.getElementsByClassName('organization-type-checkbox')).map((element) => element.firstChild);
        surveyInfo.OrganizationTypes = [];
        for (let orgTypeElement of organizationTypeElements) {
            if (orgTypeElement.checked) {
                surveyInfo.OrganizationTypes.push(orgTypeElement.value);
            }
        }

        if (surveyInfo.OrganizationTypes.length === 0) {
            surveyInfo.OrganizationTypes.push("N/A");
        }


        const doesUseSocialMediaYesElement = document.getElementById('useSocialMedia-yes');
        const doesUseSocialMediaNoElement = document.getElementById('useSocialMedia-no');

        if (doesUseSocialMediaYesElement.checked) {
            surveyInfo.UseSocial = true;
            document.getElementById("useSocialMediaError").style.display = "none";
        } else if (doesUseSocialMediaNoElement.checked) {
            surveyInfo.UseSocial = false;
            document.getElementById("useSocialMediaError").style.display = "none";
        } else {
            validPage = false;
            document.getElementById("useSocialMediaError").style.display = "block";
        }

        const platformElements = Array.from(document.getElementsByClassName('platform-checkbox')).map((element) => element.firstChild);
        surveyInfo.SocialMediaPlatforms = [];
        for (let tempPlatform of platformElements) {
            if (tempPlatform.checked) {
                surveyInfo.SocialMediaPlatforms.push(tempPlatform.value);
            }
        }

        const averageTimeSpentElement = document.getElementById('averageTimeSpent');
        if (averageTimeSpentElement.value != 'select') {
            surveyInfo.AvgTimePerDay = averageTimeSpentElement.value;
            document.getElementById("averageTimeSpentError").style.display = "none";
        } else {
            validPage = false;
            document.getElementById("averageTimeSpentError").style.display = "block";
        }
    } else if (pageNum === 2) {
        for (let i = 9; i <= 20; i++) {
            const scaleQuestionElement = document.getElementById(`scaleQ${i}`);
            surveyInfo[`Q${i}`] = scaleQuestionElement.value;
        }
    }
    return validPage;
}