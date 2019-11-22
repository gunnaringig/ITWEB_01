const mongoose = require('mongoose');

//Planmodel
var Plan = require('../models/plan');

var ExerciseSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    sets:{
        type:String,
        required: true,
    },
    reps_time:{
        type:String,
        required: true,
    }
});
// Export User model for usage in oth files.
//module.exports = mongoose.model('Exercise', ExerciseSchema);

module.exports = mongoose.set(Plan.name, ExerciseSchema);