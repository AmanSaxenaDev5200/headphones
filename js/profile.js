'use-strict'

import Headphone, {loadHeadphones, createHPListItem} from './headphone.js';
import User,{checkAnyUsers, getUser} from './user.js';
import Review from './review.js';
import {openModal, closeModal, checkValid} from './login.js';

document.addEventListener('DOMContentLoaded', function() {
    const params = (new URL(document.location)).searchParams;
    const profile = getUser(params.get('viewingProfile'))[0];

    const headphones = [];
    const hpbrands = [];
    const userHP = [];
    let hp_can_review = [];
    let user = '';
    let user_rights = false;
    if (profile === undefined) {
        document.querySelector('main').classList.add('full-hidden');
        document.getElementById('hp-error').classList.remove('full-hidden');
        document.querySelector('.hp-heading').classList.add('full-hidden');
    } else {
        if (!checkAnyUsers()) {
            if (localStorage.getItem('currentuser') !== null) {
                user = getUser(localStorage.getItem('currentuser'))[0];
                user_rights = profile.username === user.username;
            } else {
                user = new User(undefined, undefined);
            }
    
            document.querySelector('#profile-heading h1').textContent = profile.username;
            document.querySelector('#profile-heading img').src = profile.img;
            document.querySelector('title').textContent = profile.username + '\'s Profile - MyHeadphones';
    
            if (user_rights) {
                document.getElementById('add-hp').addEventListener('click', openAddHPModal, false);
                document.getElementById('add-hp-close').addEventListener('click', closeAddHPModal, false);
                document.getElementById('add-review').addEventListener('click', openReviewModal, false);
                document.getElementById('add-review-close').addEventListener('click', closeReviewModal, false);
                document.getElementById('save-review').addEventListener('click', saveReview, false);
                document.getElementById('del-review').addEventListener('click', deleteReview, false);
                document.getElementById('rm-hp').addEventListener('click', toggleRemove, false);
                document.querySelector('#headphones-list .hp-btn-container').classList.remove('full-hidden');
                document.querySelector('#reviews-container .hp-btn-container').classList.remove('full-hidden');
            }
    
            document.getElementById('owned-tab').addEventListener('click', function(){
                if (!this.classList.contains('tab-selected')) {
                    document.getElementById('headphones-list').classList.remove('full-hidden');
                    document.getElementById('reviews-tab').classList.remove('tab-selected');
                    document.getElementById('reviews-container').classList.add('full-hidden');
                    this.classList.add('tab-selected');
                }
            });
    
            document.getElementById('reviews-tab').addEventListener('click', function() {
                if (!this.classList.contains('tab-selected')) {
                    document.getElementById('reviews-container').classList.remove('full-hidden');
                    document.getElementById('owned-tab').classList.remove('tab-selected');
                    document.getElementById('headphones-list').classList.add('full-hidden');
                    this.classList.add('tab-selected');
                    populateReviews(user_rights);
                }
            });

            initTestUsers();
            initHeadphones();
        } else {
            document.querySelector('main').classList.add('full-hidden');
            document.getElementById('hp-error').classList.remove('full-hidden');
            document.querySelector('.hp-heading').classList.add('full-hidden');
        }
    }

    function initHeadphones() {
        //load all headphones
        const hpResponse = loadHeadphones().then(hp => {
        for (const prop of hp) {
            const thisHp = new Headphone({
                'id': prop['id'],
                'brand': prop['brand'],
                'modelname': prop['modelname'],
                'type': prop['type'],
                'impedance': prop['impedance'],
                'sensitivity': prop['sensitivity'],
                'weight': prop['weight'],
                'driver': prop['driver-type'],
                'price': prop['price'],
                'wireless': prop['wireless'],
                'img': prop['img']
            });
                headphones.push(thisHp);
            }

            headphones.sort( (a, b) => {
                const a_name = a.brand + " " + a.modelname;
                const b_name = b.brand + " " + b.modelname;
                return a_name == b_name ? 0 : (a_name > b_name ? 1 : -1);
            });

            //add-hp modal sections
            insertBrandNames();

            //load user profile's headphones
            const profile_collection = profile.headphones;

            for (const user_hp of profile_collection) {
                const tempHP = headphones.find(element => element.id === user_hp);
                userHP.push(tempHP.id);
            }

            //create user's headphone list
            const hp_list = document.getElementById('headphones');
            const no_hp = document.getElementById('profile-no-hp');

            if(userHP.length > 0) {
                no_hp.classList.add('full-hidden');
                const hp_ul = document.createElement('ul');

                for (const hpID of userHP) {
                    /* generate headphone list */
                    const hp = headphones.find(element => element.id === hpID);
                    const hp_a = createProfileHPItem(hp);
                    hp_ul.appendChild(hp_a);
                }
        
                hp_ul.classList.add('width');
                hp_ul.id = 'profile-list';
                hp_list.appendChild(hp_ul);
            } else {
                no_hp.classList.remove('full-hidden');
            }

            if (localStorage.getItem('reviews') !== null) {
                const reviews = JSON.parse(localStorage.getItem('reviews'));
                const user_has_reviews = reviews.find(element => element.username === user.username);
                if (user_has_reviews === undefined) {
                    document.getElementById('profile-no-reviews').classList.remove('full-hidden');
                    hp_can_review = userHP;
                } else {
                    for (let i = 0; i < userHP.length; i++) {
                        const hp_isReviewed = reviews.find( element => element.review_id === user.username + "_" + userHP[i]);
                        if (hp_isReviewed === undefined) {
                            hp_can_review.push(userHP[i]);
                        }
                    }
                }
            } else {
                document.getElementById('profile-no-reviews').classList.remove('full-hidden');
            }
        });
    }

    function createProfileHPItem(hp) {
        const hp_a = createHPListItem(hp);
        const hp_div = document.createElement('div');
        const i_ele = document.createElement('i');
        i_ele.classList.add('fa-regular');
        i_ele.classList.add('fa-circle-xmark');
        i_ele.classList.add('fa-lg');
        i_ele.classList.add('full-hidden');
        i_ele.addEventListener('click', removeHeadphone, false);
        hp_div.appendChild(hp_a)
        hp_div.appendChild(i_ele);
        return hp_div;
    }

    function closeAddHPModal() {
        const addHPModal = document.getElementById('add-hp-modal');
        const overlay = document.querySelector('.overlay');
        closeModal(addHPModal, overlay);
    }

    function openAddHPModal() {
        const addHPModal = document.getElementById('add-hp-modal');
        const overlay = document.querySelector('.overlay');
        openModal(addHPModal, overlay);
    }

    function closeReviewModal() {
        const addReviewModal = document.getElementById('add-review-modal');
        const overlay = document.querySelector('.overlay');
        closeModal(addReviewModal, overlay);
        if (!document.getElementById('del-review').classList.contains('full-hidden')) {
            document.getElementById('del-review').classList.add('full-hidden');
        }
    }

    function openReviewModal() {
        if (hp_can_review.length > 0) { 
            initReviewModal();

            const addReviewModal = document.getElementById('add-review-modal');
            const overlay = document.querySelector('.overlay');
            openModal(addReviewModal, overlay);
        } else {
            alert('Add more headphones to your collection to review them!');
        }
    }

    function openEditReviewModal(review_id) {
        const reviews = JSON.parse(localStorage.getItem('reviews'));
        const editing_review = reviews.find(element => element.review_id === review_id);
        initReviewModal(editing_review);

        const addReviewModal = document.getElementById('add-review-modal');
        const overlay = document.querySelector('.overlay');
        openModal(addReviewModal, overlay);
    }

    function initReviewModal(editing_review = null) {
        const review_list = document.getElementById('hp-review-list');
        const default_opt = document.createElement('option');

        review_list.innerHTML = '';
        if (editing_review !== null) {
            const review_hp = headphones.find(element => element.id === Number.parseInt(editing_review.headphone_id));

            default_opt.textContent = review_hp.brand + " " + review_hp.modelname;
            default_opt.value = review_hp.id;
            review_list.appendChild(default_opt);

            const rating_id = "star-" + Number.parseInt(editing_review.rating);
            const title = document.getElementById('review-title');
            const content = document.getElementById('review-content');
            title.value = editing_review.title;
            content.value = editing_review.content;
            document.getElementById(rating_id).checked = true;
            review_list.disabled = true;
        } else {
            const review_form = document.getElementById('add-review-modal');
            review_form.reset();
            default_opt.textContent = '-- Select a headphone to review -- ';
            default_opt.value = '';
            review_list.appendChild(default_opt);
            for (const hpID of hp_can_review) {
                const selected_hp = headphones.find( element => element.id === hpID);
                const hp_name = selected_hp.brand + " " + selected_hp.modelname;
                const option = document.createElement('option');
                option.textContent = hp_name;
                option.setAttribute('value', hpID);
                review_list.appendChild(option);
            }
            review_list.disabled = false;
        }
    }

    function populateReviews(user_rights) {
        const reviews_container = document.getElementById('reviews');
        const no_reviews = document.getElementById('profile-no-reviews');
    
        while (reviews_container.firstChild) {
            reviews_container.removeChild(reviews_container.firstChild);
        }
        let reviews = localStorage.getItem('reviews');
        if (reviews === null) {
            no_reviews.classList.remove('full-hidden');
        } else {
            reviews = JSON.parse(reviews);
            reviews = reviews.filter(element => element.username === profile.username);
            if (reviews.length > 0) {
                no_reviews.classList.add('full-hidden');
                reviews = reviews.sort( (a,b) => {
                    const date1 = Date.parse(a.date);
                    const date2 = Date.parse(b.date);
                    return date1 == date2 ? 0 : (date1 < date2 ? 1 : -1);
                });
                const ul = document.createElement('ul');
                for (const review of reviews) {
                    const li = document.createElement('li');
                    li.setAttribute('data-review-id', review.review_id);
    
                    const h3 = document.createElement('h3');
                    h3.textContent = review.title;
    
                    const hp = headphones.find(element => element.id === Number.parseInt(review.headphone_id));
                    const review_info_p = document.createElement('p');
                    const review_info = '<span>review for <a href="./headphone.html?hpID=' + review.headphone_id + '"><strong>' 
                    + hp.brand + " " + hp.modelname + '</strong></a></span><span>' + review.date + '</span>';
                    review_info_p.innerHTML = review_info;
                    review_info_p.classList.add('review-info');
    
                    const review_content_p = document.createElement('p');
                    review_content_p.classList.add('review-content');
                    review_content_p.textContent = review.content;
    
                    const div = document.createElement('div');
                    for (let i = 1; i < 6; i++) {
                        const star_ele = document.createElement('i');
                        star_ele.classList.add('fa-solid');
                        star_ele.classList.add('fa-star');
                        if (i <= review.rating) {
                            star_ele.classList.add('star-point');
                        } else {
                            star_ele.classList.add('star');
                        }
                        div.appendChild(star_ele);
                    }
    
                    li.appendChild(h3);
                    li.appendChild(review_info_p);
                    li.appendChild(div);
                    li.appendChild(review_content_p);
                
                    if (user_rights) {
                        const i_ele = document.createElement('i');
                        i_ele.classList.add('edit-mark');
                        i_ele.classList.add('fa-solid');
                        i_ele.classList.add('fa-pen-to-square');
                        i_ele.classList.add('fa-lg');
                        i_ele.addEventListener('click', editReview, false);
                        li.appendChild(i_ele);
                    }
    
                    ul.appendChild(li);
                    reviews_container.appendChild(ul);
                }
            }
            
        }
    }
    
    function editReview() {
        const review_id = this.parentNode.getAttribute('data-review-id');
        document.getElementById('del-review').classList.remove('full-hidden');
        openEditReviewModal(review_id);
    }

    function saveReview() {
        const username = user.username;
        const hpID = document.getElementById('hp-review-list');
        const title = document.getElementById('review-title');
        const rating = document.querySelector('.star-rating:checked');
        const content = document.getElementById('review-content');

        const hp_err = document.getElementById('hp-err');
        const title_err = document.getElementById('title-err');
        const rating_err = document.getElementById('rating-err');
        const content_err = document.getElementById('content-err');

        const valid1 = checkValid(hpID, hp_err, 'Please select a headphone.');
        const valid2 = checkValid(title, title_err, 'Please enter a title.');
        const valid3 = (() => {
            if (rating === null) {
                rating_err.textContent = 'Please select a rating.';
            } else {
                rating_err.textContent = '';
            }
            return rating !== null;
        })();
        const valid4 = checkValid(content, content_err, 'Please enter your review.');

        if (valid1 && valid2 && valid3 && valid4) {
            const review_date = new Date().toLocaleDateString('en-US');
            let reviews = [];
            const review = new Review({
                "username": username,
                'headphone_id': hpID.value,
                "title": title.value,
                "rating": rating.value,
                "content": content.value,
                "date": review_date
            });
    
            if (localStorage.getItem('reviews') !== null) {
                reviews = JSON.parse(localStorage.getItem('reviews'));
            }
    
            const og_review = reviews.find(element => element.review_id === review.review_id);
            if (og_review === undefined) {
                reviews.push(review);
            } else {
                const review_index = reviews.indexOf(og_review);
                reviews.splice(review_index, 1);
                reviews.push(review);
            }
            localStorage.setItem('reviews', JSON.stringify(reviews));
            location.reload();
        }
    }

    function deleteReview() {
        const review_id = user.username + "_" + document.getElementById('hp-review-list').value;
        let reviews = JSON.parse(localStorage.getItem('reviews'));
        reviews = reviews.filter(element => element.review_id !== review_id);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        location.reload();
    }

    //load headphone model names to add-hp modal
    function insertModelNames(brand) {
        const brandHP = headphones.filter( element => element.brand === brand);
        const modelname_section = document.getElementById('modal-modelname-section');
        modelname_section.innerHTML = '<li><h2>Model Name</h2></li>';

        for (const hp of brandHP) {
            const list_ele = document.createElement('li');

            const p_ele = document.createElement('p');
            p_ele.textContent = hp.brand + " " + hp.modelname;

            const i_ele = document.createElement('i');
            i_ele.classList.add('fa-solid');
            i_ele.classList.add('fa-circle-plus');

            list_ele.appendChild(p_ele);
            list_ele.appendChild(i_ele);
            list_ele.setAttribute('data-hp-id', hp.id);
            list_ele.addEventListener('click', addHeadphone, false);

            modelname_section.appendChild(list_ele);
        }
    }

    //load headphone brand names to add-hp modal
    function insertBrandNames() {
        const brand_section = document.getElementById('modal-brand-section');
        brand_section.innerHTML = '<li><h2>Brand Name</h2></li>';

        if (hpbrands.length === 0) {
            for (const hpdata of headphones) {
                if (hpbrands.indexOf(hpdata.brand) === - 1) {
                    hpbrands.push(hpdata.brand);
                }
            }
        }

        for (const brand of hpbrands) {
            const list_ele = document.createElement('li');
            list_ele.textContent = brand;
            list_ele.addEventListener('click', function() {
                const selectedEle = document.querySelector('#modal-brand-section .selected');
                if (selectedEle !== null) {
                    selectedEle.classList.remove('selected');
                }
                this.classList.add('selected');
                insertModelNames(brand);
            });
            brand_section.appendChild(list_ele);
        }
    }

    function addHeadphone() {
        const hpID = Number(this.getAttribute('data-hp-id'));
        const hp = headphones.find( element => element.id === hpID);
        const allUsers = JSON.parse(localStorage.getItem('users'));

        const hp_exists = userHP.find(element => element === hpID);

        if (!hp_exists) {
            userHP.push(hpID);
        }
        user.headphones = userHP;

        const userIndex = allUsers.findIndex(element => element.username === user.username);

        allUsers[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(allUsers));
        location.reload();
    }

    function removeHeadphone() {
        const parent = this.parentNode;
        const sibling = this.previousSibling;
        const hpID = Number(sibling.getAttribute('data-hp-id'));
        console.log(hpID);
        const hpIndex = userHP.findIndex(element => element === hpID);
        const allUsers = JSON.parse(localStorage.getItem('users'));

        userHP.splice(hpIndex, 1);
        user.headphones = userHP;

        const userIndex = allUsers.findIndex(element => element.username === user.username);
        allUsers[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(allUsers));

        parent.classList.add('full-hidden');
    }

    function toggleRemove() {
        let icons = [];
        if (this.classList.contains('rm-on')) {
            location.reload();
        } else {
            this.classList.add('rm-on');
            this.textContent='Save';
            icons = document.querySelectorAll('#profile-list i');
            icons.forEach(element => element.classList.remove('full-hidden'));
        }
    }

    function initTestUsers() {
        if (localStorage.getItem('test-active') === null) {
            const test_user1 = new User('bob', 'hello');
            const test_user2 = new User('jill', 'hello');
            const test_user3 = new User('smith', 'hello');
            const test_user4 = new User('dd889', 'hello');
            const test_user5 = new User('jack', 'hello');
            const test_user6 = new User('milk87', 'hello');
            const test_user7 = new User('big_chungus_5', 'hello');
            const test_user8 = new User('HiImAmy', 'hello');
            const test_user9 = new User('wrtstst', 'hello');
            const test_user10 = new User('CallMeMaybe', 'hello');
    
            test_user1.headphones = [1, 2, 3];
            test_user2.headphones = [13, 40];
            test_user3.headphones = [5, 4, 7, 31, 40];
            test_user4.headphones = [12, 13, 10, 3, 5, 4, 2, 1, 6, 31, 40];
            test_user5.headphones = [4, 7, 31, 40];
            test_user6.headphones = [45, 50, 34, 22, 31];
            test_user7.headphones = [31, 34, 21, 8, 3];
            test_user8.headphones = [44, 45, 46, 40];
            test_user9.headphones = [48, 49, 5, 29, 38];
            test_user10.headphones = [40, 39, 44, 15];
    
            let users = [];
            if (!checkAnyUsers()) {
                users = JSON.parse(localStorage.getItem('users'));
            }
            users.push(test_user1);
            users.push(test_user2);
            users.push(test_user3);
            users.push(test_user4);
            users.push(test_user5);
            users.push(test_user6);
            users.push(test_user7);
            users.push(test_user8);
            users.push(test_user9);
            users.push(test_user10);
    
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('test-active', 'true');
    
            const test_review1 = new Review({
                'username': 'bob',
                'headphone_id': 2,
                'title': 'Simply the best',
                'rating': 5,
                'content': 'Best headphones I\'ve ever heard! Amazing natural sound and organic timbre. Build is like a tank, will never let you down. Highly recommended.',
                'date': '1/25/2007'
            });
    
            const test_review2 = new Review({
                'username': 'bob',
                'headphone_id': 3,
                'title': 'Simply the best',
                'rating': 5,
                'content': 'Best headphones I\'ve ever heard! Amazing natural sound and organic timbre. Build is like a tank, will never let you down. Highly recommended.',
                'date': '1/25/2007'
            });
    
            const test_review3 = new Review({
                'username': 'bob',
                'headphone_id': 1,
                'title': 'Disappointing...',
                'rating': 2,
                'content': 'Too much bass. Everything sounds muffled.',
                'date': '3/14/2017'
            });
    
            const test_review4 = new Review({
                'username': 'jill',
                'headphone_id': 40,
                'title': 'Not my favorite.',
                'rating': 2,
                'content': 'Battery does not last long. Can\'t really wear it while sleeping.',
                'date': '5/5/2010'
            });
    
            const test_review5 = new Review({
                'username': 'smith',
                'headphone_id': 40,
                'title': 'Holy cow!!',
                'rating': 4,
                'content': 'These are super good! Wowzers. Amazing. So wow.',
                'date': '2/14/2014'
            });
    
            const test_review6 = new Review({
                'username': 'dd889',
                'headphone_id': 40,
                'title': 'Too expensive!!!!!',
                'rating': 1,
                'content': 'Are they crazy? Who\'s going to pay $300 for headphones??????',
                'date': '2/14/2014'
            });
    
            const test_review7 = new Review({
                'username': 'jack',
                'headphone_id': 40,
                'title': 'Pretty good for EDC',
                'rating': 4,
                'content': 'Love using these when on the go. Keeps sound out when I\'m on the train or at work. Highly recommend getting this.',
                'date': '2/17/2014'
            });
    
            const test_review8 = new Review({
                'username': 'HiImAmy',
                'headphone_id': 40,
                'title': 'Doesn\'t come in black...',
                'rating': 2,
                'content': 'They were sold out of black, so I could only get white. Wish they had black.',
                'date': '2/14/2014'
            });
    
            const test_review9 = new Review({
                'username': 'smith',
                'headphone_id': 31,
                'title': 'OMG',
                'rating': 5,
                'content': 'So good. So wows. Much amazing.',
                'date': '12/03/2021'
            });
    
            const test_review10 = new Review({
                'username': 'jack',
                'headphone_id': 31,
                'title': 'Could be better',
                'rating': 3,
                'content': 'There\'s a lot of competition out there now, so these aren\'t as good as they used to be.',
                'date': '10/07/2018'
            });
    
            const test_review11 = new Review({
                'username': 'milk87',
                'headphone_id': 31,
                'title': 'Hey',
                'rating': 3,
                'content': 'Now, you\'re an all-star, get your game on, go play!',
                'date': '06/17/2018'
            });
    
            const test_review12 = new Review({
                'username': 'dd889',
                'headphone_id': 31,
                'title': 'Too expensive!!!!!',
                'rating': 1,
                'content': 'Are they crazy? Who\'s going to pay $200 for headphones??????',
                'date': '10/07/2018'
            });
    
            const test_review13 = new Review({
                'username': 'HiImAmy',
                'headphone_id': 45,
                'title': 'These are the best',
                'rating': 5,
                'content': 'There are no better headphones than these for gaming.',
                'date': '12/25/2022'
            });
    
            const test_review14 = new Review({
                'username': 'HiImAmy',
                'headphone_id': 45,
                'title': 'These are the best',
                'rating': 5,
                'content': 'There are no better headphones than these for gaming.',
                'date': '12/25/2022'
            });
    
            let reviews = [];
            if (localStorage.getItem('reviews') !== null) {
                reviews = JSON.parse(localStorage.getItem('reviews'));
            }
            reviews.push(test_review1);
            reviews.push(test_review2);
            reviews.push(test_review3);
            reviews.push(test_review4);
    
            localStorage.setItem('reviews', JSON.stringify(reviews));
        } else {
            console.log('Test data already populated.');
        }
    }
});