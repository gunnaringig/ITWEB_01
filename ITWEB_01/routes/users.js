const express = require('express');
const router = express.Router();

// Usermodel
var User = require('../models/user');

// Register ('/users/register') GET-request
router.get('/register', (req, res) => {
    res.render('register');
  });
  
// login ('/users/login') GET-request
router.get('/login', (req, res) => {
    res.render('login');
});


// Register a User
router.post('/register', (req, res) => {
    var mail = req.body.mail;
    var password = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;

// TODO make Validation ??
/*

Use of var expressValidator = require('express-validator');
router.use(expressValidator())
 
req.checkBody('mail', 'mail is required').notEmpty();
req.checkBody('password', 'password is required').notEmpty();
req.checkBody('passwordConfirm', 'passwords do not match').equals(req.body.password);

var errors = req.validationErrors();
*/

// Register new User if nothing does wrong
var user = new User({
    email:email,
    password:passwod
});

User.createUser(user, (error, user) => {
    if(error) throw error;
    console.log("New user created: " + user);
});

req.flash("success_msg", "User: " + user.mail + " is now created. You may login.")
res.redirect('/users/login');
});

function goBack(){
    res.redirect('/index')
}

module.exports = router;
