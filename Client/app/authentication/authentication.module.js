'use strict';

var authenticationApp = angular.module('authenticationApp',['ngCookies']);

authenticationApp.controller('authenticationController',['$scope','$rootScope','authenticationService','$http','$cookies',
function ($scope, $rootScope,authenticationService,$http,$cookies){

    authenticationService.ClearCredentials();


    $scope.signup = function(userObj){

        $scope.error='';
        //UI Validations
        if( $scope.user.password == '' )
        {
          $scope.error='Username can not be empty';
          return;
        }
        else if( $scope.user.confirm_password == '' )
        {
          $scope.error='Password can not be empty';
          return;
        }
        else if( $scope.user.password !== $scope.user.confirm_password )
        {
          $scope.error='Password and Confirm password is not same';
          alert( 'Password and Confirm password is not same.');
          return;
        }
        else{

          console.log(JSON.stringify(userObj));

          var obj = { 'username': userObj.username, 'password': userObj.password };

          authenticationService.signUp(obj)
          .then(
            function (success) {
                alert('Sign Up Regstration is successful');
                window.location.replace('#!/login');
            },
            function (error) {
                alert('Failed to register the user');
            });             
        }
    }

    $scope.reset = function(){
            $scope.user.username='';
            $scope.user.password = '';
            $scope.user.confirm_password = '';
    }

    $scope.ClearCredentials = function () {
      $rootScope.globals = {};
      $cookies.remove('globals');
      $http.defaults.headers.common.Authorization = 'Basic ';
  };

    $scope.login = function(userObj){

        $scope.error='';
        //UI Validations
        if( $scope.user.username == '' )
        {
          $scope.error='Username can not be empty';
          return;
        }
        else if( $scope.user.password == '' )
        {
          $scope.error='Password can not be empty';
          return;
        }
        else{
          authenticationService.SetCredentials(userObj);
          authenticationService.login(userObj)
          .then(
            function (success) {
                alert('Login is successful');
                window.location.replace('#!/mypets');
            },
            function (error) {
                alert('Login Failed.');
            });        
        }
    }

}]);

