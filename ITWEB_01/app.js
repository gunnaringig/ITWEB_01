const express = require('express');
const path = require('path');
const router = express.Router();
/* import {MDCRipple} from '@material/ripple';
import {MDCTextField} from '@material/textfield';
// instatiate materialdesign textfield
const textField = new MDCTextField(document.querySelector('.mdc-text-field'));
const buttonRipple = new MDCRipple(document.querySelector('.mdc-button')); */
var favicon = require('serve-favicon');
// Routes
var routes = require('./routes/index');
var users = require('./routes/users');

// Init app
var app = express();

app.use(favicon(path.join(__dirname, '/static', 'favicon.ico')));

app.set('views', path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');

app.use('/', routes);
app.use('/users', users);

// Set running port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
  console.log('server started on port'+ app.get('port'));
});