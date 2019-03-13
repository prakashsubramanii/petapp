'use strict';

var petList = angular.module('petList', ['ui.bootstrap']);

petList.controller('petListController', ['$scope', '$rootScope', '$location', '$uibModal','petListService','authenticationService',
    function ($scope, $rootScope, $location, $uibModal, petListService, authenticationService) {

        // if ( $location.path().indexOf("home") > -1 )
        //      $rootScope.isHomePageVisit = true;
        // else
        //     $rootScope.isHomePageVisit = false;

        // alert($rootScope.isHomePageVisit);

        $scope.addpet = function (obj) {

            var petObj = {
                petName: obj.name,
                petAge: obj.age,
                petPlace: obj.place,
                petOwnerId: null
            }

            petListService.addPetToPetList(petObj)
                .then(
                    function (success) {
                        // notify.set({
                        //     message: 'Adding the Pet : ' + petObj.name + ' was successful',
                        //     classes: 'alert-success',
                        //     position: 'right'
                        // });
                        alert('Adding pet to the list is successful');
                        window.location.replace('#!/pets');
                    },
                    function (error) {
                        alert('Error adding pet to list');
                        // notify.set({
                        //     message: error.data,
                        //     classes: 'alert-danger',
                        //     duration: 0,
                        //     position: 'right'
                        // });
                    }); 
        }

        $scope.cancel = function () {
            $scope.pet = {};
        }

        $scope.buyPets = function (obj) {
            var petObj = {
                   petId: obj.id,
                   petName: obj.name,
                   userName: $rootScope.currentUser
             }
            petListService.buyPet(petObj)
            .then(
                function (success) {
                    // notify.set({
                    //     message: 'Adding the Pet : ' + petObj.name + ' was successful',
                    //     classes: 'alert-success',
                    //     position: 'right'
                    // });
                    alert('Buying pet to the list is successful');
                    window.location.replace('#!/mypets');
                },
                function (error) {
                    alert('Failed to buy the pet');
                    // notify.set({
                    //     message: error.data,
                    //     classes: 'alert-danger',
                    //     duration: 0,
                    //     position: 'right'
                    // });
                }); 
        }

            //  $ctrl.pets = []
        //     , $scope.currentPage = 1
        //     , $scope.numPerPage = 2
        //     , $scope.maxSize = 2;

        //     $scope.numOfPages = function(){
        //         return Math.ceil(  $scope.allpets/$scope.numPerPage);
        //     }

        // $scope.$watch('currentPage + numPerPage', function () {
        //     var begin = (($scope.currentPage - 1) * $scope.numPerPage)
        //         , end = begin + $scope.numPerPage;

        //     $scope.allpets = petListService.getPetList().slice(begin, end);
        //     $scope.mypets =  petListService.getMyPetList().slice(begin, end);

        // });

        $scope.open = function() {
            var modalInstance =  $uibModal.open({
              templateUrl: "pet-list/modalContent.html",
              controller: "ModalContentCtrl",
              size: '',
            });
            
            modalInstance.result.then(function(response){
                $scope.result = `${response} button hitted`;
                alert($scope.result)
            });
            
          };
    }]);

    // petList.controller('ModalCtrl', function($scope, $uibModal) {


    //   })
      
      petList.controller('ModalContentCtrl', function($scope, $uibModalInstance, petListService) {
      
        $scope.ok = function(){

            if ( $scope.modalName === undefined )
                $scope.modalName ='';
            if ( $scope.modalPlace === undefined )
                $scope.modalPlace ='';
            if ( $scope.modalAge === undefined )
                $scope.modalAge = '';

            var object = {
                petName: $scope.modalName,
                petPlace: $scope.modalPlace,
                petAge: $scope.modalAge
            }

              $uibModalInstance.close("Ok");
              petListService.searchPetList(object)
              .then(
                function (success) {
                    $scope.pets = success.data.content;
                    alert('Searching the list is successful');

                    window.location.replace('#!/pets');

                },
                function (error) {
                    alert('Error searching pet to list');
                }); 
        }

        $scope.cancel = function(){
            $uibModalInstance.dismiss();
          } 
        
        
      });