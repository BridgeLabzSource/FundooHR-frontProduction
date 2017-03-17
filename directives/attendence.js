angular.module('mainApp').directive("dropdown", function ($rootScope, $http, $mdDialog) {
    return {
        restrict: "E",
        templateUrl: "templates/dropdown.html",
        controller: "attendanceCtrl",
        scope: {
            selectedDay: '@selectedDay'
        },
        link: function (scope) {
            // console.log(scope.selectedDay, "directive");
        }
    };
});
