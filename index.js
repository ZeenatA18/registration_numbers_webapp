const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const app = express();

const registers = require('./registration.ff');

const pgp = require('pg-promise')();

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:pg123@localhost:5432/registration';

const config = {
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const db = pgp(config);
const reggy = registers(db);

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
    secret: "This is my long String that is used for session",
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash());

app.get('/', async function (req, res) {
     var  regList = await reggy.getRegistration()
     console.log(regList.regNo + " fdfdfdfd")
    res.render('index', {
        regList
    })
})

app.post('/numberPlates', async function (req, res) {
    let motorPlate = req.body.regNo
    console.log(motorPlate)
    if (motorPlate) {

        await reggy.setRegistration(motorPlate)
        // console.log(await reggy.getRegistration(motorPlate))
    } else {
        req.flash('error', await reggy.errorMessages(motorPlate))
    }
res.redirect('/')
})

app.get('/reset', async function (req, res) {
    await reggy.reseted();
    // console.log("-------------");

    req.flash('error', 'You have just reseted Everything')

    res.redirect('/')
}
);

// let http = require("http");
const PORT = process.env.PORT || 3017;
// http.createServer().listen(PORT);
app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})