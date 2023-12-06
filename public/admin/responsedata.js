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
    
function showAdminCreate() {
    document.getElementById("createUser").style.display = ""
    document.getElementById("showTable").style.display = "none"
    document.getElementById("viewSurveyButton").style.fontWeight = ""
    document.getElementById("viewUsersButton").style.fontWeight = "bold"
}

function showSurveyData() {
    document.getElementById("createUser").style.display = "none"
    document.getElementById("showTable").style.display = ""
    document.getElementById("viewSurveyButton").style.fontWeight = "bold"
    document.getElementById("viewUsersButton").style.fontWeight = ""
}
