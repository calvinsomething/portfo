const express = require('express');

const router = express.Router();

const context = {
    message:'templating activated'
};

router.get('/', (req, res) => {
    res.render('index', context);
});

router.get('/:arg', (req, res) => {
    context.arg = req.params.arg;
    res.render('index', context);
});

module.exports = router;