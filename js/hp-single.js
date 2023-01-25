'use-strict'

import Headphone, { loadHeadphones } from './headphone.js';

document.addEventListener('DOMContentLoaded', function () {
    const headphones = [];
    const params = (new URL(document.location)).searchParams;
    const hpID = Number.parseInt(params.get('hpID'));

    //load headphones data
    function initHeadphones() {
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
            //get the headphone based off the URL routing
            const currentHP = headphones.find(element => element.id === hpID);
            if (currentHP === undefined) {
                document.querySelector('main').classList.add('full-hidden');
                document.getElementById('hp-error').classList.remove('full-hidden');
                document.querySelector('.hp-heading').classList.add('full-hidden');
            } else {
                //inject headphone data
                document.querySelector('title').textContent = currentHP.brand + " " + currentHP.modelname + " - MyHeadphones";
                document.querySelector('.hp-heading .hp-main').src = currentHP.img;
                document.querySelector('.hp-heading h1').textContent = currentHP.brand + " " + currentHP.modelname;

                document.querySelector('#spec-brand p').textContent = currentHP.brand;
                document.querySelector('#spec-modelname p').textContent = currentHP.modelname;
                document.querySelector('#spec-price p').textContent = "$" + Number(currentHP.price).toFixed(2);
                let wireless = (currentHP.wireless === 'true') ? 'Wireless' : 'Wired';
                document.querySelector('#spec-type p').textContent = currentHP.type + ' ' + wireless;
                document.querySelector('#spec-driver p').textContent = currentHP.driver;
                document.querySelector('#spec-impedance p').textContent = currentHP.impedance;
                document.querySelector('#spec-sensitivity p').textContent = currentHP.sensitivity;
                document.querySelector('#spec-weight p').textContent = currentHP.weight;

                document.getElementById('specs-tab').addEventListener('click', function () {
                    if (!this.classList.contains('tab-selected')) {
                        document.getElementById('specs-container').classList.remove('full-hidden');
                        document.getElementById('reviews-tab').classList.remove('tab-selected');
                        document.getElementById('reviews-container').classList.add('full-hidden');
                        this.classList.add('tab-selected');
                    }
                });

                document.getElementById('reviews-tab').addEventListener('click', function () {
                    if (!this.classList.contains('tab-selected')) {
                        document.getElementById('reviews-container').classList.remove('full-hidden');
                        document.getElementById('specs-tab').classList.remove('tab-selected');
                        document.getElementById('specs-container').classList.add('full-hidden');
                        this.classList.add('tab-selected');
                        populateReviews(hpID);
                    }
                });
            }
        });
    }

    //get reviews for headphone
    function populateReviews(hpID) {
        const reviews_container = document.getElementById('reviews');
        let reviews = localStorage.getItem('reviews');
        if (reviews === null) {
            document.getElementById('no-reviews').classList.remove('full-hidden');
        } else {
            if (document.querySelector('#reviews ul')) {
                reviews_container.removeChild(document.querySelector('#reviews ul'));
            }
            reviews = JSON.parse(reviews);
            reviews = reviews.filter(element => Number.parseInt(element.headphone_id) === hpID);
            if (reviews.length > 0) {
                document.getElementById('no-reviews').classList.add('full-hidden');
                reviews = reviews.sort((a, b) => {
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

                    const review_info_p = document.createElement('p');
                    const review_info = '<span>reviewed by <a href="./profile.html?viewingProfile=' + review.username + '">'
                        + review.username + '</a></span><span>' + review.date + '</span>';
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
                    ul.appendChild(li);
                }
                reviews_container.appendChild(ul);
            } else {
                document.getElementById('no-reviews').classList.remove('full-hidden');
            }
        }
    }

    initHeadphones();
});