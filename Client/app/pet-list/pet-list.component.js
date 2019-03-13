'use strict';

angular.module('petList')
        .component('petList', {
                templateUrl: 'pet-list/pet-list.template.html',
                controller: ['$http', '$scope', '$rootScope', '$location', 'petListService','authenticationService',
                        function petListController($http, $scope, $rootScope, $location, petListService,authenticationService) {
                                var self = this;   
                                self.petName = '';
                                self.petPlace = '';
                                self.petAge = '';
                                self.setPage = setPage;

                                initController();

                                function initController() {
                                        // initialize to page 1
                                        setPage(1);
                                }
                        
                                function setPage(page){
                                        if (page < 1 ) return;
                                        else if ( self.pager !== null && self.pager != undefined ){
                                                if ( page > self.pager.totalPages)
                                                        return;
                                        }

                                        if ( self.pets !== undefined && self.pets !== null )
                                                getPagerObject();
                                }

                                // function getPagerObject(){
                                //         // get pager object from service
                                //                 self.pager = petListService.getPager(self.pets.length, page);
                                //                 self.pets = self.pets.slice(self.pager.startIndex, self.pager.endIndex + 1);
                                // }

                                // service.totalItems= totalItems;
                                // self.curPage = petListService.getCurrentPage();
                                // self.pageSize= petListService.getPageSize();
                                // self.totalPages = petListService.getTotalPages();
                                // // service.startPage= startPage;
                                // // service.endPage= endPage;
                                // // service.startIndex= startIndex;
                                // // service.endIndex= endIndex;
                                // self.pages = petListService.getPages();

                                self.orderProp = 'petName'; //authenticationService.getLoggedInUser()
                                

                                /*Pagination*/
                                // self.curPage = 1,
                                // self.itemsPerPage = 3,
                                // self.maxSize = 5;

                                // self.items = self.pets;
                                  
                                // self.numOfPages = function () {
                                //         return Math.ceil((self.items).length / self.itemsPerPage);
                                        
                                // };
                                
                                // $scope.$watch('curPage + numPerPage', function() {
                                //         var begin = ((self.curPage - 1) * self.itemsPerPage),
                                //         end = begin + self.itemsPerPage;
                                        
                                //         if ( self.pets !== undefined && self.pets !== null)
                                //              self.filteredPets = (self.pets).slice(begin, end);
                                //         else
                                //              self.filteredPets = [];
                                // });

                                /************************************* */ 

                                
                                var config = {
                                        params: {
                                            page: self.pager === undefined ? 0: self.pager.currentPage === undefined ? 0:  self.pager.currentPage-1,
                                            size: self.pager === undefined ? 5: self.pager.pageSize === undefined ? self.pager.pageSize: 5
                                        }
                                    }
                                
                                if ($location.path().indexOf("mypets") > -1) {
                                        $http.get('http://13.234.118.1:9090/api/pets/mypets',config).then(function (response) {
                                                self.pets = response.data.content;
                                                console.log(JSON.stringify(response.data));
                                                
                                                if ( self.pets !== null && self.pets !== undefined && self.pets.length > 0)
                                                        self.pager.pageSize = response.data.totalElements;
                                        });
                                }
                                else {
                                        $http.get('http://13.234.118.1:9090/api/pets/',config).then(function (response) {
                                                console.log(JSON.stringify(response));
                                                console.log(JSON.stringify(self.filteredPets));
                                                self.pets = response.data.content;
                                                if ( self.pets !== null && self.pets !== undefined && self.pets.length > 0)
                                                        self.pager.pageSize = response.data.totalElements;

                                        });
                                }

                                self.searchPets = function(petName, petPlace, petAge){
                                        console.log( " PET NAME " + petName + " PET PLACE " + petPlace + " PET AGE " + petAge);
                                        //GET THE BACKEND CALLS API
                                }
                        }]
        });