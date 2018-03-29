let express = require('express');
let router = express.Router();
let Character = require('../models/character');
let Race = require('../models/race');

let functions = require('../config/functions');

router.get('/', (req, res, next) => {
    Character.find((err, characters) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('characters/index', {
               title: 'Character Profiles',
               characters: characters,
               user: req.user
            });
        }
    });
});

router.get('/add', functions.isLoggedIn, (req, res, next) => {
    Race.find((err, race) => {
        if (err) {
            console.log(err);
        }
        else {
                res.render('characters/add', {
                title: 'Add a New Character',
                race: race,
                user: req.user
            });
        }});
});

router.post('/add', functions.isLoggedIn, (req, res, next) => {
    Character.create({
        name: req.body.name,
        race: req.body.race,
        gender: req.body.gender,
        element: req.body.element,
        summary: req.body.summary
    }, (err, character) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/characters');
        }
    });
});

router.get('/delete/:_id', functions.isLoggedIn, (req, res, next) => {
    let _id = req.params._id;

    Character.remove({ _id: _id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/characters');
        }
    });
});

router.get('/edit/:_id', functions.isLoggedIn, (req, res, next) => {
    let _id = req.params._id;

    Character.findById(_id, (err, character) => {
        if (err) {
            console.log(err);
        }
        else {
            Race.find((err, race) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.render('characters/edit', {
                        title: 'Character Details',
                        character: character,
                        race: race,
                        user: req.user
                    });
                }
            })
            
        }
    });
});

router.post('/edit/:_id', functions.isLoggedIn, (req, res, next) => {
    let _id = req.params._id;

    Character.update({ _id: _id },
    
    { $set: {
        name: req.body.name,
        race: req.body.race,
        gender: req.body.gender,
        element: req.body.element,
        summary: req.body.summary
    }}, null, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/characters')
        }
    });
});

module.exports = router;