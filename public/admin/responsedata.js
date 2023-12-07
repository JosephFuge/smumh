let currentPage = 0;
let isSearching = false;

function changePage(pageNum) {
    const newPage = Array.from(document.getElementsByClassName(`page-${pageNum}`));
    if (newPage.length > 0) {
        const oldPage = Array.from(document.getElementsByClassName(`page-${currentPage}`));
        oldPage.forEach((rowElement) => rowElement.style.display = 'none');
    
        newPage.forEach((rowElement) => rowElement.style.display = 'table-row');
        currentPage = pageNum;
    }
}

function addListeners() {
    const currentUrl = window.location.href;

    if (currentUrl.includes('searchResponses?')) {
        isSearching = true;
    }

    document.getElementById('responseSearchBar').addEventListener("keyup", (event) => { 
        if (event.key == 'Enter') { 
            document.getElementById('responseSearchButton').click();
        } 
    }); 

    document.getElementById('searchForm').addEventListener('submit', function(event) {
        let searchValue = document.getElementById('responseSearchBar').value;
        
        if (!searchValue || searchValue.trim().length === 0) {
            // Prevent form submission
            event.preventDefault();
            if (isSearching) {
                isSearching = false;
                window.location.href = '/admin';
            }
        } else {
            isSearching = true;
        }
    });
}

function selectOneRow(responseID) {
    Array.from(document.getElementsByClassName(`page-${currentPage}`)).forEach((tempRow) => {
        if (tempRow.id !== `response-${responseID}`) {
            tempRow.style.display = 'none';
        }
    });
    document.getElementById('showAllButton').style.display = 'inline-block';
}

function showSingleResponseBox(Age, Gender, RelationshipStatus, OccupationStatus, Organizations, UseSocial, Platforms, AvgTimePerDay, Q9, Q10, Q11, Q12, Q13, Q14, Q15, Q16, Q17, Q18, Q19, Q20) {
    document.getElementById("showSingleResponse").style.display = "";
    document.getElementById("age").innerHTML = Age;
    document.getElementById("gender").innerHTML = Gender;
    document.getElementById("relationshipStatus").innerHTML = RelationshipStatus;
    document.getElementById("occupationStatus").innerHTML = OccupationStatus;
    document.getElementById("affiliatedOrganizations").innerHTML = Organizations;
    document.getElementById("useSocialMedia").innerHTML = UseSocial == "Y" ? "Yes":"No";
    document.getElementById("socialMediaPlatforms").innerHTML = Platforms;
    document.getElementById("timePerDay").innerHTML = AvgTimePerDay;
    document.getElementById("Q9").innerHTML = numToText(Q9, "Never", "Rarely", "Neutral", "Sometimes", "Always");
    document.getElementById("Q10").innerHTML = numToText(Q10, "Never", "Rarely", "Neutral", "Sometimes", "Always");
    document.getElementById("Q11").innerHTML = numToText(Q11, "Never", "Rarely", "Neutral", "Sometimes", "Always");
    document.getElementById("Q12").innerHTML = numToText(Q12, "Not easily", "Less easily", "Neutral", "Somewhat easily", "Very easily");
    document.getElementById("Q13").innerHTML = numToText(Q13, "Not bothered", "Less bothered", "Neutral", "Somewhat bothered", "Very bothered");
    document.getElementById("Q14").innerHTML = numToText(Q14, "Never", "Rarely", "Neutral", "Sometimes", "Always");
    document.getElementById("Q15").innerHTML = numToText(Q15, "Never", "Rarely", "Neutral", "Sometimes", "Always");
    document.getElementById("Q16").innerHTML = numToText(Q16, "Horrible", "Not great", "Neutral", "Good", "Great");
    document.getElementById("Q17").innerHTML = numToText(Q17, "Never", "Rarely", "Neutral", "Sometimes", "Always");
    document.getElementById("Q18").innerHTML = numToText(Q18, "Never", "Rarely", "Neutral", "Sometimes", "Always");
    document.getElementById("Q19").innerHTML = numToText(Q19, "Not frequently", "Less frequently", "Neutral", "Somewhat frequently", "Very frequently");
    document.getElementById("Q20").innerHTML = numToText(Q20, "Never", "Rarely", "Neutral", "Sometimes", "Always");
}

