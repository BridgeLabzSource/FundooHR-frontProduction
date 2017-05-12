/**
 * DashBoard controller
 *@define controller
 *@param {string} dashCtrl - parameter refers to the controller used by HTML element
 *@param {function} selfInvoked- dependencies are added in it
 */
angular.module('mainApp').controller('dashboardCtrl', function ($scope, restService, $location, ngDialog) {
    var dash_timeStamp = new Date().getTime();

    $scope.dashBoardData = hrDashData.dashBoardData;

    // dashboard initialization
    $scope.dashPage = function () {
        var dashBoard = new Date();
        $scope.previous = dashBoard.setDate(dashBoard.getDate() - 1);
        var query = {
            timeStamp: dash_timeStamp
        };
        // restService call for Dashboard data..
        var promise = restService.httpRequest('readDashboardData', query, "get");
        promise.then(function (data) {
            var dashData = data.data;
            $scope.dashData = dashData.data;
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
    $scope.values = ['Email Address', 'Planned Start Date', 'Hiring City', 'Coding Test At', 'Coding Test City', 'Employee Stipend', 'Current Program Assignment', 'Fellowship Tech Assignment', 'Referred By', 'Current Contract Assignment'];
    $scope.employee = {};
    $scope.createEmployee = function () {
        $scope.employee = {};
        ngDialog.open({
            template: 'addEmployee',
            className: 'ngdialog-theme-default',
            scope: $scope,
            overlay: true,
            showClose: true
        });
    };
    $scope.giveEmployee = function (employee) {
        var temp = employee.replace(/ /g, '');
        return temp.charAt(0).toLowerCase() + temp.slice(1);
    };

    $scope.addEmployeeDetails = function () {
        ngDialog.close();
        var msg = '';
        $scope.color = 'blue';
        restService.httpRequest('sendInviteLink', $scope.employee, 'post').then(function (data) {
            console.log(data);
            if (data.data.status) {
                msg = data.data.message;
                ngDialog.open({
                    template: "<text style='color: #4cae4c;font-size: 16px; font-weight: 600'>" + msg + "</text>",
                    className: 'ngdialog-theme-default',
                    plain: true,
                    overlay: true,
                    width: '45%',
                    showClose: false
                });
            }
            else {
                if (data.data.status === false)
                    msg = data.data.message;
                else
                    msg = 'Cannot Submit Form! Please contact to Developers';
                ngDialog.open({
                    template: "<text style='color: red;font-size: 16px; font-weight: 600'>" + msg + "</text>",
                    className: 'ngdialog-theme-default',
                    plain: true,
                    overlay: true,
                    width: '45%',
                    showClose: false
                });
            }

        });
        $scope.employee = {};
    };

    $scope.shownewAdd = function (data) {
        $scope.data = data;
        ngDialog.open({
            template: 'shownewEmployee',
            className: 'ngdialog-theme-default',
            scope: $scope,
            overlay: true,
            showClose: true
        });
    };

    /* popover to show newly added employees */
    $(function () {
        $('[data-toggle="popover"]').popover();
    });

});
