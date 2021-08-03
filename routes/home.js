const express = require('express');
const path = require('path');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, (req, res) => {
    const context = { signedIn: false };
    if (req.isAuthenticated() && req.user) {
        context.user = req.user;
        context.signedIn = true;
    }
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


module.exports = router;