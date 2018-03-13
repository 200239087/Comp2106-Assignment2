let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => res.render('index', {
  title: 'COMP2106 - Assignment 2' 
}));

module.exports = router;
