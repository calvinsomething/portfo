const axios = require('axios').default;
const winston = require('winston');

module.exports = async (symbol) => {
    const res = await axios.request({
        method: 'GET',
        url: `http://127.0.0.1:${process.env.PORT}/stocks`,
        params: { symbol: symbol }
    });
    return Math.floor(res.data.prices[res.data.prices.length - 1] * 100);
};