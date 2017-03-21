/**
 * Personal controller
 *@define controller
 *@param {string} personalCtrl - parameter refers to the controller used by HTML element
 *@param {function} selfInvoked- dependencies are added in it
 */
angular.module('mainApp').controller('personalCtrl',function($scope, $rootScope, $state, $auth, $stateParams, restService) {
    console.log("Engineers Personal is calling !!");

    //Authentication Check
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    //Getting Id
    var engineerId = $stateParams.engineerId;
    $scope.profileId=engineerId;

    // GET restService Call
    var getconfig = {
        engineerId: engineerId
    };

    restService.httpRequest('readEmployeePersonalData', getconfig ,"get")
        .then(function(data) {
            console.log("employeeData", data.data.personalData);
            $scope.personalArray = data.data.personalData;
            $scope.personalArray.engineerId = engineerId;
            $rootScope.employeeArray = data.data.employeeData;
            $rootScope.profileId = engineerId;
        });


    //Editable Page
    $scope.saveTable = function() {
        //  console.log($scope.personalArray);

        //UPDATING DATA
        restService.httpRequest('updateEmployeePersonalData', $scope.personalArray,"put")
            .then(function(response) {
                //console.log("success");
                $state.reload();
            });
    };
});
