const _ = require('lodash');
const express = require('express');
const path = require('path');
const winston = require('winston');
const auth = require('../middleware/auth');
const mailer = require('../services/mailer');
const User = require('../models/user');

const router = express.Router();

router.get('/', auth, (req, res) => {
    const context = { signedIn: req.signedIn };
    if (req.signedIn) {
        _.extend(context, _.pick(req.user, ['name', 'photo']));
        context.balance = toDollars(req.user.balance);
        context.available = toDollars(req.user.balance - req.user.spent);
        context.stocks = [];
        req.user.stocks.forEach(s => {
            context.stocks.push(s.symbol)
        });
    }
    res.render('index', context);
});

router.get('/resume', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'resume.html'));
});

if (process.env.NODE_ENV === 'test') {
    router.get('/error', (req, res) => {
        throw new Error('/error');
    });

    router.get('/:arg', (req, res) => {
        const context = { test: req.params.arg };
        res.render('index', context);
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

function toDollars(cents) {
    const asStr = cents.toString();
    return asStr.slice(0, asStr.length - 2) + '.' + asStr.slice(asStr.length - 2, asStr.length);
};

module.exports = router;