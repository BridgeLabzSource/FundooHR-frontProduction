var mainApp = angular.module("mainApp", ['ui.router', 'ngMaterial', 'LocalStorageModule', 'satellizer', 'toastr', 'xeditable']);

mainApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $authProvider) {

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
        .state('dashboard', {
            url: '/dashboard',
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
        // .state('engineer', {
        //     url: '/engineer',
        //     views: {
        //         nav: {
        //             templateUrl: 'templates/home.html'
        //         },

        //     },
        //     resolve: {
        //         loginRequired: loginRequired
        //     }
        // })
        .state('engineer', {
            url: '/engineer',
            views: {
                nav: {
                    templateUrl: 'templates/home.html'
                },
                home: {
                    template: '<ui-view></ui-view>',
                }
            },
            resolve: {
                loginRequired: loginRequired
            }
          })
        .state('engineer.search', {
                    url: '/search',
                    templateUrl: 'templates/engineers.html',
                    controller: 'engineerMainCtrl',
                    resolve: {
                        loginRequired: loginRequired
                    }
                })
        .state('engineer.engineerData', {
                    url: '/:engineerId',
                    templateUrl: 'templates/engineer/engineer.html',
                    // controller: 'engineerMainCtrl',
                    resolve: {
                        loginRequired: loginRequired
                    }
                })

        .state('engineer.engineerData.attendance', {
            url: '/attendance',
            templateUrl: 'templates/engineer/calendar.html',
            resolve: {
                loginRequired: loginRequired
            }
        })
        // .state('details', {
        //     url: '/details/:engineerId',
        //     views: {
        //         nav: {
        //             templateUrl: 'templates/home.html'
        //         },
        //         home: {
        //             templateUrl: 'templates/engineer/engineer.html',
        //             controller: 'engineerCtrl'
        //         }
        //     }
        // })
        .state('engineer.personal', {
            url: '/personal',
            templateUrl: 'templates/engineer/personal.html',
            controller: 'personalCtrl',
            views:{
              "engNav":{
                templateUrl: 'templates/engineer/engineer.html',
                controller: 'engineerCtrl'
              }
            },
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('engineer.profile', {
            url: '/profile',
            views:{
              "engNav":{
                templateUrl: 'templates/engineer/engineer.html',
                controller: 'engineerCtrl'
              }
            },
            templateUrl: 'templates/engineer/profile.html',
            controller: 'profileCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('engineer.hrData', {
            url: '/HRData',
            views:{
              "engNav":{
                templateUrl: 'templates/engineer/engineer.html',
                controller: 'engineerCtrl'
              }
            },
            templateUrl: 'templates/engineer/hrData.html',
            controller: 'hrDataCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('engineer.bank', {
            url: '/bank',
            views:{
              "engNav":{
                templateUrl: 'templates/engineer/engineer.html',
                controller: 'engineerCtrl'
              }
            },
            templateUrl: 'templates/engineer/bank.html',
            controller: 'bankCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('engineer.tracking', {
            url: '/tracking',
            views:{
              "engNav":{
                templateUrl: 'templates/engineer/engineer.html',
                controller: 'engineerCtrl'
              }
            },
            templateUrl: 'templates/engineer/tracking.html',
            controller: 'trackingCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        /**engg~state */
        .state('attendance', {
            url: '/attendance',
            views: {
                nav: {
                    templateUrl: 'templates/home.html'
                },
                home: {
                    template: '<calender>hello</calender>'
                }
            },
            resolve: {
                loginRequired: loginRequired
            }
        });

}).run(function ($rootScope, $state) {
    $rootScope.$state = $state;
});
//end of config
