const express = require('express');
const router = express.Router();

// Index ('/') GET-request
router.get('/', ensureAuth, (req, res) => {
    res.render('index');
});

function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.flash('error_msg, Not logged in!');
        res.redirect('/users/login');
    }
}

module.exports = router;
