'use-strict'

export default class Headphone {
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
    img;

    constructor(args) {
        this.id = args.id;
        this.brand = args.brand;
        this.modelname = args.modelname;
        this.type = args.type;
        this.impedance = args.impedance;
        this.sensitivity = args.sensitivity;
        this.weight = args.weight;
        this.driver = args.driver;
        this.price = args.price;
        this.wireless = args.wireless;
        this.img = args.img;
    }
}

//======== Shared Functions for Processing Headphone Data ========

export async function loadHeadphones() {
    const response = await fetch('./test.json');
    const names = await response.json();
    return names;
}

//Create headphone thumbnail and info
export function createHPListItem(hp) {
    let reviews = [];
    if (localStorage.getItem('reviews') !== null) {
        reviews = JSON.parse(localStorage.getItem('reviews'));
    }
    reviews = reviews.filter(element => Number.parseInt(element.headphone_id) === hp.id);
    const hp_a = document.createElement('a');
    const hp_li = document.createElement('li');
    const hp_h3 = document.createElement('h3');
    const hp_span = document.createElement('span');
    const hp_span2 = document.createElement('span');
    const hp_span3 = document.createElement('span');
    const hp_div = document.createElement('div');
    const hp_img = document.createElement('img');
    hp_h3.textContent = hp.brand + " " + hp.modelname;
    let wireless = (hp.wireless === 'true') ? 'Wireless' : 'Wired';
    hp_span.textContent = hp.type + " " + wireless;
    hp_span.classList.add('wire-info');
    hp_span2.textContent = '$' + Number(hp.price).toFixed(2);
    hp_span3.textContent = reviews.length + ' reviews';
    hp_img.src = hp.img;

    hp_li.appendChild(hp_img);
    hp_li.appendChild(hp_h3);
    hp_li.appendChild(hp_span);
    hp_div.appendChild(hp_span2);
    hp_div.appendChild(hp_span3);
    hp_div.classList.add('sub-info');
    hp_li.appendChild(hp_div);

    hp_a.href = headphonePage(hp.id);
    hp_a.setAttribute('data-hp-id', hp.id);
    hp_a.appendChild(hp_li);
    return hp_a;
}

//URL routing for headphone single page
function headphonePage(headphone_id) {
    let hpURL = './headphone.html';
    const hpObj = { hpID: headphone_id };
    const params = new URLSearchParams(hpObj);

    hpURL += '?' + params.toString();
    return hpURL;
}