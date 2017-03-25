/*
 * FileName:unmarkedEmp.js
 bind the controller with the module and inject the services
 */
angular.module('mainApp').controller('unmarkedEmp', function ($scope, $stateParams, $state, $http, localStorageService, restService) {
    console.log('hieee');
    var query = { timeStamp : $stateParams.timeStamp};
    console.log(query);
    restService.httpRequest('readUnmarkedAttendanceEmployee',
        query, "get").then(function (data) {
            console.log('res ',data);
        $scope.totalEmployee = data.data.totalEmployee;
        $scope.unmarkedNumber = data.data.unmarkedNumber;
        $scope.unmarkedData = data.data.umarkedEmployee;
    });
    // $scope.confirm = function () {
    //     var token = localStorage.getItem('satellizer_token');
    //     // $scope.today = new Date();
    //     var query = {
    //         timeStamp: timeStamp
    //     };
    //     var config = {
    //         "x-token": token
    //     };
    //     console.log("x-token");
    //
    //     restService.postRequest('sendEmailToUnmarkedEmployee',
    //         query, config).then(function (data) {
    //         if (data.data.status === 200) {
    //             $('#mymodal1').modal('show');
    //             $scope.message = "Sent Successfully!";
    //             console.log($scope.message);
    //         }
    //         else {
    //             $scope.message = "Cannot sent";
    //             console.log("hi" + $scope.message);
    //         }
    //
    //     });
    // }
    // $scope.cancel = function () {
    //     console.log("message cant sent");
    // }
    // $scope.cardItems = [];
    //
    // $scope.employees = function (employeeName, employeeStatus,
    //                              company, mobile, emailId) {
    //     var objAdded = {
    //         employeeName: employeeName,
    //         employeeStatus: employeeStatus,
    //         company: company,
    //         mobile: mobile,
    //         emailId: emailId,
    //         imageUrl: imageUrl
    //     };
    //     $scope.cardItems.push(objAdded);
    // };

});
