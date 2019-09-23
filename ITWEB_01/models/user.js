const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
let mongoose = require('mongoose');

//Own local running Mongo database with Docker!
const server = 'mongodb://localhost:27017';
const database = 'DAB3';   
const user = 'SA';
const password = 'D15987532147er!'

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
    mongoose.connect(`mongodb://${server}/${database}/${user}/${password}`)
        .then(() => {
            console.log('Database connection successful')
       })
       .catch(err => {
            console.error('Database connection error')
       })
    }
}

var User = mongoose.Schema({
    email:{
        type:String,
        index:true
    },
    password:{
        type:String
    }
});

var User = module.exports = mongoose.model('User', User);

module.exports.createUser = (user, callback) => {
    bcrypt.genSalt(10, function (error, salt) {
        bcrypt.hash(user.password, salt, function (error, hash) {
            user.password = hash;
            user.save(callback);
        });
    });
}

//TODO XX

//Get user by id / name?

//Compare passwords 

