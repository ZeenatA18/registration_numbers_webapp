const assert = require('assert');
const registration = require('../registration.ff');
const pgp = require('pg-promise')();

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:pg123@localhost:5432/registration';

const config = {
    connectionString: DATABASE_URL
}

const db = pgp(config);

// describe("Registration function", function () {

    
    
    // it("Should return registration  number entered", async function () {
        //     const register = registration(db)
        
        //     assert.equal('CA 123-345', await register.getRegistration());
        
        // })
        
        // it("Should store the registration number entered into empty array", async function () {
            //     const register = registration(db)
            
            //     await register.setRegistration('CA 123-345')
            //     assert.equal('CA 123-345', await register.getRegistration());
            
            // })
            
// })

describe("Filter Registration Numbers", function () {
    
    beforeEach(async function () {
        await db.none("delete from registration_no");
        let all = await db.any('SELECT * FROM registration_no')
        console.log(all)
    });
    
    it("Should return all registration numbers for 'Cape Town'", async function () {
        const register = registration(db)

        await register.setRegistration('CA 123 345')

        assert.deepEqual([{ "regno": "CA 123 345", "town_id": 1 }], await register.filterRegistration('CA'));

    })

    // it("Should return all registration numbers for 'Bellville'", function () {
    //     const register = registration(db)

    //     register.setRegistration('CA 123 345')
    //     register.setRegistration('CY 123 345')
    //     register.setRegistration('CA 144 345')
    //     assert.deepEqual(['CY 123 345'], register.filterRegistration('CY'));

    // })

    // it("Should return all registration numbers for 'Paarl'", function () {
    //     const register = registration()

    //     register.setRegistration('CJ 123 349')
    //     register.setRegistration('CY 123 345')
    //     register.setRegistration('CJ 144 375')
    //     register.setRegistration('CA 144 345')
    //     register.setRegistration('CJ 144 365')
    //     register.setRegistration('CJ 148 345')
    //     register.setRegistration('CA 146 345')
    //     register.setRegistration('CJ 145 345')
    //     assert.deepEqual(['CJ 123 349', 'CJ 144 375', 'CJ 144 365', 'CJ 148 345', 'CJ 145 345'], register.filterRegistration('CJ'));

    // })

    // it("Should return all registration numbers for 'ALL'", async function () {
    //     const register = registration(db)

    //     await register.getRegistration([{
    //         "id": 49,
    //         "regno": "CA 123-345",
    //         "town_id": 1
    //        }])

    //     await register.setRegistration('CY 123 345')
    //     await register.setRegistration('CJ 148 345')
    //     await register.setRegistration('CA 146 345')
    //     await register.setRegistration('CJ 145 345')

    //     assert.equal([{
    //           "id": 49,
    //           "regno": "CA 123-345",
    //           "town_id": 1
    //          }], await register.getRegistration());

    // })

      after(function () {
        db.$pool.end
    });

})

// {
//     "id": 50
//     "regno": "CA 123 345"
//      "town_id": 1
//    }
     
//     +  {
//     +    "id": 51
//     +    "regno": "CY 123 345"
//     +    "town_id": 2
//     +  }
//     +  {
//     +    "id": 52
//     +    "regno": "CA 144 345"
//     +    "town_id": 1
//     +  }
//     +  {
//     +    "id": 53
//     +    "regno": "CJ 123 349"
//     +    "town_id": 3
//     +  }
//     +  {
//     +    "id": 54
//     +    "regno": "CJ 148 345"
//     +    "town_id": 3
//     +  }
//     +  {
//     +    "id": 55
//     +    "regno": "CA 146 345"
//     "town_id": 1
//      }
//      {
//       "id": 56
//    "regno": "CJ 145 345"
//        "town_id": 3  }