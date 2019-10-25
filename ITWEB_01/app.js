const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongo = require('mongodb');
const mongoose = require('mongoose');
//
//Define server url
const database = 'mongodb://localhost:27017/mongodbWEB'

//Connect to Mongodb
mongoose.connect(database, { useUnifiedTopology: true, useNewUrlParser: true  });


//Used to parsse text from textboxes
const bodyParser = require('body-parser');

// Init app and router
const app = express();
const router = express.Router();

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());



// Routes
var routes = require('./routes/index');
var users = require('./routes/users');

app.set('views', path.join(__dirname,'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'ejs');

app.use('/', routes);
app.use('/users', users);

//express session
app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave:true
  }));

// Set running port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
  console.log('server started on port'+ app.get('port'));
});

/*
//Test connection
console.log(mongoose.connection.readyState);

/*
0: disconnected
1: connected
2: connecting
3: disconnecting
*/
