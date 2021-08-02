const auth = require('../routes/auth');
const home = require('../routes/home');
const users = require('../routes/users');

module.exports = (app) => {
    app.use('/auth', auth);
    app.use('/users', users);
    app.use('/', home);
};