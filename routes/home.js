const express = require('express');

const router = express.Router();

const context = {
    message:'templating activated'
};

router.get('/', (req, res) => {
    res.render('download/index', context);
});

router.get('/:arg', (req, res) => {
    context.arg = req.params.arg;
    res.render('download/index', context);
});

module.exports = router;