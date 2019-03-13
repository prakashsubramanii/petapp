'use strict';

var petsApp = angular.module('petsApp',['ngRoute','menuList','petList','petDetail','authenticationApp','ui.bootstrap','ngCookies','angularUtils.directives.dirPagination']);

petsApp.controller('petsController', function petsController($scope){

    $scope.name='the world';

});

// petsApp.run(function($rootScope, $location, $cookies, $http) {
//     // keep user logged in after page refresh
//            $rootScope.globals = $cookies.get('globals') || {};
//            if ($rootScope.globals.currentUser) {
//                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; 
//            }
    
//            $rootScope.$on('$locationChangeStart', function (event, next, current) {
//                // redirect to login page if not logged in
//                if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
//                    $location.path('/login');
//                }
//            });
//       });
