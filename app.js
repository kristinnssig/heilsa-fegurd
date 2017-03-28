var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var passportHttp = require('passport-http').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var morgan = require('morgan');

mongoose.connect('mongodb://heroku_qr39s11q:gfseiq9no9mg7j08haqf74t5fu@ds135818.mlab.com:35818/heroku_qr39s11q');
//mongoose.connect('mongodb://localhost/hof');
var db = mongoose.connection;

//Setup routes
var routes = require('./routes/index');
var admin = require('./routes/admin');
var users = require('./routes/users');
var recipes = require('./routes/recipes');
var search = require('./routes/search');
var api = require('./routes/api');

// Init App
var app = express();
  // Set app port
  app.set('port', (process.env.PORT || 5000));

  // View Engine
  app.set('views', path.join(__dirname, 'views'));
  app.engine('handlebars', exphbs({defaultLayout:'main'}));
  app.set('view engine', 'handlebars');

  // BodyParser Middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Set Static Folder
  app.use(express.static(__dirname + '/public'));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// use morgan to log requests to the console
app.use(morgan('dev'));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use('/', routes);
app.use('/starfsfolk', users);
app.use('/bokanir', recipes);
app.use('/leit', search);
app.use('/hof/salon/bakendi', admin);
app.use('/hof/api/v1', api);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});