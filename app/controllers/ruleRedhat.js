app.controller("rulesRedhatCtrl",["$scope", "$http", function($scope,$http) {
	// body...
	$scope.project_title = "ระบบจองห้อง";
	$scope.title = "ระเบียบการใช้ห้อง";

	$scope.rules = {
		room : "redhat",
		descriptions: [
			{
				rule_id: 1,
				rule: "ห้ามจองเกิน 3 ชั่วโมงต่อ 1 ครั้ง และห้ามจองล่วงหน้าติดต่อกันเว้นแต่ไม่มีผู้จองต่อ",
				img_path:"images/tutor_rule1.png"
			},{
				rule_id: 2,
				rule: "ห้ามนำอาหารและเครื่องดื่ม เข้าไปรับประทานในห้อง ",
				img_path:"images/tutor_rule2.png"
			},{
				rule_id: 3,
				rule: "ห้ามวางของไว้ในห้องติวโดยไม่มีใครดูแล หากเกิดการสูญหาย เจ้าหน้าที่ศูนย์คอมพิวเตอร์จะไม่รับผิดชอบความเสียหายที่เกิดขึ้น",
				img_path:"images/tutor_rule3.png"
			},{
				rule_id: 4,
				rule: "ห้ามล็อคห้องติว หากพบว่ามีการจงใจล็อคห้อง เจ้าหน้าที่จะตัดสิทธิ์การจอง",
				img_path:"images/tutor_rule4"
			}
		],
		create_at: "2017-12-11T21:36:00+07:00" ,
		update_at: "2017-12-11T21:36:00+07:00"
	}
	console.log($scope.rules.descriptions[0])

	$scope.main = function(){
		$http.get('/rulesredhat').then(successCallback,errorCallback);

		function successCallback(response){
			console.log("OK! main");
			
		};		

		function errorCallback(error){
			console.log(error);
		};
	}

	$scope.mainroute = function(){
		$http.get('/rulesredhat/test').then(successCallback,errorCallback);

		function successCallback(response){
			console.log("OK! main");
			$scope.test = response.data;
			
		};		

		function errorCallback(error){
			console.log(error);
		};
	}


	
}]);