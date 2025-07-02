const Car = require('./car');

class UnsupportedBrandError extends Error { }

class CarFactory {
    static supportedBrands = ['Fiat', 'Lancia', 'Subaru'];

    constructor(name, brands) {
        const proccessedBrands = this.proccessBrands(brands);
        const notSupportedBrands = proccessedBrands.filter(brand => !CarFactory.supportedBrands.includes(brand));

        if (notSupportedBrands.length > 0) {
            throw new UnsupportedBrandError(`Brand not supported: '${notSupportedBrands.join(', ')}'`);
        }

        this.name = name;
        this.brands = proccessedBrands;
        this.factoryName = name + " produces: " + this.brands.join(', ');
    }

    createCars(...data) {
        const cars = [];
        if (typeof data[0] === 'number') {
            for (let i = 0; i < data[0]; i++) {
                cars.push(this.createCar(this.brands[i % this.brands.length]));
            }
            return cars;
        }

        for (var [number, brand] of data) {
            brand = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
            if (typeof number !== 'number' || number < 0 || typeof brand !== 'string' || brand.length === 0) throw new UnsupportedBrandError('Invalid input');
            for (let i = 0; i < number; i++) {
                if (!this.brands.includes(brand)) {
                    continue;
                }
                cars.push(this.createCar(brand));
            }
        }
        return cars;
    }

    createCar(brand) {
        if (brand) {
            brand = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
            if (!this.brands.includes(brand)) {
                throw new UnsupportedBrandError(`Factory does not have a brand or do not support it`);
            }
            return new Car(brand);
        }

        if (this.brands.length === 1) {
            return new Car(this.brands[0]);
        }

        throw new UnsupportedBrandError(`Factory does not have a brand or do not support it`);
    }

    proccessBrands(brands) {
        brands = typeof brands === 'string' ? [brands] : brands.flat();
        for (let i = 0; i < brands.length; i++) {
            if (typeof brands[i] === 'string') {
                brands[i] = brands[i].charAt(0).toUpperCase() + brands[i].slice(1).toLowerCase();
            }
        }
        return brands;
    }
}


module.exports = {
    CarFactory,
    UnsupportedBrandError
};