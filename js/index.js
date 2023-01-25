'use strict';

import { openModal, goToProfile, isLoggedIn } from './login.js';
import User, { getUser } from './user.js';

document.addEventListener('DOMContentLoaded', function () {
    const heroBtn = document.getElementById('hero-signup');
    heroBtn.addEventListener('click', openModalHero, false);

    if (isLoggedIn()) {
        const currentUser = localStorage.getItem('currentuser');
        const userProfile = getUser(currentUser)[0];

        heroBtn.removeEventListener('click', openModalHero, false);
        heroBtn.textContent = 'Go to your Profile'
        heroBtn.addEventListener('click', () => {
            goToProfile(userProfile.username);
        }, false);
        console.log('Welcome, ' + userProfile.username + '!');
    }
});

function openModalHero() {
    const modal = document.getElementById('login-modal');
    const overlay = document.querySelector('.overlay');
    openModal(modal, overlay);
}