const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper('getYear', function () {
    return new Date().getFullYear();
});

hbs.registerHelper('getName', function () {
    return 'Nagaraj M Rudrappa';
});

hbs.registerHelper('copyRightText', function () {
    return "this is copyright information";
});

hbs.registerHelper('screamIt', function (text) {
    return text.toUpperCase();
});

app.use(function (req, res, next) {
    fs.exists('./logs', function callback(exists) {
        if(!exists) {
            fs.mkdir('./logs');
        }
    });

    fs.appendFile('./logs/server.log', 'entering the function\n', function callback(error) {
        if(error) {
            console.log('Error occurred');
        }
    });
    next();
});

// app.use(function (req, res, next) {
//    res.render('maintainence.hbs');
// });

app.get('/info', function (req, res) {
    res.send({
        age: 34
    });
});

app.get('/about', function (req, res) {
    res.render('about.hbs', {});
});

app.get('/home', function (req, res) {
    res.render('home.hbs', {
        message: 'Welcome home'
    });
});

app.get('/help', function (req, res) {
    res.render('../public/help.hbs', {
        message: 'Welcome home'
    });
});

app.listen(7009, function () {
    console.log("server is up on 7009");
});