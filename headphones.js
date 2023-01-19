'use strict';

document.addEventListener('DOMContentLoaded', function() {

//login modal
document.querySelectorAll('.signup-btn').forEach( element => {
    element.addEventListener('click', openModal, false);
});

const closeBtn = document.getElementById('close-modal');
closeBtn.addEventListener('click', closeModal, false);

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
