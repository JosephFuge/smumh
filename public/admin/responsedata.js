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
    document.getElementById("viewSurveyButton").style.fontWeight = "";
    document.getElementById("viewUsersButton").style.fontWeight = "bold";
}

function showAdminCreate() {
    document.getElementById("manageUsers").style.display = "none";
    document.getElementById("createUser").style.display = "";
    document.getElementById("showTable").style.display = "none";
}

function showSurveyData() {
    sessionStorage.setItem("manage", "false")
    document.getElementById("manageUsers").style.display = "none";
    document.getElementById("createUser").style.display = "none";
    document.getElementById("showTable").style.display = "";
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

function deleteUser(usernameVariable) {
    fetch('/api/auth/deleteUser', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({username: usernameVariable})
    });
    window.location.reload()
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
}