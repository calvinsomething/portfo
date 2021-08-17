const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient(process.env.REDIS);
client.getAsync = promisify(client.get).bind(client);
client.setexAsync = promisify(client.setex).bind(client);
client.keysAsync = promisify(client.keys).bind(client);

client.middleware = async function (req, res, next) {
    const { symbol } = req.query;
    const data = await client.getAsync(symbol);
    if (data) return res.send(JSON.parse(data));
    next();
};

exports = module.exports = client;