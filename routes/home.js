const express = require('express');
const path = require('path');

const router = express.Router();

const context = {
    message:'templating activated'
};

router.get('/', (req, res) => {
    delete context.test;
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