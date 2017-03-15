var mainApp = angular.module("mainApp", ['ui.router', 'ngMaterial', 'LocalStorageModule', 'satellizer', 'toastr']);

mainApp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $authProvider) {

    var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.reject();
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }];

    var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
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
        .state('home.dashboard', {
            url: 'dash',
            templateUrl: 'templates/dash.html',
            controller: 'dashCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('home.engineer', {
            url: 'engineer/:engineerId',
            templateUrl: 'templates/engineer.html',
            controller: 'engineerCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('home.engineer.attendance', {
            url: '/attendance',
            templateUrl: 'templates/attendance.html',
            controller: 'attendanceCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('home.engineer.personal', {
            url: '/personal',
            templateUrl: 'templates/personal.html',
            controller: 'personalCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('home.engineer.profile', {
            url: '/profile',
            templateUrl: 'templates/profile.html',
            controller: 'profileCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('home.engineer.hrData', {
            url: '/HRData',
            templateUrl: 'templates/hrData.html',
            controller: 'hrDataCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('home.engineer.bank', {
            url: '/bank',
            templateUrl: 'templates/bank.html',
            controller: 'bankCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('home.engineer.tracking', {
            url: '/tracking',
            templateUrl: 'templates/tracking.html',
            controller: 'trackingCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        });

}).run(function($rootScope, $state) {
      $rootScope.$state = $state;
    });
     //end of config
