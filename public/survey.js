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

// const secondFormPage = '<!-- Q9: USING SOCIAL WITHOUT PURPOSE -->\
// <h3 class="survey-question">How often do you find yourself using Social media without a specific purpose?</h3>    \
// <div class="scale-group">\
//     <label>On a scale of 1 to 5:</label><br>\
//     <input type="range" id="scale" name="scale" min="1" max="5" step="1">\
//     <div class="scale-labels">\
//         <span>1</span>\
//         <span>2</span>\
//         <span>3</span>\
//         <span>4</span>\
//         <span>5</span>\
//     </div>\
// </div>\
// \
// \
// <!-- Q10: DISTRACTED BY SOCIAL MEDIA -->\
// <h3 class="survey-question">How often do you get distracted by Social media when you are busy doing something?</h3>    \
// <div class="scale-group">\
//     <label>On a scale of 1 to 5:</label><br>\
//     <input type="range" id="scale" name="scale" min="1" max="5" step="1">\
//     <div class="scale-labels">\
//         <span>1</span>\
//         <span>2</span>\
//         <span>3</span>\
//         <span>4</span>\
//         <span>5</span>\
//     </div>\
// </div>\
// \
// <!-- Q11: RESTLESS WITHOUT SOCIAL MEDIA -->\
// <h3 class="survey-question">Do you feel restless if you haven\'t used Social media in a while?</h3>    \
// <div class="scale-group">\
//     <label>On a scale of 1 to 5:</label><br>\
//     <input type="range" id="scale" name="scale" min="1" max="5" step="1">\
//     <div class="scale-labels">\
//         <span>1</span>\
//         <span>2</span>\
//         <span>3</span>\
//         <span>4</span>\
//         <span>5</span>\
//     </div>\
// </div>\
// \
// <!-- Q12: HOW EASILY DISTRACTED -->\
// <h3 class="survey-question">On a scale of 1 to 5, how easily distracted are you?</h3>    \
// <div class="scale-group">\
//     <label>On a scale of 1 to 5:</label><br>\
//     <input type="range" id="scale" name="scale" min="1" max="5" step="1">\
//     <div class="scale-labels">\
//         <span>1</span>\
//         <span>2</span>\
//         <span>3</span>\
//         <span>4</span>\
//         <span>5</span>\
//     </div>\
// </div>\
// \
// <!-- Q13: HOW BOTHERED BY WORRIES -->\
// <h3 class="survey-question">On a scale of 1 to 5, how much are you bothered by worries?</h3>    \
// <div class="scale-group">\
//     <label>On a scale of 1 to 5:</label><br>\
//     <input type="range" id="scale" name="scale" min="1" max="5" step="1">\
//     <div class="scale-labels">\
//         <span>1</span>\
//         <span>2</span>\
//         <span>3</span>\
//         <span>4</span>\
//         <span>5</span>\
//     </div>\
// </div>\
// \
// <!-- Q14: DIFFICULT TO CONCENTRATE -->\
// <h3 class="survey-question">Do you find it difficult to concentrate on things?</h3>    \
// <div class="scale-group">\
//     <label>On a scale of 1 to 5:</label><br>\
//     <input type="range" id="scale" name="scale" min="1" max="5" step="1">\
//     <div class="scale-labels">\
//         <span>1</span>\
//         <span>2</span>\
//         <span>3</span>\
//         <span>4</span>\
//         <span>5</span>\
//     </div>\
// </div>        \
// \
// <!-- Q15: HOW OFTEN DO YOU COMPARE -->\
// <h3 class="survey-question">On a scale of 1-5, how often do you compare yourself to other successful people through the use of social media?</h3>    \
// <div class="scale-group">\
//     <label>On a scale of 1 to 5:</label><br>\
//     <input type="range" id="scale" name="scale" min="1" max="5" step="1">\
//     <div class="scale-labels">\
//         <span>1</span>\
//         <span>2</span>\
//         <span>3</span>\
//         <span>4</span>\
//         <span>5</span>\
//     </div>\
// </div>\
// \
// <!-- Q16: HOW DO YOU FEEL ABOUT COMPARISONS -->\
// <h3 class="survey-question">Following the previous question, how do you feel about these comparisons, generally speaking?</h3>    \
// <div class="scale-group">\
//     <label>On a scale of 1 to 5:</label><br>\
//     <input type="range" id="scale" name="scale" min="1" max="5" step="1">\
//     <div class="scale-labels">\
//         <span>1</span>\
//         <span>2</span>\
//         <span>3</span>\
//         <span>4</span>\
//         <span>5</span>\
//     </div>\
// </div>\
// \
// <!-- Q17: VALIDATION FROM SOCIAL MEDIA -->\
// <h3 class="survey-question">How often do you look to seek validation from features of social media?</h3>    \
// <div class="scale-group">\
//     <label>On a scale of 1 to 5:</label><br>\
//     <input type="range" id="scale" name="scale" min="1" max="5" step="1">\
//     <div class="scale-labels">\
//         <span>1</span>\
//         <span>2</span>\
//         <span>3</span>\
//         <span>4</span>\
//         <span>5</span>\
//     </div>\
// </div>\
// \
// <!-- Q18: DEPRESSED OR DOWN -->\
// <h3 class="survey-question">How often do you feel depressed or down?</h3>    \
// <div class="scale-group">\
//     <label>On a scale of 1 to 5:</label><br>\
//     <input type="range" id="scale" name="scale" min="1" max="5" step="1">\
//     <div class="scale-labels">\
//         <span>1</span>\
//         <span>2</span>\
//         <span>3</span>\
//         <span>4</span>\
//         <span>5</span>\
//     </div>\
// </div>\
// \
// <!-- Q19: INTEREST IN DAILY ACTIVITIES -->\
// <h3 class="survey-question">On a scale of 1 to 5, how frequently does your interest in daily activities fluctuate?</h3>    \
// <div class="scale-group">\
//     <label>On a scale of 1 to 5:</label><br>\
//     <input type="range" id="scale" name="scale" min="1" max="5" step="1">\
//     <div class="scale-labels">\
//         <span>1</span>\
//         <span>2</span>\
//         <span>3</span>\
//         <span>4</span>\
//         <span>5</span>\
//     </div>\
// </div>\
// <!-- Q20: SLEEP ISSUES -->\
// <h3 class="survey-question">On a scale of 1 to 5, how often do you face issues regarding sleep?</h3>    \
// <div class="scale-group">\
//     <label>On a scale of 1 to 5:</label><br>\
//     <input type="range" id="scale" name="scale" min="1" max="5" step="1">\
//     <div class="scale-labels">\
//         <span>1</span>\
//         <span>2</span>\
//         <span>3</span>\
//         <span>4</span>\
//         <span>5</span>\
//     </div>\
// </div>\
// \
// \
// <input type="submit" value="Submit">\';