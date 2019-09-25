const express = require('express');
const router = express.Router();

//SessionChecker
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/workout');
    } else {
        next();
    }    
  };

//Route for Index ('/') GET-request 
router.get('/', sessionChecker, (req, res) => {
    res.render('index');
});

module.exports = router;
