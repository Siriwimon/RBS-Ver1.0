app.controller("checkidCtrl",["$scope", "$http", function($scope,$http) {
	// body...
	$scope.project_title = "ระบบจองห้อง";
	$scope.main = function(){
		$http.get('/checkid').then(successCallback,errorCallback);

		function successCallback(response){
			console.log("OK! main");
			
		};		

		function errorCallback(error){
			console.log(error);
		};
	}

	$scope.mainroute = function(){
		$http.get('/checkid/test').then(successCallback,errorCallback);

		function successCallback(response){
			console.log("OK! main");
			$scope.test = response.data;
			
		};		

		function errorCallback(error){
			console.log(error);
		};
	}


	$scope.submit = function(){
		$http.get('/checkid/submit').then(successCallback,errorCallback);

		function successCallback(response){
			console.log("OK! main");
			$scope.test = response.data;
			
		};		

		function errorCallback(error){
			console.log(error);
		};
	}
}]);