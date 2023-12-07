async function loginUser() {
    if (document.cookie.includes('token')) {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    const userName = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;
    const response = await fetch(`/api/login`, {
        method: 'post',
        body: JSON.stringify({ username: userName, password: password }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response.ok) {
        localStorage.setItem('username', userName);
        window.location.href = '/admin';
    } else {
        const body = await response.json();
        const bodyText = body.message;
        const loginError = document.getElementById('loginError')
        loginError.innerHTML = bodyText;
        loginError.style.display = 'block';
    }
}

