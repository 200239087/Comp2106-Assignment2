let express = require('express');
let router = express.Router();
let Race = require('../models/race');

router.get('/', (req, res, next) => {
    Race.find((err, race) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('races/index', {
                title: 'List of Races',
                race: race
            });
        }
    });
});

router.get('/add', (req, res, next) => {
    res.render('races/add', {
        title: 'Add a New Race',
    });
});

router.post('/add', (req, res, next) => {
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

router.get('/delete/:_id', (req, res, next) => {
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

router.get('/edit/:_id', (req, res, next) => {
    let _id = req.params._id;

    Race.findById(_id, (err, race) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('races/edit', {
                title: 'Race Details',
                race: race
            });
        }
    });
});

router.post('/edit/:_id', (req, res, next) => {
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