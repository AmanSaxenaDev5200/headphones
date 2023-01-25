'use-strict'

export default class User {
    username;
    password;
    headphones;

    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.headphones = [];
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