var Chartsapp = angular.module('Chartsapp',['ngRoute','amChartsDirective']); //, 'ps.inputTime', 'sy.bootstrap.timepicker', 'timepicker-tpl','template/syTimepicker/popup.html','ui.bootstrap.position'

Chartsapp.config(['$routeProvider',function($routeProvider){
$routeProvider.
	
    when('/dashboard',{
      templateUrl: 'dashboard.html',
      controller: 'dashboardCtrl'
    })
   

  
}])