app.controller("bookingCtrl",["$scope", "$http","$location","$window", function($scope,$http,$location,$window) {
	// body...
	$scope.project_title = "ระบบจองห้อง";
	$scope.rooms = ["Ubuntu", "Fedora", "Cent-OS","Solaris","Debian"];
	$scope.room;
	$scope.main = function(){
		$http.get('/booking').then(successCallback,errorCallback);

		function successCallback(response){
			console.log("OK! main");
			
		};		

		function errorCallback(error){
			console.log(error);
		};
	}

	$scope.mainroute = function(){
		$http.get('/booking/test').then(successCallback,errorCallback);

		function successCallback(response){
			console.log("OK! main");
			$scope.test = response.data;
			
		};		

		function errorCallback(error){
			console.log(error);
		};
	}


	$scope.submit = function(){
		$http.get('/booking/submit').then(successCallback,errorCallback);

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

	$scope.back = function(){
		$http.get('/booking/back').then(successCallback,errorCallback);

		function successCallback(response){
			console.log("OK! main");
			// $scope.test = response.data;
			// $location.path('/main');
			$window.location.href = '/main';
			
		};		

		function errorCallback(error){
			console.log(error);
		};
	}

	$scope.hstep = 1;
  	$scope.mstep = 15;
  	$scope.ismeridian = true;
  	$scope.changed = function () {
	    $log.log('Time changed to: ' + $scope.mytime);
	};

}]);