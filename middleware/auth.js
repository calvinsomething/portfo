const User = require('../models/user');

module.exports = (req, res, next) => {
    //if (req.isAuthenticated() && req.user) ...
    next();
};