const assert = require('assert');
const registration = require('../registration.ff');
const pgp = require('pg-promise')();

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:pg123@localhost:5432/registration';

const config = {
    connectionString: DATABASE_URL
}

const db = pgp(config);


describe("Filter Registration Numbers", function () {

    beforeEach(async function () {
        await db.none("delete from registration_no");
        let all = await db.any('SELECT * FROM registration_no')
        console.log(all)
    });

    it("Should return all registration numbers for 'Cape Town'", async function () {
        const register = registration(db)

        await register.setRegistration('CA 123 345')
        await register.setRegistration('CY 123 345')
        await register.setRegistration('CA 144 345')

        assert.deepEqual([{ "regno": "CA 123 345", "town_id": 1 }, { "regno": "CA 144 345", "town_id": 1 }], await register.filterRegistration('CA'));

    })

    it("Should return all registration numbers for 'Bellville'", async function () {
        const register = registration(db)

        await register.setRegistration('CA 123 345')
        await register.setRegistration('CY 122 345')
        await register.setRegistration('CA 144 345')
        assert.deepEqual([{ "regno": "CY 122 345", "town_id": 2 }], await register.filterRegistration('CY'));

    })

    it("Should return all registration numbers for 'Paarl'", async function () {
        const register = registration(db)

        await register.setRegistration('CJ 123 349')
        await register.setRegistration('CY 123 345')
        await register.setRegistration('CJ 144 375')
        await register.setRegistration('CA 144 345')
        await register.setRegistration('CJ 144 365')
        await register.setRegistration('CJ 148 345')
        await register.setRegistration('CA 146 345')
        await register.setRegistration('CJ 145 345')
        assert.deepEqual([{ "regno": "CJ 123 349", "town_id": 3 }, { "regno": "CJ 144 375", "town_id": 3 }, { "regno": "CJ 144 365", "town_id": 3 }, { "regno": "CJ 148 345", "town_id": 3 }, { "regno": "CJ 145 345", "town_id": 3 }], await register.filterRegistration('CJ'));

    })

    it("Should return all registration numbers for 'ALL'", async function () {
        const register = registration(db)

        const all = await register.getRegistration()

        assert.deepEqual([], all);

    })



    after(function () {
        db.$pool.end
    });

})

