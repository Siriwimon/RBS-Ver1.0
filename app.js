
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

// credit--> https://stackoverflow.com/questions/11480769/how-can-i-check-if-a-json-is-empty-in-nodejs
// This should work in node.js and other ES5 compliant implementations.

var rooms = [];
var tutorTitle = [];

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

// This should work both there and elsewhere.
function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

// This should compare to array and return differance
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});

};

function getResources(callback){
	
	var tutorRoomTitle = [];

	db.resources.aggregate( 
		[
			{
		    	$unwind: {
		    		path:'$children',
		    		preserveNullAndEmptyArrays: true
		    	}
		    }
		    ,{
		        $project: {	        	
		          
		            _id: 0,         
		            id: '$children.id',
		            title: '$children.title',
		            eventColor: '$children.eventColor'

		        }
	    	}			    	
		]
	).toArray(function (err, docs){
		// rooms.splice(0,rooms.length);
		tutorRoomTitle.splice(0,tutorRoomTitle.length);
		// rooms = docs;
		
		docs.forEach(function(doc){
			if(doc.id.includes('t')){
				tutorRoomTitle.push(doc.title)
			}					
		});

		var getRooms = {
				rooms: docs,
				tutorTitle: tutorRoomTitle
			}

		callback(getRooms);		
	});

}

