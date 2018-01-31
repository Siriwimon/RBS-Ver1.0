Chartsapp.controller("dashboardCtrl",["$scope", "$http","$location","$window", function($scope,$http,$location,$window) {
  // body...
  $scope.project_title = "ระบบจองห้อง";
  $scope.rooms = ["Ubuntu", "Fedora", "Cent-OS","Solaris","Debian"];
  $scope.room;
  $scope.main = function(){
    $http.get('/dashboard').then(successCallback,errorCallback);

    function successCallback(response){
      console.log("OK! main");
      
    };    

    function errorCallback(error){
      console.log(error);
    };
  }

  $scope.oneweek = [{
          room: "Ubuntu",
          times: 23,
          hours: 50,
          color: "#7F61BA"
      }, {
          room: "Fedora",
          times: 22,
          hours: 47,
          color: "#337AB7"
      }, {
          room: "Cent-OS",
          times: 19,
          hours: 42,
          color: "#5BC0DE"
      }, {
          room: "Solaris",
          times: 18,
          hours: 39,
          color: "#F0AD4E"
      }, {
          room: "Debian",
          times: 20,
          hours: 44,
          color: "#26B99A"
      }]

    $scope.oneyear = [{
          month: "January",
          ubuntu: 23,
          fedora: 50,
          centos: 42,
          solaris: 35,
          debian: 28
      }, {
          month: "Febuary",
          ubuntu: 51,
          fedora: 46,
          centos: 39,
          solaris: 35,
          debian: 31
      }, {
          month: "March",
          ubuntu: 49,
          fedora: 50,
          centos: 42,
          solaris: 38,
          debian: 29
      }, {
          month: "April",
          ubuntu: 37,
          fedora: 48,
          centos: 31,
          solaris: 26,
          debian: 27
      }, {
          month: "June",
          ubuntu: 31,
          fedora: 52,
          centos: 39,
          solaris: 31,
          debian: 22
      }, {
          month: "July",
          ubuntu: 23,
          fedora: 47,
          centos: 45,
          solaris: 32,
          debian: 28
      }, {
          month: "August",
          ubuntu: 51,
          fedora: 53,
          centos: 41,
          solaris: 36,
          debian: 34
      }, {
          month: "September",
          ubuntu: 49,
          fedora: 51,
          centos: 40,
          solaris: 33,
          debian: 29
      }, {
          month: "October",
          ubuntu: 52,
          fedora: 48,
          centos: 47,
          solaris: 28,
          debian: 18
      }, {
          month: "November",
          ubuntu: 45,
          fedora: 49,
          centos: 36,
          solaris: 32,
          debian: 25
      }, {
          month: "December",
          ubuntu: 27,
          fedora: 25,
          centos: 21,
          solaris: 20,
          debian: 19
      }]


  $scope.yearReport = {
    data: $scope.oneyear ,
    type: "serial",
    theme: 'light',
    legend: {
      useGraphSettings: true
    },    
    chartCursor: {
      cursorAlpha: 0,
      zoomable: false
    },
    categoryAxis: {
        gridPosition: "start",
        parseDates: false,
        axisAlpha: 0,
        fillAlpha: 0.05,
        fillColor: "#000000",
        gridAlpha: 0,
    },
    valueAxes: [{
        position: "top",
        axisAlpha: 0,
        dashLength: 5,
        gridCount: 10,
        position: "left",
        title: "Booking Times"
        // axisAlpha: 0,
        // title: "Million USD"
    }],
    categoryField: "month",
    // startDuration: 0.5,
    graphs: [{
        balloonText: "place taken by Ubuntu in [[category]]: [[value]]",
        bullet: "round",
        // hidden: true,
        title: "Ubuntu",
        valueField: "ubuntu",
        fillAlphas: 0
      },{
        balloonText: "place taken by Cent-OS in [[category]]: [[value]]",
        bullet: "round",
        // hidden: true,
        title: "Cent-OS",
        valueField: "centos",
        fillAlphas: 0
      },{
        balloonText: "place taken by Fedora in [[category]]: [[value]]",
        bullet: "round",
        // hidden: true,
        title: "Fedora",
        valueField: "fedora",
        fillAlphas: 0
      },{
        balloonText: "place taken by Solaris in [[category]]: [[value]]",
        bullet: "round",
        // hidden: true,
        title: "Solaris",
        valueField: "solaris",
        fillAlphas: 0
      },{
        balloonText: "place taken by Debian in [[category]]: [[value]]",
        bullet: "round",
        // hidden: true,
        title: "Debian",
        valueField: "debian",
        fillAlphas: 0
      }
    ]
  }

  $scope.monthReport = {
    data: $scope.oneweek ,
    type: "serial",
    theme: 'light',
    // startDuration: 1,
    categoryField: "room",
    // rotate: true,
    pathToImages: 'https://cdnjs.cloudflare.com/ajax/libs/amcharts/3.13.0/images/',
    legend: {
        enabled: true
    },
    chartScrollbar: {
        enabled: true,
    },
    categoryAxis: {
        gridPosition: "start",
        parseDates: false
    },
    valueAxes: [{
        position: "top",
        // axisAlpha: 0,
        // title: "Million USD"
    }],
    graphs: [{
        "id": "g1",
        type: "column",
        title: "Hours",
        valueField: "hours",
        fillAlphas: 1,
        lineAlpha: 0.1,
        // fillColorsField: "color",
        lineColor: "#26b99A"  
      },
    // },{
    //   "id": "g2",
    //     type: "column",
    //     title: "Expenses",
    //     valueField: "expenses",
    //     fillAlphas: 0.9,
    //     lineAlpha: 0.1,
    //     // lineColor: "#4B5F71"  
    //     fillColorsField: "color",
    //     patternField: "pattern",
    //     pattern: {
    //       url: "https://www.amcharts.com/lib/3/patterns/black/pattern1.png",
    //       width: 4,
    //       height: 4
    //     },
    // },
      {
        "id": "g2",
        type: "column",
        title: "Times",
        valueField: "times",
        fillAlphas: 1,
        lineAlpha: 0.1,
        lineColor: "#4B5F71"  
        // fillColorsField: "#4B5F71",
        // clustered: false,
        // showBalloon: false,
        // visibleInLegend: false        
    }]
  }

  $scope.departmentReport = {
    type: "pie",
    theme: "light",
    // titles: [ {
    //   text: "Visitors countries",
    //   size: 16
    // } ],
    data: [ {
      country: "United States",
      visits: 7252
    }, {
      country: "China",
      visits: 3882
    }, {
      country: "Japan",
      visits: 1809
    }, {
      country: "Germany",
      visits: 1322
    }, {
      country: "United Kingdom",
      visits: 1122
    }, {
      country: "France",
      visits: 414
    }, {
      country: "India",
      visits: 384
    }, {
      country: "Spain",
      visits: 211
    } ],
    valueField: "visits",
    titleField: "country",
    startEffect: "elastic",
    startDuration: 2,
    labelRadius: 15,
    innerRadius: "50%",
    depth3D: 10,
    balloonText: "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
    angle: 15,
    export: {
      enabled: false
    }
  } 

  $scope.levelReport = {
    data: [{
        "name": "John",
        "points": 25,
        "color": "#7F8DA9",
        "bullet": "https://www.amcharts.com/lib/images/faces/A04.png"
    }, {
        "name": "Damon",
        "points": 28,
        "color": "#FEC514",
        "bullet": "https://www.amcharts.com/lib/images/faces/C02.png"
    }, {
        "name": "Patrick",
        "points": 22,
        "color": "#DB4C3C",
        "bullet": "https://www.amcharts.com/lib/images/faces/D02.png"
    }, {
        "name": "Mark",
        "points": 18,
        "color": "#DAF0FD",
        "bullet": "https://www.amcharts.com/lib/images/faces/E01.png"
    }],
    valueAxes: [{        
        "axisAlpha": 0,
        "dashLength": 4,
        "position": "left"
    }],
    type: "serial",
    theme: 'light',
    // startDuration: 1,
    categoryField: "name",
    // rotate: true,
    
    categoryAxis: {
        gridPosition: "start",
        parseDates: false,
        inside: true,
    },
    valueAxes: [{
        position: "top",
        // axisAlpha: 0,
        // title: "Million USD"
    }],
    graphs: [{
        "id": "g1",
        type: "column",        
        valueField: "points",
        fillAlphas: 0.8,
        lineAlpha: 0,
        // fillColorsField: "color",
        bulletOffset: 10,
        bulletSize: 20,
        colorField: "color",
        cornerRadiusTop: 8,
        customBulletField: "bullet",  
      }],
      // marginTop: 0,
      // marginRight: 0,
      // marginLeft: 0,
      // marginBottom: 0,
      // autoMargins: false,
      // categoryField: "name",
      // categoryAxis: {
      //     axisAlpha: 0,
      //     gridAlpha: 0,
      //     // inside: true,
      //     tickLength: 0
      // }
  }
    
    
  



}]);