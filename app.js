
// Auth Siriwimon Sunthon
// Engineering Computer Center

// ========== app.js ============
// stop global mongodb
// $ systemctl stop mongod
// start local mongodb
// $ mongod --storageEngine=mmapv1 --dbpath /home/jaa/Documents/Computer\ Center/Room-Booking/data/
// db.createUser({user:"test-admin",pwd:"test1234",roles:[{role: "dbOwner",db:"test-RBS"}]})

var mongojs = require('mongojs');			
var db = mongojs('test-RBS',['test-RBS']);

// var moment = require('moment');
// var dbCollections = ["queueRequest","serviceRecord"];

var moment = require('moment-timezone');
// var schedule = require('node-schedule');


module.exports = function(app) {


	// ============================= user ===================================
	// ============ begin of main page ==============
	// show calendar of booking rooms

	app.get('/', function (req,res){
		// res.sendFile('index.html',{root : __dirname + '/app'});
		//res.redirect('/main');
		console.log("OK")
		

	});

	app.get('/main', function (req,res){
		//res.sendFile('index.html',{root : __dirname + '/app'});
		res.redirect('/');
		
	});

	app.get('/main/render/:text', function (req,res){	
		var text = req.params.text;
		var viewTime = text.split(',');
		var viewStart = new Date(viewTime[0]);
		var viewEnd = new Date(viewTime[1]);	
		
		db.events.find(
			{start : {$gte: viewStart,$lte: viewEnd}}
		).toArray(function (err, docs){
			//console.log(docs);

			if(err){
				res.json([]);
			}else{
				docs.forEach(function(doc){
					
					start = doc.start;
					end = doc.end;
				    doc.start = moment.tz(start,"Asia/Bangkok").format();
				    doc.end = moment.tz(end,"Asia/Bangkok").format();
				    
				});


				res.json(docs);
			}
		});
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
