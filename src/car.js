class Car {
    static COLORS = ["White"];
    static instancesCount = 0;

    constructor(brand, color) {
        this.brand = brand;
        this.color = color || Car.COLORS[Car.instancesCount % Car.COLORS.length];
        Car.instancesCount++;
    }
}

module.exports = Car;