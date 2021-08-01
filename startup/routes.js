const auth = require('../routes/auth');
const home = require('../routes/home');

module.exports = (app) => {
    app.use('/', home);
    app.use('/auth', auth);
};