const express = require('express');
const appRoutes = require('./app/routes/app-routes');
const authRoutes = require('./app/routes/auth-routes');
const expressEjsLayouts = require('express-ejs-layouts');
const config = require('config');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express();

require('./config/passport')(passport);

mongoose.connect(config.get('mongodb.URI'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Database not connected'))

app.use(expressEjsLayouts);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'thisissecret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', appRoutes);
app.use('/users', authRoutes);

const Port = process.env.PORT || 3000;
app.listen(Port, () => console.log('http://localhost:' + Port));