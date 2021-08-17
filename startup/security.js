const cookieSession = require('cookie-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user');

module.exports = (app) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOrCreate(profile, done);
    }));

    passport.serializeUser((user, done) => {
        done(null, user.external_id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await User.findOne({ external_id: id });
        done(null, user);
    });

    app.use(cookieSession({
        name: 'session',
        maxAge: 24 * 60 * 60 * 1000,
        keys: [ process.env.SESSION_KEY_1, process.env.SESSION_KEY_2 ]
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
};

