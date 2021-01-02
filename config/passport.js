const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../app/modules/users-model');
const bcrypt = require('bcrypt');

module.exports = function(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ email: email })
        .then(user => {
            if(!user) {
                return done(null, false, { message: 'Email not registered'});
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Password Incorrect' });
                }
            })
        })
        .catch(err => console.log(err))
    }));
    passport.serializeUser(function(user, done) {
        return done(null, user.id)
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, (err, user) => {
           return done(err, user);
        })
    })
}