var CalendarApp = angular.module('RBSCalapp',['ngRoute','ui.calendar']);

CalendarApp.config(['$routeProvider',function($routeProvider){
$routeProvider.
	// when('/', {
	// 	template:'index.html',
	// 	controller:'indexCtrl'
	// }).
	when('/main', {
		templateUrl:'index.html',
  		controller:'indexCtrl'
  	})
  // 	when('/', {
		// templateUrl:'index.html',
  // 		controller:'indexCtrl'
  // 	})
  	// .when('/checkid',{
  	// 	templateUrl: 'checkID.html',
  	// 	controller: 'checkidCtrl'
  	// })
  
}])