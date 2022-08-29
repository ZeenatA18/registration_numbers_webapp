module.exports = function routesRegistration(reggy) {
console.log(reggy)
    async function home(req, res) {
        var regList = await reggy.getRegistration()

        res.render('index', {
            regList
        })
    }

    async function submit(req, res) {
        let motorPlate = req.body.regNo.toUpperCase().trim()
        let regex = /[A-Z]{2,3}\s[0-9]{3}(\-|\s)?[0-9]{3}/;

        if (!motorPlate) {
            req.flash('error', "Please enter a registration number")
        } else if (regex.test(motorPlate) === false) {
            req.flash('error', "Invalid registration number please try again")
        } else if (await reggy.duplicateReg(motorPlate) !== null) {
            req.flash('error', "This registration number already exists")
        } else if (regex.test(motorPlate) === true) {
            console.log('no')
            await reggy.setRegistration(motorPlate)
        }

        res.redirect('/')
    }

    async function filter(req, res) {
        let town = req.body.town
        let all = req.body.all

        if (town) {
            var filtering = await reggy.filterRegistration(town)
        } else {
            var filtering = await reggy.getRegistration(all)
        }

        res.render('index', {
            regList: filtering,
        })
    }

    async function reset(req, res) {
        await reggy.reseted();


        req.flash('reset', 'You have just reseted Everything')

        res.redirect('/')
    }

    return {
        home,
        submit,
        filter,
        reset
    }
}