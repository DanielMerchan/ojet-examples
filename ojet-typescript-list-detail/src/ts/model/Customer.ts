
/**
 * Customer Model mocks the structure of a Customer
 * @author Daniel Merchan Garcia
 * @version 6.2.0
 */
class Customer {

    id: Number;
    name: String;
    age: Number;

    constructor(id:Number, name: String, age: Number) {
        let self = this;
        self.id = id;
        self.name = name;
        self.age = age;
    }

//     get id(): Number {
//         return this._id;
//     }

//     get name(): String {
//         return this._name;
//     }

//     get age(): Number {
//         return this._age;
//     }

//     set id(id: Number) {
//         this._id= id;
//     }
//     set name(name: String) {
//         this._name= name;
//     }
//     set age(age: Number) {
//         this._age= age;
//     }
}

export = Customer;