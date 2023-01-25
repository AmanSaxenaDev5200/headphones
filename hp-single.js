'use-strict'

document.addEventListener('DOMContentLoaded', function() {
    const headphones = [];
    initHeadphones();

    function initHeadphones() {
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
            
            if (localStorage.getItem('currenthp') === null) {
                document.getElementById('hp-error').classList.remove('full-hidden');
                document.querySelector('.hp-heading').classList.add('full-hidden');
                document.querySelector('main').classList.add('full-hidden');
            } else {
                const hpID = Number(localStorage.getItem('currenthp'));
                const hp = headphones.find(element => element.id === hpID);
                
                document.querySelector('.hp-heading h1').textContent = hp.brand + " " + hp.modelname;

                document.querySelector('#spec-brand p').textContent = hp.brand;
                document.querySelector('#spec-modelname p').textContent = hp.modelname;
                document.querySelector('#spec-price p').textContent = "$"+ hp.price + ".00";
                let wireless = (hp.wireless === 'true') ? 'Wireless' : 'Wired';
                document.querySelector('#spec-type p').textContent = hp.type + ' ' + wireless;
                document.querySelector('#spec-driver p').textContent = hp.driver;
                document.querySelector('#spec-impedance p').textContent = hp.impedance;
                document.querySelector('#spec-sensitivity p').textContent = hp.sensitivity;
                document.querySelector('#spec-weight p').textContent = hp.weight;

            }
        });
    }

    async function loadHeadphones() {
        const response = await fetch('./test.json');
        const names = await response.json();
        return names;
    }

    class Review {
        user_id;
        headphone_id;
        title;
        rating;
        content;

        constructor(user_id, headphone_id, title, rating, content) {
            this.user_id = user_id;
            this.headphone_id = headphone_id;
            this.title = title;
            this.rating = rating;
            this.content = content;
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
});