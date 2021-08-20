const axios = require('axios').default;
const express = require('express');
const winston = require('winston');
const auth = require('../middleware/auth');
const { middleware: cache, setexAsync: setCache } = require('../middleware/cache');

const router = express.Router();

const UTCtoEST = -4 * 60 * 60 * 1000;

const options = {
    method: 'GET',
    url: process.env.YAHOO_URL,
    params: {interval: '15m', range: '1d', region: 'US'},
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': process.env.RAPIDAPI_HOST
    }
};

router.get('/', cache, (req, res) => {
    options.params.symbol = req.query.symbol;
    axios.request(options).then(function (response) {
        return res.send(cleanData(response.data.chart.result[0]));
    }).catch(function (error) {
        winston.error(error);
    });
});

router.get('/buy/:symbol/:quantity', auth, async (req, res) => {
    if (!req.signedIn) return res.send({ failure: 'Must be logged in to buy stocks.' });
    try {
        if (await req.user.buy(req.params.symbol, req.params.quantity)) return res.redirect('/');
    } catch(err) {
        return res.send({ failure: 'Can only have three kinds of stocks. Must sell some if you want to buy a different kind.' });
    }
    return res.send({ failure: 'Insufficient funds.' });
});

function cleanData(data) {
    const { timestamp: t } = data;
    // Set array with proper size and string lengths
    const times = Array.from('00:00'.repeat(t.lenght));
    // Fill array with times converted to hh:mm format
    for (let i = 0; i < t.length; i++) {
        const d = new Date(t[i] * 1000 + UTCtoEST);
        times[i] = String(`${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`);
    }
    const clean = {
        symbol: data.meta.symbol,
        times: times,
        prices: data.indicators.quote[0].close
    };
    setCache(clean.symbol, 120, JSON.stringify(clean));
    return clean;
}

exports = module.exports = router;