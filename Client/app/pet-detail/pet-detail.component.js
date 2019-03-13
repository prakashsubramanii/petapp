'use strict';

angular.module('petDetail')
       .component('petDetail', {
                template: 'TBD: Detail view for <span>{{$ctrl.petId}}</span>',
                controller: ['$http','$routeParams',function petDetailController($http, $routeParams){
                        //List of items in navigation menus
                        var self = this;

                        $http.get('pets/' + $routeParams.petId + '.json').then(function(response) {
                                self.pet = response.data;
                              });
                      
                }]
});