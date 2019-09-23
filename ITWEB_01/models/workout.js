let mongoose = require('mongoose');

//Work
let workoutSchema = mongoose.Schema({
    exercise:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },
    
    set:{
        type: String,
        required: true
    },

    reps_time:{
        type: String,
        required: true
    }
});

let article = module.exports = mongoose.model('Article', articleSchema);