'use-strict'

export default class User {
    username;
    password;
    headphones;
    img;

    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.headphones = [];
        this.img = randomProfileImg();
    }
}

export function getUser(username) {
    if (!checkAnyUsers()) {
        const tempUsers = JSON.parse(localStorage.getItem('users'));
        const existingUser = tempUsers.filter( element => element.username === username );
        return existingUser;
    } else {
        return null;
    }
}

export function checkAnyUsers() {
    return localStorage.getItem('users') === null;
}

function randomProfileImg() {
    const randomNum = Math.floor(Math.random() * 4) + 1;
    let url = './img/profile/';
    switch(randomNum) {
        case 1:
            url += 'profile-1.jpg';
            break;
        case 2:
            url += 'profile-2.jpg';
            break;
        case 3:
            url += 'profile-3.jpg';
            break;
        case 4:
            url += 'profile-4.jpg';
            break;
        case 5:
            url += 'profile-5.jpg';
            break;
        default:
            url += 'profile-1.jpg';
    }
    return url;
}