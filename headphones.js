'use strict';


document.addEventListener('DOMContentLoaded', function() {

//login modal
const signup = document.getElementById('signup');
const closebtn = document.getElementById('close-modal');
signup.addEventListener('click', openModal, false);
closebtn.addEventListener('click', closeModal, false);


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
}

});
