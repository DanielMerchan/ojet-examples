define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Customer Model mocks the structure of a Customer
     * @author Daniel Merchan Garcia
     * @version 6.2.0
     */
    var Customer = /** @class */ (function () {
        function Customer(id, name, age) {
            var self = this;
            self.id = id;
            self.name = name;
            self.age = age;
        }
        return Customer;
    }());
    return Customer;
});
//# sourceMappingURL=Customer.js.map