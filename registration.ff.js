module.exports = function Registration(db) {

   async function filterRegistration(areaReg) {
      
        let town_id = await db.one('SELECT id from town_key WHERE code=$1',[areaReg])
     let filtered =  await db.manyOrNone('SELECT regNo,town_id FROM registration_no WHERE town_id=$1',[town_id.id])
    return filtered
    }

    async function duplicateReg(regNumber) {
        const results = await db.oneOrNone('SELECT id FROM registration_no WHERE regNo = $1', [regNumber]);
        return results
    }

    // async function duplicateMessages(noPlate) {
    //     let duplicate = await duplicateReg(noPlate)
        
    //     if (duplicate !== null) {
    //         return 
    //     }
        
    // }

    async function setRegistration(regNumbers) {
        console.log(regNumbers)
        let town_id = await db.one('SELECT id from town_key WHERE code=$1',[regNumbers.substring(0,2)])
        let alreadyExistingReg =  await duplicateReg(regNumbers) 

         if (alreadyExistingReg === null) {
            await db.none('INSERT INTO registration_no(regNo, town_id) values($1, $2)', [regNumbers, town_id.id]);
        }
    }

    async function getRegistration() {
        let storedRegNums = await db.manyOrNone('SELECT * from registration_no')
        
        return storedRegNums

    }

    async function reseted() {
        await db.none('DELETE FROM registration_no');
    }

    return {
        duplicateReg,
        setRegistration,
        getRegistration,
        filterRegistration,
        reseted

    }
}
