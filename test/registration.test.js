const assert = require('assert');
const registration = require('../registration.ff');

describe("Registration function", function () {

    it("Should return registration  number entered", function () {
        const register = registration()

        assert.equal('CA123345', register.sumbitRegistration('CA123345'));

    })

    it("Should store the registration number entered into empty array", function () {
        const register = registration()

        register.setRegistration('fdfd')
        assert.deepEqual(['fdfd'], register.getRegistration());

    })

    // it("Should check if registration number is duplicate", function () {
    //     const register = registration()

    //     register.storedRegNums = ['fdfd']

    //     // register.getRegistration('fdfd')
    //     assert.equal( false, register.setRegistration('fdfd'));

    // })

})

describe("Error messages", function () {

    it("Should return a error message if no registration number was not entered", function () {
        const register = registration()

        assert.equal("Please enter a registration number", register.errorMessages(""));

    })

//  it("Should return error message if invalid registration number was entered", function () {
//         const register = registration()

//         assert.equal("Enter a valid registration number", register.sumbitRegistration('231345'));

//     })

    it("Should return error message if registration number is duplicate", function () {
        const register = registration()

        register.storedRegNums = ['fdfd']

        // register.getRegistration('fdfd')
        "Existing registration number"
        assert.equal(false, register.duplicateReg('fdfd'));
        

    })

})

describe("Filter Registration Numbers", function () {

    it("Should return all registration numbers for 'Cape Town'", function () {
        const register = registration()

        register.setRegistration('CA 123 345')
        register.setRegistration('CY 123 345')
        register.setRegistration('CA 144 345')
        assert.deepEqual(['CA 123 345', 'CA 144 345'], register.filterRegistration('CA'));

    })

    it("Should return all registration numbers for 'Bellville'", function () {
        const register = registration()

        register.setRegistration('CA 123 345')
        register.setRegistration('CY 123 345')
        register.setRegistration('CA 144 345')
        assert.deepEqual(['CY 123 345'], register.filterRegistration('CY'));

    })

    it("Should return all registration numbers for 'Paarl'", function () {
        const register = registration()

        register.setRegistration('CJ 123 349')
        register.setRegistration('CY 123 345')
        register.setRegistration('CJ 144 375')
        register.setRegistration('CA 144 345')
        register.setRegistration('CJ 144 365')
        register.setRegistration('CJ 148 345')
        register.setRegistration('CA 146 345')
        register.setRegistration('CJ 145 345')
        assert.deepEqual(['CJ 123 349', 'CJ 144 375', 'CJ 144 365', 'CJ 148 345', 'CJ 145 345'], register.filterRegistration('CJ'));

    })

    it("Should return all registration numbers for 'ALL'", function () {
        const register = registration()

        register.setRegistration('CJ 123 349')
        register.setRegistration('CY 123 345')
        register.setRegistration('CJ 148 345')
        register.setRegistration('CA 146 345')
        register.setRegistration('CJ 145 345')
        assert.deepEqual(['CJ 123 349','CY 123 345','CJ 148 345','CA 146 345','CJ 145 345'], register.getRegistration());

    })

})