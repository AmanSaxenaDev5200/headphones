'use-strict'

import User, {checkAnyUsers, getUser} from './user.js';

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('login-modal');
    const overlay = document.querySelector('.overlay');

    const createBtn = document.getElementById('create-btn');
    const loginBtn = document.getElementById('login-btn');
    const userBtn = document.getElementById('user');
    const signupBtn = document.getElementById('signup');
    const createUser = document.querySelector('.create-user');
    const closeBtn = document.querySelector('.close-modal');

    createBtn.addEventListener('click', () => {
        setupUser(createBtn, createUser);
    }, false);
    loginBtn.addEventListener('click', logUserIn, false);
    userBtn.addEventListener('click', toggleSubMenu, false);

    signupBtn.addEventListener('click', () => {
        openModal(modal, overlay);
    }, false);

    closeBtn.addEventListener('click', () => {
        closeModal(modal, overlay);
        createUser.classList.add('hidden');
        createBtn.textContent = 'Sign Up';
    }, false);

    if (isLoggedIn()) {
        initLogin(userBtn, signupBtn);
    }
});

/* grab input for user functions */
function setupUser(btn, inputFields) {
    if (inputFields.classList.contains('hidden')) {
        inputFields.classList.remove('hidden');
        btn.textContent = 'Create New Account';
        btn.classList.add('set')
    } else if (btn.classList.contains('set')) {
        const usr = document.getElementById('login-modal').elements['create-username'];
        const pw = document.getElementById('login-modal').elements['create-password'];
        const usr_error = document.getElementById('usr-error');
        const pw_error = document.getElementById('pw-error');

        usr_error.textContent = '';
        pw_error.textContent = '';

        if (usr.validity.valid && pw.validity.valid) {
            handleCreate(usr.value, pw.value);
        } else if (!usr.validity.valid) {
            usr_error.textContent = 'Please enter a username.';
        } else if (!pw.validity.valid) {
            pw_error.textContent = 'Please enter a password.';
        }
    }
}

function logUserIn() {
    const usr = document.getElementById('login-modal').elements['username'];
    const pw = document.getElementById('login-modal').elements['password'];

    const usr_error = document.getElementById('log-usr-error');
    const pw_error = document.getElementById('log-pw-error');

    usr_error.textContent = '';
    pw_error.textContent = '';

    if (usr.validity.valid && pw.validity.valid) {
        handleLogin(usr.value, pw.value);
    } else if (!usr.validity.valid) {
        usr_error.textContent = 'Please enter a username.';
    } else if (!pw.validity.valid) {
        pw_error.textContent = 'Please enter a password.';
    } 
}

/* user functions */
function handleCreate(username, password) {
    const user = new User(username, password);
    const usr_error = document.getElementById('usr-error');
    if (checkAnyUsers()) {
        const users = [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('First user created!');
        handleLogin(username, password);
        location.reload();
    } else {
        const tempUsers = getUser(username);
        if (tempUsers.length === 0) {
            const tempList = JSON.parse(localStorage.getItem('users'));
            tempList.push(user);
            localStorage.setItem('users', JSON.stringify(tempList));
            console.log('User created!');
            handleLogin(username, password);
            location.reload();
        } else {
            usr_error.textContent = 'User already exists';
        }
    }
}

function handleLogin(username, password) {
    if (!isLoggedIn()) {
        const user = getUser(username);
        const usr_error = document.getElementById('log-usr-error');
        const pw_error = document.getElementById('log-pw-error');
        if(user === null) {
            console.log('There are no registered users yet.');
            usr_error.textContent = 'User doesn\'t exist.';
        } else {
            if (user.length > 0) {
                const currentUser = user[0];
                if (currentUser.password === password) {
                    console.log('Login success!');
                    localStorage.setItem('currentuser', username);
                    localStorage.setItem('loggedin', JSON.stringify(true));
                    location.reload();
                } else {
                    pw_error.textContent = 'Wrong password, try again!';
                }
            } else {
                usr_error.textContent = 'User doesn\'t exist.';
            }
        }
    }
}

function initLogin(userBtn, signupBtn) {
    const currentUser = localStorage.getItem('currentuser');
    const userProfile = getUser(currentUser)[0];
    const signup = signupBtn.parentNode;
    signup.classList.add('full-hidden');
    userBtn.classList.remove('full-hidden');
    document.querySelector('#user button p').textContent = "Welcome, " + userProfile.username;

    const signout = document.getElementById('sign-out');
    signout.addEventListener('click', logOut, false);

    const goProfile = document.querySelector('#sub-menu button');
    goProfile.addEventListener('click', function() {
        goToProfile(userProfile.username);
    }, false);
}

export function goToProfile(username) {
    let profileURL = './profile.html';
    const profileObj = {viewingProfile: username};
    const params = new URLSearchParams(profileObj);

    profileURL += '?' + params.toString();
    location.href = profileURL;
}

export function openModal(modal, overlay) {
    modal.classList.remove('full-hidden');
    overlay.classList.remove('full-hidden');
    modal.ariaHidden = false;
}

export function closeModal(modal, overlay) {
    modal.classList.add('full-hidden');
    overlay.classList.add('full-hidden');
    modal.ariaHidden = true;
}

function toggleSubMenu() {
    const submenu = document.getElementById('sub-menu');
    if (submenu.classList.contains('hidden')) {
        submenu.classList.remove('hidden');
    } else {
        submenu.classList.add('hidden');
    }
}

export function isLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedin'));
}

function logOut() {
    localStorage.removeItem('currentuser');
    localStorage.removeItem('loggedin');
    location.reload();
}