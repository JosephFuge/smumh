let currentPage = 0;

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

function showAllRows() {
    Array.from(document.getElementsByClassName(`page-${currentPage}`)).forEach((tempRow) => {
        tempRow.style.display = 'table-row';
    });
    document.getElementById('showAllButton').style.display = 'none';
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
    document.getElementById("manageUsers").style.display = "";
    document.getElementById("createUser").style.display = "none";
    document.getElementById("showTable").style.display = "none";
    document.getElementById("editUser").style.display = "none";
    document.getElementById("viewSurveyButton").style.fontWeight = "";
    document.getElementById("viewUsersButton").style.fontWeight = "bold";
}

function showAdminCreate() {
    document.getElementById("manageUsers").style.display = "none";
    document.getElementById("createUser").style.display = "";
    document.getElementById("showTable").style.display = "none";
    document.getElementById("editUser").style.display = "none";
}

function showAdminEdit() {
    document.getElementById("manageUsers").style.display = "none";
    document.getElementById("createUser").style.display = "none";
    document.getElementById("showTable").style.display = "none";
    document.getElementById("editUser").style.display = "";
}

function showSurveyData() {
    document.getElementById("manageUsers").style.display = "none";
    document.getElementById("createUser").style.display = "none";
    document.getElementById("showTable").style.display = "";
    document.getElementById("editUser").style.display = "none";
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

function clearInputEdit() {
    document.getElementById("usernameEdit").value = "";
    document.getElementById("passwordEdit").value = "";
    document.getElementById("confirmPasswordEdit").value = "";
    document.getElementById("showPasswordsEdit").checked = false;
    showAdminManage()
}