const auth = require('../routes/auth');
const error = require('../middleware/error');
const home = require('../routes/home');
const stocks = require('../routes/stocks');
const users = require('../routes/users');

module.exports = (app) => {
    app.use('/auth', auth);
    app.use('/stocks', stocks);
    app.use('/users', users);
    app.use('/', home);
    app.use(error);
};