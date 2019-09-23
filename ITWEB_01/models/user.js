const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

// Create new user with hashed password, SaltRounds = 10.
module.exports.hashPassword = (newUser, callback) => {
    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

// Get User by email
module.exports.getUserByEmail = (email, callback) => {
    var usersQuery = { email:email };
    User.findOne(usersQuery, callback);
}

// Compare password
module.exports.comparePassword = (password, hash, classback) => {
    bcrypt.compare(password, hash, (error, isMatching) => {
        if(error) throw error;
        callback(null, isMatching);
    });
}