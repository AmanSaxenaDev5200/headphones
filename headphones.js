'use strict';

document.addEventListener('DOMContentLoaded', function() {
    //const loggedin = JSON.parse(localStorage.getItem('loggedin'));
    const loggedin = false;
    if (loggedin) {
        initLogin();
    }

    /* login modal */
    document.querySelectorAll('.signup-btn').forEach( element => {
        element.addEventListener('click', openModal, false);
    });

    const closeBtn = document.getElementById('close-modal');
    closeBtn.addEventListener('click', closeModal, false);

    const createBtn = document.getElementById('create-btn');
    createBtn.addEventListener('click', setupUser, false);

    const loginBtn = document.getElementById('login-btn');
    loginBtn.addEventListener('click', logUserIn, false);

    const createUser = document.querySelector('.create-user');

    /* modal functions */
    function openModal() {
        const modal = document.querySelector('.modal');
        const overlay = document.querySelector('.overlay');
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
            overlay.classList.remove('hidden');
        }
    }

    function closeModal() {
        const modal = document.querySelector('.modal');
        const overlay = document.querySelector('.overlay');
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
        createUser.classList.add('hidden');
        createBtn.textContent = 'Sign Up';
    }

    /* grab input for user functions */
    function setupUser() {
        if (createUser.classList.contains('hidden')) {
            createUser.classList.remove('hidden');
            createBtn.textContent = 'Create New Account';
            createBtn.classList.add('set')
        } else if (createBtn.classList.contains('set')) {
            const usr = document.getElementById('login-modal').elements['create-username'].value;
            const pw = document.getElementById('login-modal').elements['create-password'].value;
            handleCreate(usr, pw);
        }
    }

    function logUserIn() {
        const usr = document.getElementById('login-modal').elements['username'].value;
        const pw = document.getElementById('login-modal').elements['password'].value;
        handleLogin(usr, pw);
    }

    /* user functions */
    function handleCreate(username, password) {
        const user = new User(username, password);
        console.log(typeof user);
        if (checkAnyUsers()) {
            const users = [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            console.log('First user created!');
            document.getElementById('login-modal').submit();
        } else {
            const tempUsers = getUser(username);
            if (tempUsers.length === 0) {
                const tempList = JSON.parse(localStorage.getItem('users'));
                tempList.push(user);
                localStorage.setItem('users', JSON.stringify(tempList));
                console.log('User created!');
                handleLogin(username, password);
            } else {
                console.log('User already exists');
            }
        }
    }

    function handleLogin(username, password) {
        if (!loggedin) {
            const user = getUser(username);
            if(user === null) {
                console.log('There are no registered users yet.');
            } else {
                if (user.length > 0) {
                    const currentUser = user[0];
                    if (currentUser.password === password) {
                        console.log('Login success!');
                        localStorage.setItem('currentuser', username);
                        localStorage.setItem('loggedin', JSON.stringify(true));
                        document.getElementById('login-modal').submit();
                    } else {
                        console.log('Wrong password, try again!')
                    }
                } else {
                    console.log('User doesn\'t exist.')
                }
            }
        }
    }

    function initLogin() {
        const currentUser = localStorage.getItem('currentuser');
        const userProfile = getUser(currentUser)[0];
        console.log('Welcome back ' + userProfile.username + '!');
    }

    function logOut() {

    }

    /* user helper functions */
    function getUser(username) {
        if (!checkAnyUsers()) {
            const tempUsers = JSON.parse(localStorage.getItem('users'));
            const userExists = tempUsers.filter( element => element.username === username );
            return userExists;
        } else {
            return null;
        }
    }

    function checkAnyUsers() {
        return localStorage.getItem('users') === null;
    }

    class User {
        username;
        password;

        constructor(username, password) {
            this.username = username;
            this.password = password;
        }

        get username() {
            return this.username;
        }

        get password() {
            return this.password;
        }
    }
});
