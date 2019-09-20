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
