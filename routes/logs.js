const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');

const router = express.Router();

router.get('/:password', async (req, res) => {
    if (req.params.password != process.env.LOGS_PW)
        return res.status(401);
    const logs = {
        morgan: await mongoose.connection.db.collection('morgan').find().toArray(),
        winston: await mongoose.connection.db.collection('log').find().toArray()
    };
    return res.send(logs);
});

module.exports = router;