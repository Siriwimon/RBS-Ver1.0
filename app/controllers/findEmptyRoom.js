app.controller("findRoomCtrl",['$scope','$http','$compile','$filter','$timeout','$uibModal','$log',function($scope,$http,$compile,$filter,$timeout) {
	// body...

	// ==== initial date & time setting ===
    
	var initTime = new Date();
		initTime.setMinutes(0);
		initTime.setSeconds(0);
	$scope.startTime = initTime;
	$scope.endTime = initTime;	

	var minTime = new Date();
		minTime.setHours(8);
		minTime.setMinutes(0);
	$scope.min = minTime;

	var maxTime = new Date();
		maxTime.setHours(18);
		maxTime.setMinutes(0);
	$scope.max = maxTime;

	var initDate = new Date();
	// $scope.date = $filter('date')(initDate, "dd.MM.yyyy"); 
	$scope.date = "";
	var state = 0;

	// $scope.emptyRooms = [];

	var maxDate = new Date();
	maxDate.setDate((new Date()).getDate() + 13);
	
		
	//===============================

	// === control date & time selecting ===

	$scope.open = function(){
    	$scope.popup.opened = true;
    };

    $scope.popup = {
    	opened: false
  	};

  	$scope.dateOptions = {
    	dateDisabled: disabled,
    	formatYear: 'yy',
    	maxDate: maxDate,
    	minDate: new Date(),
    	startingDay: 1
  	};

  	function disabled(data) {
    	var date = data.date,
      	mode = data.mode;
    	return mode === 'day' && (date.getDay() === 0 );
  	}

	// $scope.open = function($event) {
	// 	$event.preventDefault();
	// 	$event.stopPropagation();

	// 	$scope.opened = true;
		
	// };  

	$scope.dateChange = function(){
		state = 1;
		checkDate = $scope.date;
		console.log(checkDate);
	}

	$scope.ctrlStartTime = function(){
		
		
		if ($scope.endTime != ""){	        
			if (($scope.endTime.getHours() - $scope.startTime.getHours()) >= 3){
				limitEndTime = new Date($scope.startTime);
				limitEndTime.setHours(limitEndTime.getHours() + 3);
				$scope.endTime = limitEndTime;
				
				if ($scope.endTime.getTime() > $scope.max.getTime()){
					$scope.endTime = $scope.max;
									
				}
				
			}				
			
			if ($scope.startTime.getTime() == $scope.endTime.getTime()){
				limitEndTime = new Date($scope.endTime);
				limitEndTime.setHours(limitEndTime.getHours() + 1);
				$scope.endTime = limitEndTime;
				

				if ($scope.endTime.getTime() > $scope.max.getTime()){
					$scope.endTime = $scope.max;
					limitStartTime = new Date($scope.endTime);
					limitStartTime.setHours(limitStartTime.getHours() - 1);
					$scope.startTime = limitStartTime;	
							
				}

				// if ($scope.)
			}			

		} else {
			if ($scope.startTime.getHours() <= 17){				
				$scope.startTime = initTime;
				refStartTime = $scope.startTime;
				endTime = new Date(refStartTime);
				endTime.setHours(endTime.getHours() + 1);			
				$scope.endTime = endTime;
				

			} else {		
				setStartTime = $scope.max;		
				$scope.startTime = setStartTime.setHours(setStartTime.getHours() - 1);
				$scope.endTime = $scope.max;
				
			}
			
		}

		
	};



	$scope.ctrlEndTime = function(){
		// $scope.endTime = initTime;
		if ($scope.startTime != ""){		
			
			if (($scope.endTime.getHours() - $scope.startTime.getHours()) >= 3){
				limitStartTime = new Date($scope.endTime);
				limitStartTime.setHours(limitStartTime.getHours() - 3);
				$scope.startTime = limitStartTime;
				
				if ($scope.startTime.getTime() < $scope.min.getTime()){
					$scope.startTime = $scope.min;
					
				}
				
			}
			

			if ($scope.startTime.getTime() == $scope.endTime.getTime()){
				limitStartTime = new Date($scope.startTime);
				limitStartTime.setHours(limitStartTime.getHours() - 1);
				$scope.startTime = limitStartTime;
				

				if ($scope.startTime.getTime() < $scope.min.getTime()){
					$scope.startTime = $scope.min;	
					limitEndTime = new Date($scope.startTime);
					limitEndTime.setHours(limitEndTime.getHours() + 1 );
					$scope.endTime = limitEndTime;
					
				}
			}

			

		} else {
			if ($scope.endTime.getHours() >= 9){
				refEndTime = $scope.endTime;
				startTime = new Date(refEndTime);
				startTime.setHours(startTime.getHours() - 1);
				$scope.startTime = startTime;
				
			} else {
				setEndTime = $scope.min;	
				$$scope.endTime = setEndTime.setHours(setEndTime.getHours() + 1);
				$scope.start = $scope.min;
				
			}
		}		
		
		
	};	

	$scope.ctrlStartTime();
	$scope.ctrlEndTime();

	$scope.hstep = 1;
  	$scope.mstep = 15;
  	$scope.ismeridian = true;

	// =====================================

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
    
    roomData = 0;
    
	$scope.find = function(){
		
		var selectedDate;

		if ($scope.date != ""){
			date = new Date($scope.date)
			selectedDate = $filter('date')(date, "yyyy-MM-dd"); 
		}else{
			selectedDate = $filter('date')(initDate, "yyyy-MM-dd");
		}

		console.log($scope.date);

		var selectedEndTime = $filter('date')($scope.endTime, "HH:mm:ss");
			selectedEnd = selectedDate + 'T' + selectedEndTime;

		var selectedStartTime = $filter('date')($scope.startTime, "HH:mm:ss");
			selectedStart = selectedDate + 'T' + selectedStartTime;
		
		var timeRange = [selectedStart,selectedEnd,roomData];
		
		console.log(timeRange)
		$http.get('/findemptyroom/refresh/' + timeRange).then(successCallback,errorCallback);

		function successCallback(response){
			console.log("OK! main");
			$scope.emptyRooms = response.data;
			console.log($scope.emptyRooms);
			roomData = 1;
		};		

		function errorCallback(error){
			console.log(error);
		};
	}
	
    $scope.find();
  	
}]);