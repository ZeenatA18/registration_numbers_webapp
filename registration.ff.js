module.exports = function Registration(list) {

    var storedRegNums = list || []
    // var areaReg = ['CA', 'CY', 'CJ']
    var empty = []

    var letters = /[^\d]/gi;

    // /[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/; 

    function sumbitRegistration(noReg) {
        if(letters.test(noReg)){
            return noReg
        } 
        else{
            return "Enter a valid registration number"
        } 
    }

    function filterRegistration(areaReg){
        return storedRegNums.filter(function(reg){
            return reg.startsWith(areaReg)
        });


        // if(storedRegNums.filter(areaReg)){
        //     return areaReg
        // }; 

    }

    // function filterRegistration(areaReg) {

    //     for (let i = 0; i storedRegNums.length; i++) {
    //         if (storedRegNums[i] === areaReg) {
    //             empty.push(storedRegNums[i])
    //         }
    //     }
    // }

    function errorMessages(noPlate) {
        if (noPlate == "") {
            return "Please enter a registration number"
        }
    }

    function duplicateReg(regNumber) {
        if (storedRegNums.includes(regNumber)) {
            return true
        }
        return false
    }

    function setRegistration(regNumbers) {
        if (duplicateReg(regNumbers) === false) {
            storedRegNums.push(regNumbers)
            return true
        }
        else {
            return false;
        }

    }

    function getRegistration() {
        return storedRegNums
    }

    return {
        sumbitRegistration,
        duplicateReg,
        setRegistration,
        getRegistration,
        errorMessages,
        filterRegistration

    }
}
