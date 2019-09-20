const express = require('express');
const path = require('path');
const router = express.Router();

// Routes
var routes = require('./routes/index');
var users = require('./routes/users');

// Init app
var app = express();

app.set('views', path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');

app.use('/', routes);
app.use('/', users);

// Set running port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
  console.log('server started on port'+ app.get('port'));
});