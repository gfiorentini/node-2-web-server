

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// setted up by huroku
const port = process.env.PORT  || 3000 ;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");

app.set('views engine','hbs');


// custom middleware
app.use( (req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;

    console.log ( log );
    fs.appendFile('server.log', log + '\n' , (err) => {
        if (err) {
            console.log( 'Unable to append to server.log ');
        }
    });
    next();
});

// app.use( (req, res, next ) => {
//     res.render('maintenance.githbs');
// });

//
app.use( express.static (  __dirname + "/public"));



hbs.registerHelper('getCurrentYear', () => {
   // return 'test';
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt',  (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
   res.render('home.hbs', {
       pageTitle: 'Home page',
       welcomeMessage: 'Welcome to new web site'
   })
});

// app.get('/', (req,res) => {
//     res.send (
//     {
//         name:'Andrew'
//         , likes: ['a','b']
//     }
//     )
// });

app.get('/about', (req,res) => {
   res.render('about.hbs', {
       pageTitle: 'About page',
   });
});

app.listen( port , () => {
    console.log( `Application started on port ${port}` );
});
