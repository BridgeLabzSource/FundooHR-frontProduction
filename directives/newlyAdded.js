/*
 * FileName:calappdirective.js
 * CreatedBy: Prashant Praveen

 */
angular.module("mainApp").directive("emailAlert", function () {
    return {
        restrict: "EA",
        scope : {
            src : '='
        },
        template: '',
        controller: function (scope, restService, ngDialog, $timeout) {
            console.log('new added employees - ',scope.src);
        }
    }
});
