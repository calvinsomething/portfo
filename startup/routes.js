const auth = require('../routes/auth');
const error = require('../middleware/error');
const home = require('../routes/home');
const stocks = require('../routes/stocks');
const logs = require('../routes/logs');

module.exports = (app) => {
    app.use('/auth', auth);
    app.use('/stocks', stocks);
    app.use('/logs', logs);
    app.use('/', home);
    app.use(error);
};