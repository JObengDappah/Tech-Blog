const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = $('#username').val().trim();
    const password = $('#password').val().trim();
console.log(username);
    if (username && password) {
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            const errorMessage = await response.json();
            alert(errorMessage.message);
        }
    }
};


function renderDashboard () {
    document.location.replace('/dashboard');
    console.log("redirecting to dashboard")
};

function renderHomepage () {
    document.location.replace('/home');
    console.log("redirecting to home")
};

const registerFormHandler = async (event) => {
    console.log("form registerhandler executing");
    event.preventDefault();

    const username = $('#newUsername').val().trim();
    const password = $('#newPassword').val().trim();
    const passwordConfirm = $('#newPasswordVerify').val().trim();

    if (username && password) {
        const response = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password, passwordConfirm }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
            console.log("redirecting to dashboard");
        } else {
            const errorMessage = await response.json();
            alert(errorMessage.message);
            console.log(errorMessage);
            console.log("RegisterHandlerError");
        }
    }
};


if ($('#registerButton')) {
    $('#registerButton').on('click', function () {
        window.location.href = '/register';
    });
};

if ($('#loginBtn')) {
    $('#loginBtn').on('click', loginFormHandler);
};


if ($('#register')) {
    $('#register').on('click', function () {
        console.log("Register button clicked");
        registerFormHandler();
    });
};

if ($('#dashboardBtn')) {
    $('#dashboardBtn').on('click', function () {
        console.log("Dashboard button clicked");
        renderDashboard();
    });
};

if ($('#homeBtn')) {
    $('#homeBtn').on('click', function () {
        console.log("Home button clicked");
        renderHomepage();
    });
};