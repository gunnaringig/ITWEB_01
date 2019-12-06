const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');

const { check, validationResult } = require('express-validator');

//Usermodel
var User = require('../models/user');

//Exercisemodel
var Exercise = require('../models/exercise');

//Planmodel
var Plan = require('../models/plan');

//plan ('/exercises') POST-request
router.post('/exercise', (req, res) => {

    console.log("Exercise");

    //Create new Test plan from PlanSchema.
    var exercise = new Exercise({
        planId: req.body.id,
        name: req.body.name,
        description: req.body.description,
        sets: req.body.sets,
        reps_time: req.body.reps,
    });

    //Should update plan provided by id, with object of type Exercise

    //var stringId = "ObjectId(" + req.body.id + ")";

    var db = mongoose.connection;

    db.collection("plans").update(
        { _id: ObjectId(req.body.id) }, 
        {"$push": { "exercises": exercise } });

        //console.log(req.body.id);
    /*
    exercise.update((error) => {
        if(error) return console.log(error);
    });
    */

    return res.redirect('/users/plan');
});

module.exports = router;