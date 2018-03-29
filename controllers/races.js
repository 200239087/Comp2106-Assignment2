let express = require('express');
let router = express.Router();
let Race = require('../models/race');

let functions = require('../config/functions');

router.get('/', functions.isLoggedIn, (req, res, next) => {
    Race.find((err, race) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('races/index', {
                title: 'List of Races',
                race: race,
                user: req.user
            });
        }
    });
});

router.get('/add', functions.isLoggedIn, (req, res, next) => {
    res.render('races/add', {
        title: 'Add a New Race',
        user: req.user
    });
});

router.post('/add', functions.isLoggedIn, (req, res, next) => {
    Race.create({
        name: req.body.name,
    }, (err, race) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/races');
        }
    });
});

router.get('/delete/:_id', functions.isLoggedIn, (req, res, next) => {
    let _id = req.params._id;

    Race.remove({ _id: _id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/races');
        }
    })
});

router.get('/edit/:_id', functions.isLoggedIn, (req, res, next) => {
    let _id = req.params._id;

    Race.findById(_id, (err, race) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('races/edit', {
                title: 'Race Details',
                race: race,
                user: req.user
            });
        }
    });
});

router.post('/edit/:_id', functions.isLoggedIn, (req, res, next) => {
    let _id = req.params._id;

    Race.update({ _id: _id },
    
    { $set: {
        name: req.body.name,
    }}, null, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/races')
        }
    });
});

module.exports = router;