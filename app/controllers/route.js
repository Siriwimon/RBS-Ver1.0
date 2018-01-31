var app = angular.module('RBSapp',['ngRoute', 'ngSanitize', 'ui.bootstrap']); //, 'ps.inputTime', 'sy.bootstrap.timepicker', 'timepicker-tpl','template/syTimepicker/popup.html','ui.bootstrap.position'

app.config(['$routeProvider',function($routeProvider){
$routeProvider.
	// when('/', {
	// 	template:'index.html',
	// 	controller:'indexCtrl'
	// }).
	// when('/main', {
	// 	templateUrl:'index.html',
 //  		controller:'indexCtrl'
 //  	})
 	
  	when('/checkid',{
  		templateUrl: 'checkID.html',
  		controller: 'checkidCtrl'
  	}).
  	when('/findemptyroom',{
  		templateUrl: 'findEmptyRoom.html',
  		controller: 'findRoomCtrl'
  	}).
  	when('/studentauth',{
  		templateUrl: 'studentAuth.html',
  		controller: 'studentAuthCtrl'
  	}).
  	when('/booking',{
  		templateUrl: 'booking.html',
  		controller: 'bookingCtrl'
  	}).
  	when('/rulestutor',{
  		templateUrl: 'rulesTutors.html',
  		controller: 'rulesTutorsCtrl'
  	}).
  	when('/rulesredhat',{
  		templateUrl: 'rulesRedhat.html',
  		controller: 'rulesRedhatCtrl'
  	}).
  	when('/ruleslinux',{
  		templateUrl: 'rulesLinux.html',
  		controller: 'rulesLinuxCtrl'
  	}).
    when('/infotutor',{
      templateUrl: 'infoTutor.html',
      controller: 'infoTutorCtrl'
    }).
    when('/inforedhat',{
      templateUrl: 'infoRedhat.html',
      controller: 'infoRedhatCtrl'
    }).
    when('/infolinux',{
      templateUrl: 'infoLinux.html',
      controller: 'infoLinuxCtrl'
    })

  
}])