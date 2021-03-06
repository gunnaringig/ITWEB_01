const express = require('express');
const path = require('path');
const mongo = require('mongodb');
const mongoose = require('mongoose');

//Validate user inputs
const expressValidator = require('express-validator');

//Session, used for login token
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Define server url
//const database = 'mongodb://localhost:27017/mongodbWEB'
const database = 'mongodb+srv://Admin:admin@cluster0-is7vh.mongodb.net/test?retryWrites=true&w=majority'

//Connect to Mongodb
mongoose.connect(database, { useUnifiedTopology: true, useNewUrlParser: true  });


//Used to parsse text from textboxes
const bodyParser = require('body-parser');

//Init app and router
const app = express();
const router = express.Router();

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Cookie-parser to allow access of the cookie stored in brower
app.use(cookieParser());

//Express-session to allow tracking of the logged-in user
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave:true
}));

//Routes
var index = require('./routes/index');
var users = require('./routes/users');
var plans = require('./routes/plans');

app.set('views', path.join(__dirname,'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'ejs');

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Routing options for server.
app.use('/', index);
app.use('/users', users);
app.use('/plans', plans);

//Set running port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
  console.log('server started on port'+ app.get('port'));
});

//Test connection
//console.log(mongoose.connection.readyState);
/*
0: disconnected
1: connected
2: connecting
3: disconnecting
*/
