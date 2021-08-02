const express = require('express');
const path = require('path');
const auth = require('../middleware/auth');

const router = express.Router();

const context = {};

router.get('/', auth, (req, res) => {
    delete context.test;
    context.user = req.user;
    res.render('index', context);
});

router.get('/resume', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'resume.html'));
});

router.get('/:arg', (req, res) => {
    const test = /(?<=jesting:).*/.exec(req.params.arg);
    if (test) context.test = test[0];
    res.render('index', context);
});


module.exports = router;