const mongoose = require('mongoose');

//Usermodel
var User = require('../models/user');

//Exercisemodel
var Exercise = require('../models/exercise');

//Planmodel
var Plan = require('../models/plan');

var PlanSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// Get User from id.
module.exports.getUserById = (userId, callback) => {
    user = User.findById(userId, callback)
    .populate('plans')
    .exec(function (error, user) {
        console.log(user.plans);
    }), callback;
}

// Get plans for User.
module.exports.getPlans = (userId, callback) => {
    plan = Plan.find({
        users: userId
    })
    .populate('users')
    .populate('plans')
    .exec(function (error, plan) {
        console.log(plan.plans);
    }), callback;
}

// Export User model for usage in oth files.
module.exports = mongoose.model('Plan', PlanSchema);