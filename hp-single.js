'use-strict'

import Headphone,{loadHeadphones} from './headphone.js';

document.addEventListener('DOMContentLoaded', function() {
    const headphones = [];
    const params = (new URL(document.location)).searchParams;
    const hpID = Number.parseInt(params.get('hpID'));

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
                    'driver-type': prop['driver-type'],
                    'price': prop['price'],
                    'wireless': prop['wireless']
                });
                headphones.push(thisHp);
            }

            const currentHP = headphones.find(element => element.id === hpID);

            document.querySelector('.hp-heading h1').textContent = currentHP.brand + " " + currentHP.modelname;

            document.querySelector('#spec-brand p').textContent = currentHP.brand;
            document.querySelector('#spec-modelname p').textContent = currentHP.modelname;
            document.querySelector('#spec-price p').textContent = "$"+ currentHP.price + ".00";
            let wireless = (currentHP.wireless === 'true') ? 'Wireless' : 'Wired';
            document.querySelector('#spec-type p').textContent = currentHP.type + ' ' + wireless;
            document.querySelector('#spec-driver p').textContent = currentHP.driver;
            document.querySelector('#spec-impedance p').textContent = currentHP.impedance;
            document.querySelector('#spec-sensitivity p').textContent = currentHP.sensitivity;
            document.querySelector('#spec-weight p').textContent = currentHP.weight;

            document.getElementById('specs-tab').addEventListener('click', function(){
                if (!this.classList.contains('tab-selected')) {
                    document.getElementById('specs-container').classList.remove('full-hidden');
                    document.getElementById('reviews-tab').classList.remove('tab-selected');
                    document.getElementById('reviews-container').classList.add('full-hidden');
                    this.classList.add('tab-selected');
                }
            });

            document.getElementById('reviews-tab').addEventListener('click', function() {
                if (!this.classList.contains('tab-selected')) {
                    document.getElementById('reviews-container').classList.remove('full-hidden');
                    document.getElementById('specs-tab').classList.remove('tab-selected');
                    document.getElementById('specs-container').classList.add('full-hidden');
                    this.classList.add('tab-selected');
                    populateReviews(hpID);
                }
            });
        });
    }

    function populateReviews(hpID) {
        const reviews_container = document.getElementById('reviews');
        let reviews = localStorage.getItem('reviews');
        if (reviews === null) {
            document.getElementById('no-reviews').classList.remove('full-hidden');
        } else {
            reviews = JSON.parse(reviews);
            reviews = reviews.filter(element => Number.parseInt(element.headphone_id) === hpID);
            if (reviews.length > 0) {
                document.getElementById('no-reviews').classList.add('full-hidden');
                reviews = reviews.sort( (a,b) => {
                    return a.date == b.date ? 0 : (a.date > b.date ? 1 : -1);
                });
                const ul = document.createElement('ul');
                for (const review of reviews) {
                    const li = document.createElement('li');
                    li.setAttribute('data-review-id', review.id);
    
                    const h3 = document.createElement('h3');
                    h3.textContent = review.title;
    
                    const review_info_p = document.createElement('p');
                    const review_info = '<span>reviewed by <a href="./profile.html">' 
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