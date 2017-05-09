/**
 * DashBoard controller
 *@define controller
 *@param {string} dashCtrl - parameter refers to the controller used by HTML element
 *@param {function} selfInvoked- dependencies are added in it
 */
angular.module('mainApp').controller('dashboardCtrl', function ($scope,restService,$location, ngDialog) {
    var dash_timeStamp = new Date().getTime();
    $scope.dashBoardData=hrDashData.dashBoardData;

    // dashboard initialization
    $scope.dashPage=function(){
    var dashBoard = new Date();
    $scope.previous = dashBoard.setDate(dashBoard.getDate() - 1);
    var query = {
        timeStamp: dash_timeStamp
    };
    // restService call for Dashboard data..
    var promise = restService.httpRequest('readDashboardData', query,"get");


    promise.then(function (data) {
        var dashData = data.data;
        $scope.dashData = dashData;
        console.log($scope.dashData);
    });
  };
    //splitting key by space
    $scope.split = function (key) {
        key = key.split(/(?=[A-Z])/).join(" ");
        return key.charAt(0).toUpperCase() + key.slice(1);
    };

    $scope.go = function () {
        $location.path('/attendance/fallout');
    };

    //Popup form appears on clicking add employee
    $scope.values = ['Email Address','Start Date','Hiring City', 'Coding Test At', 'Coding Test City', 'Stipend Ammount', 'Program Assigned', 'Tech Stack', 'Referred By',  'Company Assigned'];
    $scope.employee ={};
    $scope.addEmployee = function () {
        $scope.name = "pranali";
        ngDialog.open({
            template : 'addEmployee',
            className : 'ngdialog-theme-default',
            scope : $scope,
            overlay: true,
            width: '80%',
            showClose: true
        });
    };
    $scope.giveEmployee = function(employee){
        var temp = employee.replace(' ','');
        return temp;
    };
    $scope.createEmployee = function () {
        console.log($scope.employee);
    }
});
