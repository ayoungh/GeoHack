var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var weather = require('openweathermap');

//CONFIG - SECRETS ETC
var config = require('./config/config');
console.log(config.twitter);

//PASSPORT.JS
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;

// Configure the Twitter strategy for use by Passport.
//
// OAuth 1.0-based strategies require a `verify` function which receives the
// credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
// user's behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: 'http://127.0.0.1:3000/login/twitter/return'
  },
  function(token, tokenSecret, profile, cb) {
    // In this example, the user's Twitter profile is supplied as the user
    // record.  In a production-quality application, the Twitter profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));

  // Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});



var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: config.secret, resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


//ROUTES
app.use('/', routes);
app.use('/users', users);

app.get('/login', function(req, res){
    res.render('login');
});





//Twitter

app.get('/login/twitter',
  passport.authenticate('twitter'));

app.get('/login/twitter/return',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { title: 'GeoHackRoofs', user: req.user });
  });

//weather
//set defaults
weather.defaults = {units:'metric', lang:'en', mode:'json'};

var coords = {"lon":50,"lat":10}; // carrots
var coords = {"lon":41,"lat":0}; // kale
var coords = {"lon":21,"lat":0}; // tomatoes

weather.now(coords,function (err, json){
  console.dir(json);
  var apiResult = json;



  var plants = [
    //Tomatoes,16,33,50,
    {
      'plant':'Tomatoes'
      ,'temp':'26'
      ,'rainfall':'0'
      ,'Humidity':'88'
    },
    //Kale,13.5,55,50,
    {
      'plant':'Kale'
      ,'temp':'27'
      ,'rainfall':'14'
      ,'Humidity':'59'
    },
    //Potatoes,11,17,30,
    {
      'plant':'Potatoes'
      ,'temp':'15'
      ,'rainfall':'17'
      ,'Humidity':'35'
    },
    //Carrots,11,17,30,
    {
      'plant':'Carrots'
      ,'temp':'16'
      ,'rainfall':'17'
      ,'Humidity':'24'
    },
    //Lettuce,18,77,70,
    {
      'plant':'Lettuce'
      ,'temp':'19'
      ,'rainfall':'77'
      ,'Humidity':'30'
    }
      //Beetroot,11,17,30,
      //Red peppers,20,60,80,
  ];

  // for (var i = 0; i < array.length; i++) {
  //   array[i]
  // }
  function isEmpty(obj) {
    for(var prop in obj) {
          if(obj.hasOwnProperty(prop))
              return false;
      }

      return true;
  }

  function square(x) {return x*x;}

  function getBestPlantIndex(apiResult, plants)
  {
  console.log(apiResult)
  var tempC = ((typeof apiResult.main.temp != 'undefined'))?apiResult.main.temp-273.15:15;


  var humidity = apiResult.main.humidity;

  var rainfall = isEmpty(apiResult.rain)?0:Object.keys(apiResult.rain).map(function(key){
    return apiResult.rain[key];
})[0];

  console.log(tempC)
  console.log(100*rainfall)
  console.log(humidity)

  var bestScore = 99999999999;
  var bestIndex = 0;
  for(var i in plants)
  {
  var score = square(tempC-plants[i].temp)+ .2*square(rainfall-plants[i].rainfall) + .4*square(humidity - plants[i].Humidity);
  console.log(i)
  console.log(score)
  if(score<bestScore)
  {
  bestScore = score;
  bestIndex = i;
  }
  }
  return bestIndex
  }

  console.log(plants[getBestPlantIndex(apiResult, plants)]);


});





/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
