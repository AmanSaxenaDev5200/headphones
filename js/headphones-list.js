'use-strict'
import Headphone, {loadHeadphones, createHPListItem} from './headphone.js';

document.addEventListener('DOMContentLoaded', function() {
    const headphones = [];
    const hp_brands = [];
    const hp_types = [];
    const hp_drivers = [];

    document.getElementById('hp-brand').addEventListener('change', filterList, false);
    document.getElementById('hp-type').addEventListener('change', filterList, false);
    document.getElementById('hp-driver').addEventListener('change', filterList, false);
    document.getElementById('hp-wireless').addEventListener('change', filterList, false);
    document.getElementById('all-option').addEventListener('click', resetAll, false);
    
     /* headphone functions */
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
                    'wireless': prop['wireless']
                });
                headphones.push(thisHp);
            }

            headphones.sort( (a, b) => {
                const a_name = a.brand + " " + a.modelname;
                const b_name = b.brand + " " + b.modelname;
                return a_name == b_name ? 0 : (a_name > b_name ? 1 : -1);
            });
    
            const hp_list = document.getElementById('headphones-list');
            const hp_ul = document.createElement('ul');
            const sel_brand = document.getElementById('hp-brand');
            const sel_type = document.getElementById('hp-type');
            const sel_driver = document.getElementById('hp-driver');
    
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

    function filterList() {
        resetList();
        const sel_brand = document.getElementById('hp-brand');
        const sel_type = document.getElementById('hp-type');
        const sel_driver = document.getElementById('hp-driver');
        const sel_wireless = document.getElementById('hp-wireless');

        let filteredHP = [...headphones];
        filteredHP = filteredHP.filter(element => {
            return (element.brand === sel_brand.value || !sel_brand.value) 
            && (element.type === sel_type.value || !sel_type.value)
            && (element.driver === sel_driver.value || !sel_driver.value)
            && (element.wireless === sel_wireless.value || !sel_wireless.value);
        });

        let listHP = [...headphones];

        filteredHP.forEach(element => {
            const index = listHP.indexOf(element);
            if (index >= 0) {
                listHP = listHP.filter( (element, idx) => idx !== index);
            }
        });

        for (const hp of listHP) {
            const selectedHP = document.querySelector('#headphones-list a[data-hp-id=\"'+ hp.id + '\"]');
            selectedHP.classList.add('full-hidden');
        }
        if (listHP.length === headphones.length) {
            document.getElementById('hp-no-exist').classList.remove('full-hidden');
            document.querySelector('#headphones-list ul').classList.add('full-hidden');
        }
    }

    function resetList() {
        const listItems = document.querySelectorAll('#headphones-list .full-hidden');
        if (listItems) {
            listItems.forEach(element => {
                element.classList.remove('full-hidden');
            });
        }
        document.getElementById('hp-no-exist').classList.add('full-hidden');
    }

    function resetAll() {
        const sel_brand = document.getElementById('hp-brand');
        const sel_type = document.getElementById('hp-type');
        const sel_driver = document.getElementById('hp-driver');
        const sel_wireless = document.getElementById('hp-wireless');

        sel_brand.value = '';
        sel_type.value = '';
        sel_driver.value = '';
        sel_wireless.value = '';
        resetList();
    }

    initHeadphones();
});
