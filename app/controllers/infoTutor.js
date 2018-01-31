app.controller("infoTutorCtrl",["$scope", "$http", function($scope,$http) {
	// body...
	$scope.project_title = "ระบบจองห้อง";
	$scope.title = "ข้อมูลห้อง";

	$scope.img_path = ["images/infotutor_1.jpg","images/infotutor_2.jpg","images/infotutor_3.jpg"]

	$scope.details = [
		{
			room_id: 1,
			name: "ubuntu",
			plug_yes: true,
			plug_no: false,
			desktop_yes: true,
			desktop_no: false,
			board_yes: true,
			board_no: false,
			air_conditioner_yes: true,
			air_conditioner_no: false,
			people: "9-12"
		},{
			room_id: 2,
			name: "fedora",
			plug_yes: true,
			plug_no: false,
			desktop_yes: true,
			desktop_no: false,
			board_yes: true,
			board_no: false,
			air_conditioner_yes: true,
			air_conditioner_no: false,
			people: "9-12"
		},{
			room_id: 3,
			name: "cent-os",
			plug_yes: true,
			plug_no: false,
			desktop_yes: true,
			desktop_no: false,
			board_yes: true,
			board_no: false,
			air_conditioner_yes: true,
			air_conditioner_no: false,
			people: "6-8"
		},{
			room_id: 4,
			name: "solaris",
			plug_yes: true,
			plug_no: false,
			desktop_yes: true,
			desktop_no: false,
			board_yes: true,
			board_no: false,
			air_conditioner_yes: false,
			air_conditioner_no: true,
			people: "1-5"
		},{
			room_id: 5,
			name: "debian",
			plug_yes: true,
			plug_no: false,
			desktop_yes: true,
			desktop_no: false,
			board_yes: true,
			board_no: false,
			air_conditioner_yes: true,
			air_conditioner_no: false,
			people: "6-8"
		}
	]

	

	$scope.main = function(){
		$http.get('/infotutor').then(successCallback,errorCallback);

		function successCallback(response){
			console.log("OK! main");
			
		};		

		function errorCallback(error){
			console.log(error);
		};
	}

	$scope.mainroute = function(){
		$http.get('/infotutor/test').then(successCallback,errorCallback);

		function successCallback(response){
			console.log("OK! main");
			$scope.test = response.data;
			
		};		

		function errorCallback(error){
			console.log(error);
		};
	}


	
}]);