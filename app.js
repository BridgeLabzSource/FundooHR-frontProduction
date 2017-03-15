var mainApp = angular.module("mainApp", ['ui.router', 'ngMaterial','LocalStorageModule','satellizer','toastr']);

mainApp.config( function ($stateProvider, $urlRouterProvider, $httpProvider, $authProvider) {

    var skipIfLoggedIn = ['$q', '$auth', function ($q, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.reject();
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }];

    var loginRequired = ['$q', '$location', '$auth', function ($q, $location, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.resolve();
        } else {
            $location.path('/login');
        }
        return deferred.promise;
    }];

    $urlRouterProvider.otherwise('/dash');

    /** @define states */
    $stateProvider
     /** Login state */
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn //skips login
            }
        })
    /** Logout state */
        .state('logout', {
            url: '/logout',
            template: null,
            controller: 'LogoutCtrl'
        })
   /** Home state */
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl',
            resolve: {
              loginRequired: loginRequired //loginRequired function will chek for token
              }
        })
    /** homes nested states */
   /**dasBoard~state */
        .state('home.dashboard',{
            url:'dash',
            templateUrl: 'templates/dashboard.html',
            controller: 'dashboardCtrl',
            resolve: {
                      loginRequired: loginRequired
                    }
        })

});//end of config
