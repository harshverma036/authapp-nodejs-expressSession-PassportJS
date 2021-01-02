module.exports = {
    ensureAuthenticate: function(req, res, next) {
        if (req.isAuthenticated()) {
            next()
        }
        req.flash('error_msg', 'Please login to access this');
        res.redirect('/users/login');
    }
}