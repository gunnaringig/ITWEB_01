const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const MongoClient = require('mongodb').MongoClient;

const { check, validationResult } = require('express-validator');

//Usermodel
var User = require('../models/user');

//Exercisemodel
var Exercise = require('../models/exercise');

//Planmodel
var Plan = require('../models/plan');

//plan ('/users/plan') POST-request
router.post('/plan', (req, res) => {

    console.log("TEST");

    //Create new Test plan from PlanSchema.
    var newPlan = new Plan({
        name: req.body.name,
        users: req.session.user._id
    });

    //Short for creating a new document to database.
    newPlan.save((error) => {
        if(error) return console.log(error);
    });

    return res.redirect('./plan');
});

// plan ('/users/plan') GET-request
router.get('/plan', (req, res) => {

    User.findOne({ email: req.body.email }, (error, user) => {
        if(error) return res.status(422).json(error);

    // Get plans for user
    Plan.find({ id: req.session.userId}, 
        function(err, plans) {
        if(err) {
            console.log(error);
        }



        

        res.render('plan', {data: plans});
        });
    });
});

// Register ('/users/register') GET-request
router.get('/register', (req, res) => {
    res.render('register');
});

// login ('/users/login') GET-request
router.get('/login', (req, res) => {
    res.render('login');
});

// plan ('/users/plan') GET-request
router.get('/plan', (req, res) => {
    res.render('plan');
});

// Login POST-request
router.post('/login', (req, res) => {

    //Find user this that email.
    User.findOne({ email: req.body.email }, (error, user) => {
        if(error) return res.status(422).json(error);

        console.log(user);

        if(user === null) return res.status(404).json({ error: "No user with that email" });

        //Compare found user's password with the one tried.
        user.comparePassword(req.body.password, (error, isMatching) => {
            if(error) return res.status(422).json(error);

            console.log('Password: ' + req.body.password, isMatching);

            //Check result for comparing password to selected user.
            if(isMatching === false) {
                return res.status(422).json('User and password does not match.');
            }

            //Set userId for later usage
            req.session.user = user;

            return res.redirect('./plan');
        });
    });
});


// Register POST-Request
router.post('/register', [

    //Validate inputs
    check('email')
        .isEmail()
        .withMessage('Must be an Email'),

    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be with length of 6'),

    check('passwordConfirm')
        .isLength({ min: 6 })
        .withMessage('Password must be with length of 6'),

], (req, res) => {

    //Show Errors
    const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm

    if(password != passwordConfirm) return res.status(422).json('Password: (' + password + ') and (' + passwordConfirm + ') not equal.');

     //Create new User from UserSchema.
     var newUser = new User({
        email: email,
        password: password
    });

    //Short for creating a new document to database.
    newUser.save((error) => {
        if(error) return console.log(error);
    });

    res.redirect('./login');
});

// User logout
router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
});

function goBack(){
    res.redirect('/index')
}

module.exports = router;