const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find();
    req.user.stocks = [];
    req.user.spent = 0;
    req.user.save();
    res.send(users);
});

module.exports = router;