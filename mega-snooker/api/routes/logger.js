const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
    //TODO log errors code here
    res.render('index', { title: 'FINISH THIS LOGGER.JS' });
});

module.exports = router;
