/**
 * Profile controller
 *@define controller
 *@param {string} profileCtrl - parameter refers to the controller used by HTML element
 *@param {function} selfInvoked- dependencies are added in it
 */
angular.module('mainApp').controller('profileCtrl', function ($scope,$rootScope,$stateParams,restService){
  var query = {
      engineerId:$stateParams.engineerId
  };
  // restService call for Engineer Attendence data..
var promise = restService.httpRequest('readEmployeeProfileData', query,"get");
promise.then(function(data) {
    var dashData = data.data;
    $scope.dashData = dashData;
    $rootScope.empdetails = dashData.employeeData;
    $scope.profileEngArray = dashData.profileData;
});
});
