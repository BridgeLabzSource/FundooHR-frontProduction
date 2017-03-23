/*
 * FileName:unmarkedEmp.js
 bind the controller with the module and inject the services
*/
    angular.module('mainApp').controller('unmarkedEmp', function($scope,
    $rootScope, $location, $stateParams, $state, $auth, $http,
    localStorageService, restService,$filter)
  {
      var token = localStorage.getItem('satellizer_token');
      // $scope.today = new Date();

      var timeStamp = $stateParams.timeStamp;
      $scope.clickDate=new Date(Number(timeStamp));
      var query = {
            timeStamp: timeStamp
    };
      var config={
         "x-token":token
    }
        restService.getRequest('readUnmarkedAttendanceEmployee',
        query,config).then(function(data)
    {
        $scope.totalEmployee = data.data.totalEmployee;
        $scope.unmarkedNumber = data.data.unmarkedNumber;
        $scope.display = "umarkedEmployee";
        $scope.items = data.data.umarkedEmployee;
        $scope.imageUrl=data.data.imageUrl;
        $scope.display = "umarkedEmployee";
    });
        $scope.confirm=function () {
        var token=localStorage.getItem('satellizer_token');
        // $scope.today = new Date();
        var query = {
                  timeStamp: timeStamp
   };
        var config = {
                 "x-token": token
 };
        console.log( "x-token");

       restService.postRequest('sendEmailToUnmarkedEmployee',
       query,config).then(function (data) {
       if (data.data.status === 200) {
           $('#mymodal1').modal('show');
           $scope.message = "Sent Successfully!";
           console.log($scope.message);
      }
      else  {
             $scope.message = "Cannot sent";
             console.log("hi"+$scope.message);
      }

   });
   }
            $scope.cancel = function() {
            console.log("message cant sent");
   }
            $scope.cardItems = [];

            $scope.employees = function(employeeName, employeeStatus,
             company, mobile, emailId) {
             var objAdded = {
            employeeName: employeeName,
            employeeStatus: employeeStatus,
            company: company,
            mobile: mobile,
            emailId: emailId,
            imageUrl:imageUrl
        };
            $scope.cardItems.push(objAdded);
    };

});
