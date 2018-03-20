let express = require('express');
let router = express.Router();
let Character = require('../models/character');

router.get('/', (req, res, next) => {
    Character.find((err, characters) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('characters/index', {
               title: 'Character Profiles',
               characters: characters 
            });
        }
    });
});

router.get('/add', (req, res, next) => {
    res.render('chracters/add', {
       title: 'Add a New Character' 
    });
});

router.post('/add', (req, res, next) => {
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

router.get('/edit/:_id', (req, res, next) => {
    let _id = req.params._id;

    Character.findById(_id, (err, character) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('characters/edit', {
                title: 'Character Details',
                character: character
            });
        }
    });
});

router.post('/edit/:_id', (req, res, next) => {
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