module.exports = function Registration(db) {

    let letters = /[^\d]/gi;

    // /[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/; 

    function sumbitRegistration(noReg) {
        if (letters.test(noReg)) {
            return noReg
        }
    }

    // function filterRegistration(areaReg) {
    //     return storedRegNums.filter(function (reg) {
    //         return reg.startsWith(areaReg)
    //     });
    // }

    async function duplicateReg(regNumber) {
        const results = await db.oneOrNone('SELECT id FROM registration_no WHERE regNo = $1', [regNumber]);
        return results
    }

    async function errorMessages(noPlate) {
        if (!noPlate) {
            return "Please enter a registration number"
        }
        if (await duplicateReg(noPlate) !== null) {
            return "This registration number already exists"
        }
    }


    async function setRegistration(regNumbers) {
        let town_id = await db.one('SELECT id from town_key WHERE code=$1',[regNumbers.substring(0,2)])
        let alreadyExistingReg =  await duplicateReg(regNumbers) 

        console.log(town_id.id + " dsdsdsd "  +  alreadyExistingReg)
        if (alreadyExistingReg === null) {
            await db.none('INSERT INTO registration_no(regNo, town_id) values($1, $2)', [regNumbers, town_id.id]);
        }
    }

    async function getRegistration() {
        let storedRegNums = await db.manyOrNone('SELECT * from registration_no')
        console.log(storedRegNums + " ppppppppppppppp")
        return storedRegNums

    }

    async function reseted() {
        await db.none('DELETE FROM registration_no');
     

    }

    return {
        sumbitRegistration,
        duplicateReg,
        setRegistration,
        getRegistration,
        errorMessages,
        // filterRegistration,
        reseted

    }
}
