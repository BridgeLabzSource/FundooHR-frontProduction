/*
 * FileName:calappdirective.js
 * CreatedBy: Prashant Praveen

 */
angular.module("mainApp").directive("showEngineers", function () {
    return {
        restrict: "E",
        scope : {
            data : '='
        },
        templateUrl: '../template/unmarkedEmp.html',
        link: function ($scope) {
            console.log('inside directive data ',$scope.src);
        }
    }

});
