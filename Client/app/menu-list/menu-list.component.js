'use strict';

angular.module('menuList')
       .component('menuList', {
                templateUrl:'menu-list/menu-list.template.html',
                controller: function menuListController($http){
                        var self = this;
                        //List of items in navigation menus
                        this.menus = [{ id: 1, place: 'Login'},{ id: 2, place: 'Sign Up'}];
                }


});