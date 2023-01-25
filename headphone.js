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
    }
}

export async function loadHeadphones() {
    const response = await fetch('./test.json');
    const names = await response.json();
    return names;
}