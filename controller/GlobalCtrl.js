/*
 * FileName:GlobalCtrl.js
 *bind the controller with the module and inject the services
*/
angular.module('mainApp').controller('GlobalCtrl', function($scope)
{
    // Event listener for state change.
    $scope.$on('$stateChangeStart', function(event, toState, toParams) {
    $scope.bodyClass = toState.name + '-page';
    });
});
