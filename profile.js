'use-strict'

document.addEventListener('DOMContentLoaded', function() {
    class User {
        username;
        password;
        headphones;

        constructor(username, password) {
            this.username = username;
            this.password = password;
            this.headphones = [];
        }

        get username() {
            return this.username;
        }

        get password() {
            return this.password;
        }

        get headphones() {
            return this.headphones;
        }
    }

    class Headphone {
        id;
        brand;
        modelname;
        type;
        impedance;
        sensitivity;
        weight;
        driver;
        price;
        wireless;
        ownedby;
    
        constructor(id, brand, modelname) {
            this.id = id;
            this.brand = brand;
            this.modelname = modelname;
        }
    
        set type(type) {
            this.type=type;
        }
    
        set impedance(impedance) {
            this.impedance = impedance;
        }
    
        set sensitivity(sensitivity) {
            this.sensitivity = senstivity;
        }
    
        set weight(weight) {
            this.weight = weight;
        }
    
        set driver(driver) {
            this.driver = driver;
        }
    
        set price(price) {
            this.price = price;
        }
    
        set wireless(wireless) {
            this.wireless = wireless;
        }
    
        set ownedby(ownedby) {
            this.ownedby = ownedby;
        }
    }

    const profile = getUser(localStorage.getItem('viewingProfile'))[0];

    const headphones = [];
    const hpbrands = [];
    const userHP = [];
    let user = '';

    if (!checkAnyUsers()) {
        if (localStorage.getItem('currentuser') !== null) {
            user = getUser(localStorage.getItem('currentuser'))[0];
            const user_rights = profile.username === user.username;
        } else {
            user = new User('username', 'default');
        }
        
        document.querySelector('#profile-heading h1').textContent = profile.username;
        document.getElementById('add-hp').addEventListener('click', openAddHPModal, false);
        document.getElementById('add-hp-close').addEventListener('click', closeAddHPModal, false);
        document.getElementById('rm-hp').addEventListener('click', toggleRemove, false);

        if (user.username === profile.username) {
            document.getElementById('hp-btn-container').classList.remove('full-hidden');
        }

        function initHeadphones() {
            //load all headphones
            const hpResponse = loadHeadphones().then(hp => {
                for (const prop of hp) {
                    const thisHp = new Headphone(prop['id'], prop['brand'], prop['modelname']);
                    thisHp.type = prop['type'];
                    thisHp.impedance = prop['impedance'];
                    thisHp.sensitivity = prop['sensitivity'];
                    thisHp.weight = prop['weight'];
                    thisHp.driver = prop['driver-type'];
                    thisHp.price = prop['price'];
                    thisHp.wireless = prop['wireless'];
                    thisHp.ownedby = prop['ownedby'];
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
                const hp_list = document.getElementById('headphones-list');
                const no_hp = document.getElementById('profile-no-hp');
                const rm_hp = document.getElementById('rm-hp');

                if(userHP.length > 0) {
                    no_hp.classList.add('full-hidden');
                    rm_hp.classList.remove('full-hidden');
                    const hp_ul = document.createElement('ul');

                    for (const hpID of userHP) {
                        /* generate headphone list */
                        const hp = headphones.find(element => element.id === hpID);
                        const hp_a = createHPListItem(hp);
                        hp_ul.appendChild(hp_a);
                    }
            
                    hp_ul.classList.add('width');
                    hp_ul.id = 'profile-list';
                    hp_list.appendChild(hp_ul);
                } else {
                    no_hp.classList.remove('full-hidden');
                    rm_hp.classList.add('full-hidden');
                }
            });
        }
    }
    
    async function loadHeadphones() {
        const response = await fetch('./test.json');
        const names = await response.json();
        return names;
    }

    function createHPListItem(hp) {
        const hp_a = document.createElement('a');
        const hp_div = document.createElement('div');
        const hp_li = document.createElement('li');
        const hp_h3 = document.createElement('h3');
        const hp_span = document.createElement('span');
        const hp_img = document.createElement('img');
        const i_ele = document.createElement('i');
        hp_h3.textContent = hp.brand + " " + hp.modelname;
        let wireless = (hp.wireless === 'true') ? 'Wireless' : 'Wired';
        hp_span.textContent = hp.type + " " + wireless;
        hp_img.width = 150;
        hp_img.height = 150;
        hp_img.src = '';
        hp_li.appendChild(hp_img);
        hp_li.appendChild(hp_h3);
        hp_li.appendChild(hp_span);

        i_ele.classList.add('fa-regular');
        i_ele.classList.add('fa-circle-xmark');
        i_ele.classList.add('fa-lg');
        i_ele.classList.add('full-hidden');
        i_ele.addEventListener('click', removeHeadphone, false);

        hp_a.href = './headphone.html';
        hp_a.setAttribute('data-hp-id', hp.id);
        hp_a.addEventListener('click', setHeadphonePage, false);
        hp_a.appendChild(hp_li);
        hp_div.appendChild(hp_a)
        hp_div.appendChild(i_ele);
        return hp_div;
    }

    function setHeadphonePage() {
        const id = this.id.slice(10);
        localStorage.setItem('currenthp', id);
    }

    function closeAddHPModal() {
        const addHPModal = document.getElementById('add-hp-modal');
        addHPModal.classList.add('full-hidden');
    }

    function openAddHPModal() {
        const addHPModal = document.getElementById('add-hp-modal');
        addHPModal.classList.remove('full-hidden');
    }

    function toggleRemove() {
        const icon = [];
        if (this.classList.contains('rm-on')) {
            location.reload();
        } else {
            this.classList.add('rm-on');
            this.textContent='Save';
            icons = document.querySelectorAll('#profile-list i');
            icons.forEach(element => element.classList.remove('full-hidden'));
        }
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
        const hp = headphones.find( element => element.id === hpID) ;
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

        console.log(hpIndex);
        userHP.splice(hpIndex, 1);
        console.log(userHP);
        user.headphones = userHP;

        const userIndex = allUsers.findIndex(element => element.username === user.username);
        allUsers[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(allUsers));

        parent.classList.add('full-hidden');
    }

    function getUser(username) {
        if (!checkAnyUsers()) {
            const tempUsers = JSON.parse(localStorage.getItem('users'));
            const userExists = tempUsers.filter( element => element.username === username );
            return userExists;
        } else {
            return null;
        }
    }

    function checkAnyUsers() {
        return localStorage.getItem('users') === null;
    }

    function initTestUsers() {
        if (localStorage.getItem('test-active') === null) {
            const test_user1 = new User('bob', 'hello');
            const test_user2 = new User('jill', 'hello');
            const test_user3 = new User('smith', 'hello');
            const test_user4 = new User('dd889', 'hello');
            const test_user5 = new User('jack', 'hello');
    
            test_user1.headphones = [1, 2, 3];
            test_user2.headphones = [13];
            test_user3.headphones = [5, 4, 7, 11];
            test_user4.headphones = [12, 13, 10, 3, 5, 4, 2, 1, 6, 7];
            test_user5.headphones = [4, 7, 9];

            let users = [];
            if (!checkAnyUsers()) {
                users = JSON.parse(localStorage.getItem('users'));
            }
            users.push(test_user1);
            users.push(test_user2);
            users.push(test_user3);
            users.push(test_user4);
            users.push(test_user5);

            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('test-active', 'true');
        } else {
            console.log('Test users already populated.');
        }
    }

    initTestUsers();
    initHeadphones();
});