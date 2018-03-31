CalendarApp.controller("indexCtrl",['$scope','$http','$filter','$timeout','$log','$compile','$sce',function($scope,$http,$filter,$timeout,$log,$compile,$sce,uiCalendarConfig) {
	// body...
	$scope.project_title = "ระบบจองห้อง";
	var events = [];	
	var viewStart,viewEnd;	// for refresh after change

	$scope.uiConfig = {
	  	calendar:{
	  		schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
	  		// now: '2018-02-20',
	  		allDaySlot:true,
		    selectable: true,
		    selectHelper: true,
		    editable: false,
		    timeFormat: 'HH:mm',
		    height: "auto",
		    minTime: "08:00:00",
		    maxTime: "20:00:00",
		    aspectRatio: 1.8,
			scrollTime: '00:00', // undo default 6am scrollTime
			eventColor: '#a3b4c2',
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
		    	
		    	$scope.viewRender(viewStart,viewEnd);    	

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

	$scope.viewRender = function(start,end){

		viewTime = [start,end]
		events.splice(0,events.length);	

		$http.get('/main/render/' + viewTime).then(successCallback,errorCallback);
			
		function successCallback(response){
			
			data = response.data;
			
			events.push.apply(events,data);
			// console.log(events);
		};		

		function errorCallback(error){
			console.log(error);
		};
	}

	$scope.eventRender = function(event, element ,view){		
		//console.log(event)
		if(event.end){
			text = $sce.trustAsHtml(event.title  + '\nเวลา: '+ $filter('date')(event.start._i, "HH:mm") + '-' + $filter('date')(event.end._i, "HH:mm"))

			element.attr({'uib-tooltip': text,'uibtooltip-append-to-body': true}); //fix bug https://github.com/angular-ui/ui-calendar/issues/357
	        $compile(element)($scope);
  	    }else{
  	    	text = $sce.trustAsHtml(event.title);

			element.attr({'uib-tooltip': text,'uibtooltip-append-to-body': true}); //fix bug https://github.com/angular-ui/ui-calendar/issues/357
	        $compile(element)($scope);
  	    }
  		
	};

	$scope.eventClick = function(event, jsEvent, view){
		// console.log(event)
		if (event.end){ // && event.status == 0
			swal({
			  title: 'รายละเอียดการใช้ห้อง',
			  //text: "You won't be able to revert this!",
			  html: '<table id="table" border=0 width=100% align="center"> ' + 
			            '<tbody><tr bgcolor="#eff5f5">' +
			            	'<td align="left"> ผู้จอง </td>' +
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
			            '<tbody><tr>' +
				            '<td align="left"> ห้อง </td>' +
				            '<td> '+ event.resourceName + '</td>' +
				        '</tr></tbody>'+
			        '</table>',		  
			  type: '',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Delete it!'
			}).then(
			   function(result){
			   	swal.setDefaults({
			   	  
				  confirmButtonText: 'Comfirm &rarr;',
				  showCancelButton: true,
				  // progressSteps: ['1', '2', '3']
				})

				var steps = [
				  { 
				  	input: 'text',
				    title: 'รายละเอียดการใช้ห้อง',
					  //text: "You won't be able to revert this!",
					html: '<table id="table" border=0 width=100% align="center"> ' + 
				            '<tbody><tr bgcolor="#eff5f5">' +
				            	'<td align="left"> ผู้จอง </td>' +
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
				            '<tbody><tr>' +
				            	'<td align="left"> ห้อง </td>' +
				            	'<td> '+ event.resourceName + '</td>' +
				            '</tr></tbody>'+
				        '</table><br>'+
				        'กรุณากรอกรหัสนักศึกษาเพื่อยืนยันการลบข้อมูล',
					  
				  }
				  
				]

				swal.queue(steps).then(
					function(result) {
					  swal.resetDefaults()

					  if (result) {
					  	$scope.deleteEvent(result[0],event);				  	

					  }

					},function(dismiss){
				   		// handle dismiss ('cancel', 'overlay', 'esc' or 'timer')
				    } 
				)
			    
			   },function(dismiss){
			   		// handle dismiss ('cancel', 'overlay', 'esc' or 'timer')
			   }
			)
		}
	}
	
	console.log(events)

	$scope.deleteEvent = function(id,event){

		var thisEvent = {};
			thisEvent._id = event._id;
			thisEvent.start = event.start._i;
			thisEvent.end = event.end._i;
			thisEvent.userID = event.userID;

		var eventData = [id,thisEvent];

		$http.put('/main/deleteEvent/' + event._id,eventData).then(successCallback,errorCallback);
			
		function successCallback(response){
			
			data = response.data;
			console.log(data);
			
			if (data == "OK" ) {
			    swal({
			      title: 'สำเร็จ!',
			      type: 'success',
			      html:
			        'ลบรายการจองวันที่ ' + $filter('date')(event.start._i, "yyyy-MM-dd")+' เวลา' + $filter('date')(event.start._i, "HH:mm") + '-' + $filter('date')(event.end._i, "HH:mm")+
			        '<br> โดยผู้ใช้รหัส '+id +
			        '<br>เรียบร้อยแล้ว',
			      confirmButtonText: 'ตกลง'
			    })
			}else if( data == "NoUser" ){
				swal({
				  type: 'error',
				  title: 'ไม่อนุญาตให้ลบ',
				  text: 'ไม่พบข้อมูลผู้ใช้งาน กรุณาติดต่อผู้ดูแลระบบ',				  
				})
			}else{
			  	swal({
				  type: 'error',
				  title: 'ขออภัย',
				  text: 'ไม่สามารถลบการจองห้องได้ กรุณาติดต่อผู้ดูแลระบบ',				  
				})
			}

			
		};		

		function errorCallback(error){
			console.log(error);
			swal({
			  type: 'error',
			  title: 'พบข้อผิดพลาด',
			  text: 'ไม่สามารถลบการจองห้องได้ กรุณาติดต่อผู้ดูแลระบบ',				  
			})
		};		
	}
	
	//$scope.renderEvents();
	$scope.eventSources = [events];

	
}]);