function numToText(Q, value1, value2, value3, value4, value5) {
    let outcome = "";
    if (Q == 1) {
        outcome = value1;
    }
    else if (Q == 2) {
        outcome = value2;
    }
    else if (Q == 3) {
        outcome = value3;
    }
    else if (Q == 4) {
        outcome = value4;
    }
    else if (Q == 5) {
        outcome = value5;
    }
    else {
        outcome = "No answer";
    }

    return(outcome)
}

function searchText() {
    const searchInputText = document.getElementById('responseSearchBar').value;
    if (searchInputText && searchInputText.length > 0) {
        fetch(`/api/auth/searchResponses?text=${searchInputText}`, {
            method: 'get',
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });
    } else if (searchInputText && searchInputText.length === 0) {
        location.window.reload();
    }
}

function showShowAll() {
    document.getElementById('showAllButton').style.display = 'inline-block';
}

function showAllRows() {
    if (isSearching == true) {
        isSearching = false
        window.location.href = '/admin'
        document.getElementById('showAllButton').style.display = 'none';
        sessionStorage.setItem('search', 'false')
    }
    else {
        Array.from(document.getElementsByClassName(`page-${currentPage}`)).forEach((tempRow) => {
            tempRow.style.display = 'table-row';
        });
        document.getElementById('showSingleResponse').style.display = 'none';
        document.getElementById('showAllButton').style.display = 'none';
        sessionStorage.setItem('search', 'false')
    }
}

function togglePassword(fieldId) {
      var passwordField = document.getElementById(fieldId);
      passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
}
    
function checkPassword() {
      var password = document.getElementById('password').value;
      var confirmPassword = document.getElementById('confirmPassword').value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
      }

      return true;
}

function showAdminManage() {
    window.sessionStorage.setItem("manage", "true")
    document.getElementById("manageUsers").style.display = "";
    document.getElementById("createUser").style.display = "none";
    document.getElementById("showTable").style.display = "none";
    document.getElementById("showSingleResponse").style.display = "none";
    document.getElementById("viewSurveyButton").style.fontWeight = "";
    document.getElementById("viewUsersButton").style.fontWeight = "bold";
}

function showAdminCreate() {
    document.getElementById("manageUsers").style.display = "none";
    document.getElementById("createUser").style.display = "";
    document.getElementById("showTable").style.display = "none";
    document.getElementById("showSingleResponse").style.display = "none";
    document.getElementById('deleteError').style.display = "none";
}

function showSurveyData() {
    sessionStorage.setItem("manage", "false")
    document.getElementById("manageUsers").style.display = "none";
    document.getElementById("createUser").style.display = "none";
    document.getElementById("showTable").style.display = "";
    document.getElementById("showSingleResponse").style.display = "none";
    document.getElementById('deleteError').style.display = "none";
    document.getElementById("viewSurveyButton").style.fontWeight = "bold";
    document.getElementById("viewUsersButton").style.fontWeight = "";
}

function clearInput() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmPassword").value = "";
    document.getElementById("showPasswords").checked = false;
    showAdminManage()
}

function deleteUser(usernameVariable, arrayLength) {
    if (arrayLength < 2) {
        document.getElementById('deleteError').style.display = "";
        document.getElementById('deleteError').innerHTML = "YOU CANNOT DELETE THE LAST USER";
    }
    else {
        fetch('/api/auth/deleteUser', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ username: usernameVariable })
        });
        window.location.reload()
    }
}

async function registerUser() {
    const userName = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;
    const response = await fetch(`/api/auth/create`, {
        method: 'post',
        body: JSON.stringify({ username: userName, password: password }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    });
    clearInput()
    window.location.reload()
}

function loadPage() {
    console.log(sessionStorage.getItem("manage"))
    if (sessionStorage.getItem("manage") == "true") {
        showAdminManage()
    }
    else {
        showSurveyData()
    }

    if (sessionStorage.getItem("search") == "true") {
        showShowAll()
    }
}

function logout() {
    fetch(`/api/auth/logout`, {
    method: 'delete',
    });
}