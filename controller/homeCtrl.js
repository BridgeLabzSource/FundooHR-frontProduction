angular.module('mainApp').controller('homeCtrl', function ($scope, $location, $stateParams, $state, $auth, toastr, localStorageService) {
    $scope.isAuth = function () {
        return $auth.isAuthenticated();
    };
    $scope.logout = function () {
        if (!$auth.isAuthenticated()) {
            return;
        }
        $auth.logout()
            .then(function () {
                toastr.info('You have been logged out');
                $state.go('login');
            }).catch(function (error) {
            toastr.error(error.data.message, error.status);
        });
    };
    $scope.today = new Date();
    $scope.userEmail = localStorageService.get('user');
    var name = $scope.userEmail.split('@');

    console.log(name);
    $scope.name = name[0];

    $scope.isActive = function (destination) {
      // console.log($location.path());
        return destination === $location.path();
    };
});
