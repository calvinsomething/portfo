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
        // User.findOrCreate(profile, (err, id) => {
        //     done(err, id);
        // });
        const user = {
            id: profile.id,
            name: profile.name.givenName,
            photo: profile._json.picture
        }
        done(null, user);
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    app.use(cookieSession({
        name: 'session',
        maxAge: 24 * 60 * 60 * 1000,
        keys: [ process.env.SESSION_KEY_1, process.env.SESSION_KEY_2 ]
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
};

