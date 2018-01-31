
// Auth Siriwimon Sunthon
// Engineering Computer Center

// ========== server.js ============
// var express  = require('express');
// var app      = express();
// var port     = process.env.PORT || 3000;
var bodyParser = require('body-parser');

// app.use('/',express.static(__dirname + "/app"));
// // app.use('/administrator',express.static(__dirname + "/administrator"));


// app.set('views', __dirname + '/app');
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

module.exports = function(app) {

	// ============================= user ===================================
	// ============ begin of main page ==============
	// show calendar of booking rooms

	app.get('/main', function (req,res){
		// res.sendFile('index.html',{root : __dirname + '/app'});
		res.redirect('/');
		

	});
	app.get('/main/test', function (req,res){
		
		// res.sendFile('home.html',{root : __dirname + '/roombooking/main'});
		// res.json("Main test is ok!!");
		res.redirect('/');
	});

	// ============ end of main page  ==============
	app.get('/checkid', function (req,res){
		// res.render('home.html');
		res.sendFile('checkID.html',{root : __dirname + '/app'});
	});

	app.get('/checkid/test', function (req,res){
		
		// res.sendFile('home.html',{root : __dirname + '/roombooking/main'});
		res.json("checkid test is ok!!");
	});

	app.get('/findemptyroom', function (req,res){
		// res.render('home.html');
		res.sendFile('findEmptyRoom.html',{root : __dirname + '/app'});
	});

	app.get('/studentauth', function (req,res){
		// res.render('home.html');
		res.sendFile('studentAuth.html',{root : __dirname + '/app'});
	});

	app.get('/studentauth/submit', function (req,res){
		// res.render('home.html');
		res.redirect('/booking')
	});

	app.get('/booking', function (req,res){
		// res.render('home.html');
		// res.redirect('/studentauth')
		res.sendFile('booking.html',{root : __dirname + '/app'});
	});

	app.get('/booking/back', function (req,res){
		// res.render('home.html');
		
		// res.json("back to main is ok!!");
		// res.sendFile('booking.html',{root : __dirname + '/app'});
		console.log("back")
		res.redirect('/')
	});

	app.get('/booking/main', function (req,res){
		// res.render('home.html');
		
		// res.json("back to main is ok!!");
		// res.sendFile('booking.html',{root : __dirname + '/app'});
		console.log("back to main")
		res.redirect('/main')
	});

	app.get('/rulestutor', function (req,res){
		// res.render('home.html');
		res.sendFile('rulesTutors.html',{root : __dirname + '/app'});
	});

	app.get('/rulesredhat', function (req,res){
		// res.render('home.html');
		res.sendFile('rulesRedhat.html',{root : __dirname + '/app'});
	});

	app.get('/ruleslinux', function (req,res){
		// res.render('home.html');
		res.sendFile('rulesLinux.html',{root : __dirname + '/app'});
	});

	app.get('/infotutor', function (req,res){
		// res.render('home.html');
		res.sendFile('infoTutor.html',{root : __dirname + '/app'});
	});

	app.get('/inforedhat', function (req,res){
		// res.render('home.html');
		res.sendFile('infoRedhat.html',{root : __dirname + '/app'});
	});

	app.get('/infolinux', function (req,res){
		// res.render('home.html');
		res.sendFile('infoLinux.html',{root : __dirname + '/app'});
	});

	app.get('/dashboard', function (req,res){
		// res.render('home.html');
		res.sendFile('dashboard.html',{root : __dirname + '/app'});
	});

	app.get('/testchart', function (req,res){
		// res.render('home.html');
		res.sendFile('amchart-angular.html',{root : __dirname + '/app'});
	});
	// ========================== administrator ==============================

	// app.listen(port, function () {
	// 	console.log("Nodejs is running on port", port )
	// })

}
