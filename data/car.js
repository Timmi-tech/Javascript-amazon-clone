class Car {
    brand;
    model;
    speed = 0;

    constructor(carDetails) {
        this.brand = carDetails.brand
        this.model = carDetails.model

    }

    displayInfo() {
        // console.log(`${this.brand}  ${this.model}`)
        console.log(`${this.brand}  ${this.model} speed: ${this.speed} km/h `)

    }
    go() {
        return this.speed += 5


        if (this.speed > 200) {
            this.speed = 200
        }
    }
    brake() {
        return this.speed -= 5
        if (this.speed < 0) {
            this.speed = 0
        }
    }
}
const car1 = new Car({
    brand: 'toyota',
    model: 'corrolla',
});
const car2 = new Car({
    brand: 'tesla',
    model: 'Model3',
});


car1.displayInfo();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();

car2.displayInfo();
car2.go();
car2.brake();
car2.go()
car2.go()
car2.brake();
car2.displayInfo();