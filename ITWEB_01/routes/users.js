const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

//Define server url
const database = 'mongodb://localhost:27017/mongodbWEB'

//Connect to Mongodb
//const db = mongoose.connect(database, { useUnifiedTopology: true, useNewUrlParser: true  });

const client = new MongoClient(database, { useUnifiedTopology: true, useNewUrlParser: true  });
const dbName = "Users";

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
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    /*
    //Validation check
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('passwordConfirm', 'passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();
    */

    //TODO MAKE THIS NOT THROW AN ERROR!
    if(password != passwordConfirm) throw error; 

    //Create new User from UserSchema.
    var newUser = new User({
        email:email,
        password:password
    })

    //Hash User password
    User.hashPassword(newUser, (error, user) => {
        if(error) throw error;
        console.log("User email: " + newUser.email);
        console.log("Password hash: " + newUser.password);
        
        insertDocument(newUser);
    });
    res.redirect('/users/login');
});

// Insert documents to database.
function insertDocument(element, callback) {

    //Open database connection
    client.connect( function(error) {

        const db = client.db(dbName);

        // Get the documents collection
        const collection = db.collection('userCollection');

        // Insert some documents
        collection.insertOne(element);

        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
    
    //Close database connection
    client.close()
};

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
