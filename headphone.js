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

    constructor(id, brand, modelname) {
        this.id = id;
        this.brand = brand;
        this.modelname = modelname;
    }
}