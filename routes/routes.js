module.exports = function routesRegistration(reggy) {
    // console.log(reggy)

    async function home(req, res) {
        var regList = await reggy.getRegistration()

        res.render('index', {
            regList
        })
    }

    async function submit(req, res) {
        let motorPlate = req.body.regNo.toUpperCase().trim()
        let regex = /[CA|CY|CJ]{2}\s[0-9]{3}(\-|\s)?[0-9]{3}/;
        // let townCode = motorPlate.substring(0, 2)
    
        // (CA|CY|CL|CF)

        if (!motorPlate) {
            req.flash('error', "Please enter a registration number")
        }
        else if (regex.test(motorPlate) === false) {
            req.flash('error', "Invalid registration number please try again")
        }
        else if (await reggy.duplicateReg(motorPlate) !== null) {
            req.flash('error', "This registration number already exists")
        }
        else if (regex.test(motorPlate) === true) {
            console.log('no')
            await reggy.setRegistration(motorPlate)
        }

        res.redirect('/')
    }

    async function filter(req, res) {
        let town = req.body.town
        let all = req.body.all
        let townCode = await reggy.filterRegistration(town)
        // let getAll = await reggy.getRegistration(all)
        // let regex = /[CA|CY|CJ]{2}\s[0-9]{3}(\-|\s)?[0-9]{3}/;

        if (townCode.length == 0) {
            req.flash('error', "There is no data on this town")
        }
        else if(town){
            //start filtering if theres a plate 
            var filtering = await reggy.filterRegistration(town)
        }
        else if (all){
            var filtering = await reggy.getRegistration(all)
        }

        // if (town) {
        //     var filtering = await reggy.filterRegistration(town)
        // }
        // if(all) {
        //     var filtering = await reggy.getRegistration(all)
        // }

        res.render('index', {
            regList: filtering,
        })
    }

    async function reset(req, res) {
        await reggy.reseted();


        req.flash('reset', 'You have just erased all data')

        res.redirect('/')
    }

    return {
        home,
        submit,
        filter,
        reset
    }
}