// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
// var mongoose = require('mongoose');
// var passport = require('passport');
// var flash    = require('connect-flash');
var bodyParser = require('body-parser');

// var configDB = require('./config/database.js');
var server = require('http').createServer(app);  
// var io = require('socket.io')(server);
// configuration ===============================================================
// mongoose.connect(configDB.url); // connect to our database

// require('./config/passport')(passport); // pass passport for configuration

// app.configure(function() {
	app.use('/',express.static(__dirname + "/app"));
	// app.use('/customer',express.static(__dirname + "/customer"));
	// app.use('/display',express.static(__dirname + "/display"));
	app.use(bodyParser.json());
	// set up our express application
	// app.use(express.logger('dev')); // log every request to the console
	// app.use(express.cookieParser()); // read cookies (needed for auth)
	// app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating
	app.set('views', __dirname + '/app');
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');

	// required for passport
	// app.use(express.session({ secret: 'test-passportjs-google-authentication' })); // session secret
	// app.use(passport.initialize());
	// app.use(passport.session()); // persistent login sessions
	// app.use(flash()); // use connect-flash for flash messages stored in session

	app.use(function (req, res, next) {
	  // check if client sent cookie
	  var cookie = req.cookies.cookieName;
	  if (cookie === undefined)
	  {
	    // no: set a new cookie
	    var randomNumber=Math.random().toString();
	    randomNumber=randomNumber.substring(2,randomNumber.length);
	    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
	    console.log('cookie created successfully');
	  } 
	  else
	  {
	    // yes, cookie was already present

	    console.log('cookie exists', cookie);
	  } 
	  next(); // <-- important!
	});

// });

// routes ======================================================================
// require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app.js')(app);
// launch ======================================================================
server.listen(port);
// server.listen(port, '172.19.203.224', function() {
//   console.log("... port %d in %s mode", server.address().port,server.address());
// });
console.log('The magic happens on port ' + port);
