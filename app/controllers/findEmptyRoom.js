app.controller("findRoomCtrl",["$scope", "$http", function($scope,$http) {
	// body...
	$scope.project_title = "ระบบจองห้อง";
	$scope.main = function(){
		$http.get('/findemptyroom').then(successCallback,errorCallback);

		function successCallback(response){
			console.log("OK! main");
			
		};		

		function errorCallback(error){
			console.log(error);
		};
	}

	$scope.mainroute = function(){
		$http.get('/findemptyroom/test').then(successCallback,errorCallback);

		function successCallback(response){
			console.log("OK! main");
			$scope.test = response.data;
			
		};		

		function errorCallback(error){
			console.log(error);
		};
	}

	$scope.date = new Date();
  
	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened = true;
	};  

	$scope.hstep = 1;
  	$scope.mstep = 15;
  	$scope.ismeridian = true;
  	$scope.changed = function () {
	    $log.log('Time changed to: ' + $scope.mytime);
	};
}]);