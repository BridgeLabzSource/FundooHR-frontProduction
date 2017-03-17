angular.module('mainApp').controller('attendanceCtrl', function($scope, $rootScope, $stateParams, localStorageService, restService,$http,$mdDialog) {
    /** Here I am Fetching the token from the localStorage **/
    // var token = localStorageService.get("token").token;
    var dashBoard = new Date();
    $scope.previous = dashBoard.setDate(dashBoard.getDate() - 1);

    // restService call for Dashboard data..
    $scope.readData=function(timeStamp){
      var query = {
          timeStamp: timeStamp,
          engineerId:$stateParams.engineerId
      };
    var promise = restService.getRequest('readEmployeeMonthlyAttendance', query);
    promise.then(function(data) {
        var dashData = data.data;
        $scope.dashData = dashData;
        $rootScope.empdetails = dashData.employeeData;
        $rootScope.attendance = dashData.attendanceData;
        $scope.attendance = dashData.attendanceData;
    });
  };
    $rootScope.status = '  ';
    $rootScope.customFullscreen = false;

    //moment object to get date
    $scope.day = moment();
    $rootScope.attendanceData = [];

    $scope.markedStatus = {};
    $scope.incr = 0;

    $scope.checkAttend = function(day) {
        var todayDate = moment();
        //console.log(todayDate.isBefore(day.date), day.date, todayDate);
        if (todayDate.isBefore(day.date)) {
            day.enable = false;
            return "upcoming";
        } else if (day.isCurrentMonth) {
            if (day.status.markedStatus === "true") {
                $scope.markedStatus[day.number] = day.status.attendanceStatus;
                return "";
            } else {
                $scope.markedStatus[day.number] = "unmark";
                return "";
            }
        }
        //console.log($scope.markedStatus);
    };
    $scope.doAttendance = function(data, attendanceStatus) {
        var dataNumber = JSON.parse(data);
        var timeStamp =(new Date(dataNumber.date)).getTime();
            $mdDialog.show({
                parent: angular.element(document.querySelector('#popupContainer')),
                templateUrl: "templates/engineer/prompt.html",
                clickOutsideToClose: false,
                scope: $scope,
                preserveScope: true,
                disableParentScroll: false,
                controller: function($scope) {
                  $scope.show=(attendanceStatus === "Present"); //To show template on screen

                    $scope.save = function() {
                        item = {};
                        storeAttendence = {};
                        storeAttendence.timeStamp = timeStamp;
                        storeAttendence.engineerId = $stateParams.engineerId;
                        storeAttendence.attendanceStatus = attendanceStatus;
                        storeAttendence.markedStatus = "true";
                        storeAttendence.punchIn = (attendanceStatus === "Present"?getTime($scope.punchIn):"");
                        storeAttendence.punchOut = (attendanceStatus === "Present"?getTime($scope.punchOut):"");
                        storeAttendence.reason = (attendanceStatus !== "Present"?$scope.reason:"");
                        restService.postRequest("createEmployeeDayAttendance",storeAttendence).then(function (){
                          alert("success");
                        });
                        console.log(storeAttendence);
                        item[dataNumber.number] = storeAttendence;
                        $scope.markedStatus[dataNumber.number] = attendanceStatus;
                        $scope.close();
                    };
                    $scope.close = function() {
                        $mdDialog.hide();
                    };
                },
            });
    };
    function getTime(date) {
        var hour = date.getHours(),
            min = date.getMinutes();
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if (hour < 12) {

            return hour + ":" + min + " AM";
        } else if (hour == 12) {
            return hour + ":" + min + " PM";
        } else {
            return (hour - 12) + ":" + min + " PM";
        }
    }
});
