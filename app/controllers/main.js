CalendarApp.controller("indexCtrl",['$scope','$http','$filter','$timeout','$log','$compile','$sce',function($scope,$http,$filter,$timeout,$log,$compile,$sce,uiCalendarConfig) {
	// body...
	$scope.project_title = "ระบบจองห้อง";
	var events = [];

	// events = [
	// 	{ id: '1', resourceId: 't1', start: '2018-02-20T10:00:00', end: '2018-02-20T12:00:00', title: 'event 1' },
	// 	{ id: '2', resourceId: 't2', start: '2018-02-20T11:00:00', end: '2018-02-20T13:00:00', title: 'event 2' },
	// 	{ id: '3', resourceId: 't3', start: '2018-02-20T09:00:00', end: '2018-02-20T12:00:00', title: 'event 3' },
	// 	{ id: '4', resourceId: 't4', start: '2018-02-20T15:00:00', end: '2018-02-20T17:00:00', title: 'event 4' },
	// 	{ id: '5', resourceId: 't5', start: '2018-02-20T13:30:00', end: '2018-02-20T15:30:00', title: 'event 5' },
	// 	{ id: '6', resourceId: 'r1', start: '2018-02-20T09:30:00', end: '2018-02-20T12:00:00', title: 'event 6' },
	// 	{ id: '7', resourceId: 'u1', start: '2018-02-20T10:30:00', end: '2018-02-20T13:30:00', title: 'event 7' }
	// ]

	
		
	// $scope.events.push.apply($scope.events,events);
	// console.log($scope.events)

	$scope.uiConfig = {
	  	calendar:{
	  		schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
	  		// now: '2018-02-20',
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
				{ id: 't', title: 'ห้องติว', children: [
					{ id: 't1', title: 'ubuntu', eventColor: '#7F61BA'},
					{ id: 't2', title: 'cent-OS', eventColor: '#337AB7'},
					{ id: 't3', title: 'fedora', eventColor: '#5BC0DE'},
					{ id: 't4', title: 'solaris', eventColor: '#F0AD4E'},
					{ id: 't5', title: 'debian', eventColor: '#26B99A'}
				] },
				{ id: 'r', title: 'ห้องบริการบุคลากร/ น.ศ.โท-เอก', children:[
					{ id: 'r1', title: 'redhat', eventColor:'#DA534F'}
				] },				
				{ id: 'u', title: 'ห้องบริการเพื่อการเรียนรู้', children: [
					{ id: 'u1', title: 'linux', eventColor:'#F27E40'}
					
				] }
				
			],

			viewRender: function(view, element) {
		    	   	
		    	viewStart = $filter('date')(view.intervalStart._d, "yyyy-MM-dd");
	    		viewEnd = $filter('date')(view.intervalEnd._d, "yyyy-MM-dd");    		
		    	
		    	renderEvents(viewStart,viewEnd);    	

	        },
			eventRender: function(event, element, view){
	    		$scope.eventRender(event, element, view);
	    	},
			eventClick: function(event, jsEvent, view){
	    		$scope.eventClick(event,jsEvent,view)
	    	}
		  
		}
			
  	};

  	// $scope.eventSources = [events];



	var main = function(){
		$http.get('/').then(successCallback,errorCallback);
		
		function successCallback(response){
			$scope.test = response;
			console.log($scope.test);
			
		};		

		function errorCallback(error){
			console.log(error);
		};
	}	

	var renderEvents = function(start,end){

		viewTime = [start,end]
		events.splice(0,events.length);	

		$http.get('/main/render/' + viewTime).then(successCallback,errorCallback);
			
		function successCallback(response){
			
			data = response.data;
			
			events.push.apply(events,data);
			
		};		

		function errorCallback(error){
			console.log(error);
		};
	}

	$scope.eventRender = function(event, element ,view){		
		// console.log("eventRender")
		text = $sce.trustAsHtml('ผู้จอง: '+ event.title  + '\nเวลา: '+ $filter('date')(event.start._i, "HH:mm") + '-' + $filter('date')(event.end._i, "HH:mm"))

		element.attr({'uib-tooltip': text,'uibtooltip-append-to-body': true}); //fix bug https://github.com/angular-ui/ui-calendar/issues/357
        $compile(element)($scope);
  			
  		
	};

	$scope.eventClick = function(event, jsEvent, view){
		swal({
		  title: 'รายละเอียดการใช้ห้อง',
		  //text: "You won't be able to revert this!",
		  html: '<table id="table" border=0 width=100% align="center"> ' + 
		            '<tbody><tr bgcolor="#eff5f5">' +
		            	'<td align="left"> รหัสนักศึกษา </td>' +
		            	'<td> '+ event.title + '</td>' +
		            '</tr></tbody>'+
		            '<tbody><tr>' +
		            	'<td align="left"> วันที่จอง </td>' +
		            	'<td> '+ $filter('date')(event.start._i, "yyyy-MM-dd") + '</td>' +
		            '</tr></tbody>'+
		            '<tbody><tr bgcolor="#eff5f5">' +
		            	'<td align="left"> เวลาที่จอง </td>' +
		            	'<td> '+ $filter('date')(event.start._i, "HH:mm") + '-' + $filter('date')(event.end._i, "HH:mm") + '</td>' +
		            '</tr></tbody>'+
		        '</table>',		  
		  type: '',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then(
		   function(result){
		       if (result) {
				    swal(
				      'Deleted!',
				      'Your file has been deleted.',
				      'success'
				    )
				  }
		   },function(dismiss){
		   		// handle dismiss ('cancel', 'overlay', 'esc' or 'timer')
		   }
		)
	}
	

	//renderEvents();
	console.log(events)
	
	//$scope.renderEvents();
	$scope.eventSources = [events];

	// $scope.eventSources = [$scope.events]
}]);