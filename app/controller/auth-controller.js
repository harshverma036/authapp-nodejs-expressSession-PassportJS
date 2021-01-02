const mongoose = require('mongoose');
const User = require('../modules/users-model');
const bcrypt = require('bcrypt');
const passport = require('passport');

module.exports.login = (req, res) => {
    res.render('login');
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
}

module.exports.loginUser = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
}

module.exports.register = (req, res) => {
    res.render('register');
}

module.exports.registerUser = (req, res) => {
    const { fname, email, password, password2 } = req.body;
    let errors = [];

    // checking all fields are filled or not
    if (!fname || !email || !password || !password2) {
        errors.push({ msg: 'Please fill all fields.' });
        console.log('Please enter all values');
    }

    // checking password & confirm password matched or not
    if (password !== password2) {
        errors.push({ msg: 'Password do not matched' });
        console.log('password do not match');
    }

    // checking pass length
    if (password.length < 6) {
        errors.push({ msg: 'Password must be 6 characters' });
    }

    if (error.length > 0) {
        res.render('register', {
            errors,
            fname,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ email: email })
        .then(user => {
            if (user) {
                error.push({ msg: 'User already exists' });
                res.render('register', {
                    errors,
                    fname,
                    email,
                    password,
                    password2
                });
            } else {
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    const newUser = new User({
                        fullname: fname,
                        email: email,
                        password: hash
                    });
                    newUser.save()
                    .then(() => {
                        req.flash('success_msg', 'You are register and can login');
                        res.redirect('/users/login');
                    })
                    .catch(err => console.log(err))
                })
            }
           
        })
    }
}