'use strict';

angular.module('authenticationApp')
       .component('authenticationApp', {
                templateUrl:'authentication/user-list.template.html',
                controller: function authenticationController($http){
                        var self = this;
                        //List of items in navigation menus
                        this.menus = [{ id: 1, place: 'Login'},{ id: 2, place: 'Sign Up'}];
                }

});