const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

module.exports = (app) => {
    passport.use(new Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
        const user = profile.id;
        cb(null, user);
    }));
    
    app.use(passport.initialize());
};

