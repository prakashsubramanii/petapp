'use strict';

var menuList = angular.module('menuList',[]);

menuList.controller('menuListController', function($scope){
    $scope.navigate = function(){
        console.log(JSON.stringify($scope.menu));
    }
});