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

    $urlRouterProvider.otherwise('/dashboard');

    /** @define states */
    $stateProvider
     /** Login state */
        .state('login', {
            url: '/login',
            views: {
                home: {
                    templateUrl: 'templates/login.html',
                    controller: 'loginCtrl'
                }
            },
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn //skips login
            }
        })
    /** homes nested states */
   /**dasBoard~state */
        .state('dashboard',{
            url:'/dashboard',
            views: {
                nav: {
                    templateUrl: 'templates/home.html'
                },
                home: {
                    templateUrl: 'templates/dashboard.html',
                    controller: 'dashboardCtrl'
                }
            },
            resolve: {
                      loginRequired: loginRequired
                    }
        })

});//end of config
