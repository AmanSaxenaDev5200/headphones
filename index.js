'use strict';

import {openModal, goToProfile, isLoggedIn} from './login.js';
import User, {getUser} from './user.js';

document.addEventListener('DOMContentLoaded', function() {
    const heroBtn = document.getElementById('hero-signup');
    const modal = document.getElementById('login-modal');
    const overlay = document.querySelector('.overlay');
    const openModalFn = () => {
        openModal(modal, overlay);
    };

    heroBtn.addEventListener('click', openModalFn, false);

    if (isLoggedIn()) {
        const currentUser = localStorage.getItem('currentuser');
        const userProfile = getUser(currentUser)[0];

        heroBtn.removeEventListener('click', openModalFn, false);
        heroBtn.textContent = 'Go to your Profile'
        heroBtn.addEventListener('click', function() {
            goToProfile(userProfile.username);
        }, false);
        console.log('Welcome, ' + userProfile.username + '!');
    }
});
