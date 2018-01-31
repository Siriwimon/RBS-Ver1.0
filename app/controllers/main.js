CalendarApp.controller("indexCtrl",['$scope','$http','$filter','$timeout','$log',function($scope,$http,$filter,$timeout,$log,uiCalendarConfig) {
	// body...
	$scope.project_title = "ระบบจองห้อง";
	$scope.events = [];

	events = [
		{ id: '1', resourceId: 'a1', start: '2017-11-07T10:00:00', end: '2017-10-07T12:00:00', title: 'event 1' },
		{ id: '2', resourceId: 'a2', start: '2017-11-07T11:00:00', end: '2017-10-07T13:00:00', title: 'event 2' },
		{ id: '3', resourceId: 'a3', start: '2017-11-07T09:00:00', end: '2017-10-07T12:00:00', title: 'event 3' },
		{ id: '4', resourceId: 'a4', start: '2017-11-07T15:00:00', end: '2017-10-07T17:00:00', title: 'event 4' },
		{ id: '5', resourceId: 'a5', start: '2017-11-07T13:30:00', end: '2017-10-07T15:30:00', title: 'event 5' },
		{ id: '6', resourceId: 'b1', start: '2017-11-07T09:30:00', end: '2017-10-07T12:00:00', title: 'event 6' },
		{ id: '7', resourceId: 'c1', start: '2017-11-07T10:30:00', end: '2017-10-07T13:30:00', title: 'event 7' }
	]

	
		
	$scope.events.push.apply($scope.events,events);
	console.log($scope.events)

	$scope.uiConfig = {
	  	calendar:{
	  		schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
	  		now: '2017-11-07',
		    selectable: true,
		    selectHelper: true,
		    editable: false,
		    timeFormat: 'HH:mm',
		    height: "auto",
		    minTime: "08:00:00",
		    maxTime: "20:00:00",
		    aspectRatio: 1.8,
			scrollTime: '00:00', // undo default 6am scrollTime
			header: {
				left: 'today prev,next',
				center: 'title',
				right: 'timelineDay,timelineThreeDays,agendaWeek,month,listWeek'
			},
			defaultView: 'timelineDay',
			views: {
				timelineThreeDays: {
					type: 'timeline',
					duration: { days: 3 }
				}
			},
			resourceAreaWidth: "29%",
			resourceLabelText: 'Rooms',
		    // events: $scope.events,
		    resources: [
				{ id: 'a', title: 'ห้องติว', children: [
					{ id: 'a1', title: 'ubuntu', eventColor: '#7F61BA'},
					{ id: 'a2', title: 'cent-OS', eventColor: '#337AB7'},
					{ id: 'a3', title: 'fedora', eventColor: '#5BC0DE'},
					{ id: 'a4', title: 'solaris', eventColor: '#F0AD4E'},
					{ id: 'a5', title: 'debian', eventColor: '#26B99A'}
				] },
				{ id: 'b', title: 'ห้องบริการบุคลากร/ น.ศ.โท-เอก', children:[
					{ id: 'b1', title: 'redhat', eventColor:'#DA534F'}
				] },				
				{ id: 'c', title: 'ห้องบริการเพื่อการเรียนรู้', children: [
					{ id: 'c1', title: 'linux', eventColor:'#F27E40'}
					
				] }
				
			]
			
		  
		}
			
  	};

  	$scope.eventSources = [events];



	$scope.main = function(){
		$http.get('/main').then(successCallback,errorCallback);

		function successCallback(response){
			console.log("OK! main");
			
		};		

		function errorCallback(error){
			console.log(error);
		};
	}

	$scope.mainroute = function(){
		$http.get('/main/test').then(successCallback,errorCallback);

		function successCallback(response){
			console.log("OK! main");
			$scope.test = response.data;
			
		};		

		function errorCallback(error){
			console.log(error);
		};
	}

	$scope.eventSources = [$scope.events]
}]);