const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require("../models/User");
const {myDecrypt} = require('../rsa')

const verifyCallback = (username, password, done) => {
    //password = myDecrypt(password);
    User.findOne({ email: username, password: password })
        .then((user) => {
            if (!user) { return done(null, false) }
            return done(null, user);
        })
        .catch((err) => {   
            done(err);
        });
}

const strategy  = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});
