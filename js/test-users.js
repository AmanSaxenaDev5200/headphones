import User, { checkAnyUsers } from './user.js';
import Review from './review.js';

//======== Create Test Users ========
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
            'headphone_id': 46,
            'title': 'These are the best',
            'rating': 5,
            'content': 'There are no better headphones than these for gaming.',
            'date': '12/25/2022'
        });

        const test_review15 = new Review({
            'username': 'wrtstst',
            'headphone_id': 29,
            'title': 'Meh',
            'rating': 2,
            'content': 'Heard better.',
            'date': '3/13/2022'
        });

        let reviews = [];
        if (localStorage.getItem('reviews') !== null) {
            reviews = JSON.parse(localStorage.getItem('reviews'));
        }
        reviews.push(test_review1);
        reviews.push(test_review2);
        reviews.push(test_review3);
        reviews.push(test_review4);
        reviews.push(test_review5);
        reviews.push(test_review6);
        reviews.push(test_review7);
        reviews.push(test_review8);
        reviews.push(test_review9);
        reviews.push(test_review10);
        reviews.push(test_review11);
        reviews.push(test_review12);
        reviews.push(test_review13);
        reviews.push(test_review14);
        reviews.push(test_review15);

        localStorage.setItem('reviews', JSON.stringify(reviews));
    } else {
        console.log('Test data already populated.');
    }
}

initTestUsers();