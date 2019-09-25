const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const MongoClient = require('mongodb').MongoClient;

const { check, validationResult } = require('express-validator');

//Usermodel
var User = require('../models/user');

// Register ('/users/register') GET-request
router.get('/register', (req, res) => {
    res.render('register');
});

// Workout ('/users/workout') GET-request
router.get('/workout', (req, res) => {
    res.render('workout');
  });
  
// login ('/users/login') GET-request
router.get('/login', (req, res) => {
    res.render('login');
});

// Register a User
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


/* This is the old insert function.
// Insert documents to database.
function InsertDocument(element) {

    //Open database connection
    client.connect( function(error) {

        const db = client.db(dbName);

        // Get the documents collection
        const collection = db.collection('userCollection');

        // Insert some documents
        collection.insertOne(element);

        console.log("Inserted the element as a documents into the collection");
    });
    
    //Close database connection
    client.close()
};
*/

// User login
router.post('/login', (req, res) => {
    res.redirect('/');
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
