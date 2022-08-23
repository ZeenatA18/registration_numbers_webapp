const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const app = express();

const pgp = require('pg-promise')();

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
    secret: "This is my long String that is used for session",
    resave: false,
    saveUninitialized:true
}));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash());

// app.post('/numberPlates', function(req, res){

// const regs = req.body.regs
 
// if(regs){
//     register.push(regs);
// }

// res.redirect('/')
//     })

    // const register = ["CY 124-245", ""];

app.get('/', function(req, res){


// const template = handlebars.compile('index.js');

// const number = template({register})

// res.send(number);

    res.render('index',{

    })
})

// let http = require("http");
const PORT = process.env.PORT || 3017;
// http.createServer().listen(PORT);
app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})