function compare2Array(firstArr,secondArr){
	outArr = [];
	for (var i = 0; i < firstArr.length; i++) {
		secondArr.forEach(function(room){
			if (room == firstArr[i].title){
				outArr.push(firstArr[i]);
			}
		});
	}
	return outArr;
}



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
		var events = [];
		
		db.events.aggregate( 
			[
				{ $match: 
					{$and:
						[
							{start : {$gte: viewStart,$lte: viewEnd}},					
							{ $or:
								[
									{status: {$eq: 0}},
									{status: {$eq: 2}}
								]
							}
							
						]
					} 
				},{
			        $lookup:
			        {
			            from: "users",
			            localField: "userID",
			            foreignField: "id",
			            as: "userInfo"
			        }
			    },{
			    	$unwind: 
			    	{
			    		path:'$userInfo',
			    		preserveNullAndEmptyArrays: true
			    	}
			    },{
			        $lookup:
			        {
			            from: "resources",
			            localField: "resourceId",
			            foreignField: "children.id",
			            as: "resourceInfo"
			        }
			    },{
			    	$unwind: {
			    		path:'$resourceInfo',
			    		preserveNullAndEmptyArrays: true
			    	}
			    }
			    ,{
			        $project: {
			        	title: { $ifNull: [ "$title", "$userInfo.name" ] },
			            userID: 1,
			            resourceId: 1,
			            //room: 1,
				        start:{ 
			            	$cond:{	            		
			            		if: {$eq:[{ $hour: "$start" }, 0]},
			            		then: { $dateToString: { format: "%Y-%m-%d", date:  { "$add": [ "$start", 7 * 60 * 60 * 1000 ] } } },
			            		else: { $dateToString: { format: "%Y-%m-%dT%H:%M:%S", date:  { "$add": [ "$start", 7 * 60 * 60 * 1000 ] } } }	
			            	}
			        	},
			            end: { $dateToString: { format: "%Y-%m-%dT%H:%M:%S", date:  { "$add": [ "$end", 7 * 60 * 60 * 1000 ] }} },
			            createAt: 1,
			            updateAt: 1,
			            modifiedBy: { $ifNull: [ "$modifiedBy", "" ] },
			            status: 1, 
			            resourceName: {
			            	$map: {
			            		input:{
			            			$filter: {
					            		input: "$resourceInfo.children",
					            		as: "child",
					            		cond:{	            			
					            			$eq:["$$child.id","$resourceId"]
					            			
					            		}
					            	}

			            		},
			            		as: "room",
			            		in: "$$room.title"
			            	}
					            	
			            }          
			        }
		    	},{
			    	$unwind: {
			    		path:'$resourceName',
			    		preserveNullAndEmptyArrays: true
			    	}
			    }
		    	
			]
		).toArray(function (err, docs){

				console.log(docs.length);
				console.log(docs);
				// db.close();
				res.json(docs)
		});
	});

	app.put('/main/deleteEvent/:id', function (req, res) {
		var id = req.params.id;
		var body = req.body;
		var userID = body[0];
		var eventInfo = body[1];
		ms = 15 * 60 * 1000; // 15 min to milliseconds

		start = new Date(moment.tz(eventInfo.start,"Asia/Bangkok"));		
		end = new Date(moment.tz(eventInfo.end,"Asia/Bangkok"));	
		now = new Date(moment.tz(new Date(),"Asia/Bangkok"))		
		
		ms = 15 * 60 * 1000;

		db.users.findOne({
			id:userID
		},function(err,doc){
			if (err){
				// throw new Error('No record found');
				res.json("NoUser");
			}else if(doc == null || doc == ""){
				res.json("NoUser");
			}else{

				if ((userID == eventInfo.userID) && (now.getTime() < start.getTime())){
					var status = 1;
					
					db.events.findAndModify({query: {_id: mongojs.ObjectId(id)}, 
						update: {$set: {status: status , updateAt: new Date(), modifiedBy: userID}},
						new: true}, function (err, doc) {
							console.log("Delete event by: ", userID );
							res.json("OK");	
					});
				}else if (((userID != "") && (userID != eventInfo.userID)) && ( (now.getTime() - start.getTime() > ms) && (now.getTime() < end.getTime()) ) ) { // ((userID != eventInfo.userID) && ((now.getFullYear() == start.getFullYear()) && (now.getMonth() == start.getMonth()) && (now.getDate() == start.getDate()) && ((now.getHours() >= start.getHours()) && (now.getHours() < end.getHours()) ) && (now.getMinutes() > start.getMinutes()) ) )
					var status = 1;
					
					db.events.findAndModify({query: {_id: mongojs.ObjectId(id)}, 
						update: {$set: {status: status , updateAt: new Date(), modifiedBy: userID}},
						new: true}, function (err, doc) {
							console.log("Delete event by: ", userID );
							res.json("OK");	
					});
				}else{
					res.json("No");
				}
			}
		})		
	});

	// ============ end of main page  ==============

	// ============ begin of check id page ==============
	app.get('/checkid', function (req,res){
		// res.render('home.html');
		res.sendFile('checkID.html',{root : __dirname + '/app'});
	});

	app.get('/checkid/test', function (req,res){
		
		// res.sendFile('home.html',{root : __dirname + '/roombooking/main'});
		res.json("checkid test is ok!!");
	});

	// ============ end of check id page  ==============


	// ============ begin of find empty rooms page ==============

	app.get('/findemptyroom', function (req,res){
		
		res.sendFile('findEmptyRoom.html',{root : __dirname + '/app'});
	});			

	app.get('/findemptyroom/refresh/:text', function (req,res){

		var text= req.params.text;
		var arr = text.split(",");

		// assume room from DB
		// var rooms = ["ubuntu","cent-OS","fedora","solaris","debian"]
		
		var hours = 3;	
		var ms = 60*60*1000;

		var getRoomName = [];
		var emptyRoom = [];
		var getEmptyRoom = [];				

		var i = 0;
		
		var startTime = new Date(moment.tz(new Date(arr[0]),"Asia/Bangkok"));				
		var	endTime = new Date(moment.tz(new Date(arr[1]),"Asia/Bangkok"));
		
 		var refStart = new Date(moment.tz(new Date(arr[0]),"Asia/Bangkok"));
 	    var endholiday = refStart.setTime(refStart.getDate() + 1);
 		
 		var chkRoomData = arr[2];

		console.log(text);
		db.events.aggregate(
			[
				{ $match: 
					{$or:[
						{$and:[
								{status: 0},
								{$or:[
										{$and:[
												{start: {$lte: startTime}},
												{end: {$gte: endTime}}
											]
										},
										{start: {$gte: startTime,$lt: endTime}},
										{end: {$gt: startTime,$lte: endTime}}
									]
								}
							]
						},
						{$and:[
								{status:2},		            		
				            	{start: {$gte: startTime,$lte: endTime}},
							]
						}
					]
				} 
				},{
			        $lookup:
			        {
			            from: "resources",
			            localField: "resourceId",
			            foreignField: "children.id",
			            as: "resourceInfo"
			        }
			    },{
			    	$unwind: {
			    		path:'$resourceInfo',
			    		preserveNullAndEmptyArrays: true
			    	}
			    }
			    ,{
			        $project: {	
			        	_id: 0,		        	
			            resourceName: {
			            	$map: {
			            		input:{
			            			$filter: {
					            		input: "$resourceInfo.children",
					            		as: "child",
					            		cond:{	            			
					            			$eq:["$$child.id","$resourceId"]
					            			
					            		}
					            	}

			            		},
			            		as: "room",
			            		in: "$$room.title"
			            	}
					            	
			            }          
			        }
		    	},{
			    	$unwind: {
			    		path:'$resourceName',
			    		preserveNullAndEmptyArrays: true
			    	}
			    }
		    ]
		).toArray(function (err, docs){
			
			getRoomName.splice(0,getRoomName.length);	
			emptyRoom.splice(0,emptyRoom.length);

			docs.forEach(function(doc){
				getRoomName.push(doc.resourceName);
			});		
			

			if(chkRoomData == 0){
				rooms.splice(0,rooms.length);				
				getResources(function(response){
					rooms = response.rooms;
					tutorTitle = response.tutorTitle;

					getEmptyRoom = tutorTitle.diff(getRoomName);

					emptyRoom = compare2Array(rooms,getEmptyRoom);

					console.log(emptyRoom);
					res.json(emptyRoom);
							
				});				
						
			}else{
				
				getEmptyRoom = tutorTitle.diff(getRoomName);
				
				emptyRoom = compare2Array(rooms,getEmptyRoom);

				console.log(emptyRoom);
				res.json(emptyRoom);
		}

		});
	});	
	// ============ end of find empty rooms page  ==============

	// ============ begin of student authentication page ==============
	app.get('/studentauth', function (req,res){
		// res.render('home.html');
		res.sendFile('studentAuth.html',{root : __dirname + '/app'});
	});

	app.get('/studentauth/submit', function (req,res){
		// res.render('home.html');
		res.redirect('/booking')
	});
	// ============ end of student authentication  ==============

	// ============ begin of booking page ==============
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

	// ============ end of booking page  ==============


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
