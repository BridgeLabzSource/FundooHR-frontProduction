/**
 * Login controller
 *@define controller
 *@param {string} loginCtrl - parameter refers to the controller used by HTML element
 *@param {function} selfInvoked- dependencies are added in it
 */
angular.module('mainApp').controller('loginCtrl', function ($scope, $state, $auth, localStorageService) {

    /**email and password validation regex pattern*/
    $scope.email = hrDashData.email;
    $scope.pwd = hrDashData.pwd;
    console.log(hrDashData.pwd);

    /**dataloading icon*/
    $scope.dataLoading = false;

    /**
     *@method login- function to login
     */
    console.log("config::",hrDashData.config);
    $scope.login = function () {
        $scope.dataLoading = true;
        $("#pwd-label").css("color", "#3B5372");
        $("#password").css("borderColor", "#3B5372");
        localStorageService.set('user', $scope.user.emailId);
        $auth.login($scope.user, hrDashData.config) //satelizer service method call
            .then(function (data) {
                if (data.status == 200) {
                    localStorageService.set("token", data.data);//response data is stored in localStorageService
                    console.log("data_print" + data.data.emailId)
                    console.log("You have successfully signed in!")
                    $state.go('home.dashboard');
                    console.log('data ', data);
                }
                else {
                    $scope.dataLoading = false;
                    $("#pwd-label").css("color", "rgba(236, 13, 13, 1)");
                    $("#password").css("borderColor", "rgba(236, 13, 13, 1)");
                    $scope.error = "Invalid Password or Email Id";
                    toastr.error(error.data.message, error.status);
                    $state.go('login');

                }

            })
            .catch(function (error) {
                $scope.dataLoading = false;
                $("#pwd-label").css("color", "rgba(236, 13, 13, 1)");
                $("#password").css("borderColor", "rgba(236, 13, 13, 1)");
                $scope.error = "Invalid Password or Email Id";
                // toastr.error(error.data.message, error.status);
            });
    };

});//end of controller
