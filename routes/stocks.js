const axios = require("axios").default;
const express = require('express');

const router = express.Router();

const UTCtoEST = -4 * 60 * 60 * 1000;

const options = {
    method: 'GET',
    url: process.env.YAHOO_URL,
    params: {interval: '10m', range: '1d', region: 'US'},
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': process.env.RAPIDAPI_HOST
    }
};

router.get('/', (req, res) => {
    options.params.symbol = req.query.symbol;
    axios.request(options).then(function (response) {
        return res.send(cleanData(response.data.chart.result[0]));
    }).catch(function (error) {
        console.error(error);
    });
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
    return {
        symbol: data.meta.symbol,
        times: times,
        prices: data.indicators.quote[0].close
    };
}

exports = module.exports = router;