const express = require('express');

const router = express.Router();

const context = 'templating activated';

router.get('/', (req, res) => {
    res.render('index', {message: context});
});

module.exports = router;
module.exports.context = context;