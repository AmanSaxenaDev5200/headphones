'use-strict'

document.addEventListener('DOMContentLoaded', function() {
    const headphones = [];
    const hp_brands = [];
    const hp_types = [];
    const hp_drivers = [];

    initHeadphones();
    
     /* headphone functions */
     function initHeadphones() {
        const hp = loadHeadphones().then(hp => {
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

            const hp_list = document.getElementById('headphones-list');
            const hp_ul = document.createElement('ul');
            const sel_brand = document.getElementById('hp-brand');
            const sel_type = document.getElementById('hp-type');
            const sel_driver = document.getElementById('hp-driver');

            let wireless = '';
            for (const hp of headphones) {
                /* generate filter options */
                if (hp_brands.indexOf(hp.brand) < 0) {
                    hp_brands.push(hp.brand);
                    const hp_opt_brand = document.createElement('option');
                    hp_opt_brand.textContent = hp.brand;
                    hp_opt_brand.value = hp.brand;
                    sel_brand.appendChild(hp_opt_brand);
                }

                if (hp_types.indexOf(hp.type) < 0) {
                    hp_types.push(hp.type);
                    const hp_opt_type = document.createElement('option');
                    hp_opt_type.textContent = hp.type;
                    hp_opt_type.value = hp.type;
                    sel_type.appendChild(hp_opt_type);
                }

                if (hp_drivers.indexOf(hp.driver) < 0) {
                    hp_drivers.push(hp.driver);
                    const hp_opt_driver = document.createElement('option');
                    hp_opt_driver.textContent = hp.driver;
                    hp_opt_driver.value = hp.driver;
                    sel_driver.appendChild(hp_opt_driver);
                }

                /* generate headphone list */
                const hp_a = createHPListItem(hp);
                hp_ul.appendChild(hp_a);
            }
            hp_ul.classList.add('width');
            hp_list.appendChild(hp_ul);
        });
    }
    
    async function loadHeadphones() {
        const response = await fetch('https://raw.githubusercontent.com/yd24/cf-project/main/test.json');
        const names = await response.json();
        return names;
    }

    function createHPListItem(hp) {
        const hp_a = document.createElement('a');
        const hp_li = document.createElement('li');
        const hp_h3 = document.createElement('h3');
        const hp_span = document.createElement('span');
        const hp_img = document.createElement('img');
        hp_h3.textContent = hp.brand + " " + hp.modelname;
        if (hp.wireless === 'true') {
            wireless = 'Wireless';
        } else {
            wireless = 'Wired';
        }
        hp_span.textContent = hp.type + " " + wireless;
        hp_img.width = 150;
        hp_img.height = 150;
        hp_img.src = '';
        hp_li.appendChild(hp_img);
        hp_li.appendChild(hp_h3);
        hp_li.appendChild(hp_span);
        hp_a.href = './headphone.html';
        hp_a.classList.add('headphone-' + hp.id);
        hp_a.appendChild(hp_li);
        return hp_a;
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
