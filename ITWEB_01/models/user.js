const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

SALT_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        index: { unique: true }
    },
    password:{
        type:String,
        required: true
    }
});

//Preset a hashed password for new User
UserSchema.pre('save', function(next) {
    var user = this;

    //Hash user password if Modified or User is new.
    if(!user.isModified('password')) return next();

    //Generate salt.
    bcrypt.genSalt(SALT_FACTOR, (error, salt) => {
        if(error) return next(error);

        //Hash users password with salt.
        bcrypt.hash(user.password, salt, (error, hashPassword) => {
            if(error) return next(error);

            //Overwrite plaintext with hashed password
            user.password = hashPassword;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(passwordToCheck, callback) {
    bcrypt.compare(passwordToCheck, this.password, function(error, isMatching) {
        if(error) return error;
        callback(null, isMatching);
    });
};

/*
// Update users password to hashed, SaltRounds = 10.
module.exports.hashPassword = (newUser, callback) => {
    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
*/

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

// Export User model for usage in oth files.
module.exports = mongoose.model('User', UserSchema);