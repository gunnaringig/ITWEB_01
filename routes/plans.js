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
router.post('/exercise', (req, res) => {

    console.log("Exercise");

    //Create new Test plan from PlanSchema.
    var exercisePlan = new Exercise({
        id: req.body.id,
        name: req.body.name,
        description: req.body.name,
        sets: req.body.name,
        reps_time: req.body.name,
    });

    //Short for creating a new document to database.
    exercisePlan.save((error) => {
        if(error) return console.log(error);
    });

    return res.redirect('./plan');
});

// Login POST-request
router.post('/plan', (req, res) => {

    console.log("POST plan/");

    //db.collection.update({_id:'5sq8uye1236g'},{$set :{token :12345});
    
});

module.exports = router;