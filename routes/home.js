const express = require('express');
const path = require('path');
const winston = require('winston');
const auth = require('../middleware/auth');
const mailer = require('../mailer/mailer');

const router = express.Router();

router.get('/', auth, (req, res) => {
    const context = {
        signedIn: req.signedIn,
        user: req.user
    };
    res.render('index', context);
});

router.get('/resume', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'resume.html'));
});

if (process.env.NODE_ENV === 'test') {
    router.get('/:arg', (req, res) => {
        const context = {};
        const test = /(?<=jesting:).*/.exec(req.params.arg);
        if (test) context.test = test[0];
        res.render('index', context);
        delete context.test;
    });
}

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.post('/contact', (req, res) => {
    mailer(req.body.email, req.body.name, req.body.message);
    res.redirect('/');
});


module.exports = router;