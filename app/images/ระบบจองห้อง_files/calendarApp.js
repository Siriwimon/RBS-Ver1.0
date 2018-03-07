var CalendarApp = angular.module('RBSCalapp',['ngRoute','ui.calendar','ui.bootstrap']);

CalendarApp.config(['$routeProvider',function($routeProvider){
$routeProvider.
	
	when('/main', {
		templateUrl:'index.html',
  	controller:'indexCtrl'
  	})

  
}])