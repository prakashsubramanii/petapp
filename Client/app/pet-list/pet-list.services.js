'use strict';

angular.module('petList').factory('petListService', ['$http', '$window', '$rootScope',
  function ($http, $window, $rootScope) {

    var service = {};
    var myPetList = [];
    var petList = [];

    var totalPages, startPage, endPage;
    var startIndex, endIndex, pages;
    var totalItems;
    var currentPage = 1;
    var pageSize = 10;

    service.getPager = getPager;

    // service implementation
    function getPager(totalItems, currentPage, pageSize) {
      // default to first page
      currentPage = currentPage || 1;

      // default page size is 10
      pageSize = pageSize || 10;

      // calculate total pages
      var totalPages = Math.ceil(totalItems / pageSize);

      var startPage, endPage;
      if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
      } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
          startPage = 1;
          endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
          startPage = totalPages - 9;
          endPage = totalPages;
        } else {
          startPage = currentPage - 5;
          endPage = currentPage + 4;
        }
      }

      // calculate start and end item indexes
      var startIndex = (currentPage - 1) * pageSize;
      var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

      // create an array of pages to ng-repeat in the pager control
      var pages = _.range(startPage, endPage + 1);

      // return object with all pager properties required by the view
      return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
      };
    }

    // service.totalItems= totalItems;
    // service.currentPage= currentPage;
    // service.pageSize= pageSize;
    // service.totalPages= totalPages;
    // service.startPage= startPage;
    // service.endPage= endPage;
    // service.startIndex= startIndex;
    // service.endIndex= endIndex;
    // service.pages= pages;

    service.getPageSize = function () {
      return pageSize;
    }

    service.getStartIndex = function () {
      return startIndex;
    }
    service.getEndIndex = function () {
      return endIndex;
    }
    service.getCurrentPage = function () {
      return currentPage;
    }
    service.getTotalItems = function () {
      return totalItems;
    }
    service.getPageSize = function () {
      return pageSize;
    }
    service.getTotalPages = function () {
      return totalPages;
    }
    service.getStartPage = function () {
      return startPage;
    }
    service.getEndPage = function () {
      return endPage;
    }
    service.getPages = function () {
      return pages;
    }

    service.setPetList = function (petList) {
      this.petList = petList;
    }

    service.getPetList = function () {
      return petList;
    }

    service.setMyPetList = function (myPetList) {
      this.myPetList = myPetList;
    }

    service.getMyPetList = function () {
      return myPetList;
    }

    service.getMyPets = function (petObj) {
      return $http({
        method: 'POST',
        type: 'JSON',
        data: petObj,
        url: 'http://13.234.118.1:9090/api/pets/'
      });
    }

    service.getPets = function (petObj) {
      return $http({
        method: 'POST',
        type: 'JSON',
        data: petObj,
        url: 'http://13.234.118.1:9090/api/pets/'
      });
    }

    service.addPetToPetList = function (petObj) {
      return $http({
        method: 'POST',
        type: 'JSON',
        data: petObj,
        url: 'http://13.234.118.1:9090/api/pets/'
      });
    }

    service.searchPetList = function (petObj) {
      var params = {
        page: 0,
        size: 5
      }
      return $http({
        method: 'POST',
        type: 'JSON',
        data: petObj,
        params: params,
        url: 'http://13.234.118.1:9090/api/pets/filter'
      });

    }

    service.buyPet = function (petObj) {
      return $http({
        method: 'PUT',
        type: 'JSON',
        url: 'http://13.234.118.1:9090/api/pets/' + petObj.petId
      });
    }

    //Delete the active user session.
    service.logout = function () {
      // dataTableFilterMap = new Map();
      // globalSearchService.setMenuEventFlag( true );
      // // Setting the Internal User var to false
      // isInternalUser = false;
      $http({
        url: '/security/logout',
        method: "POST",
        headers: { 'Authorization': 'Bearer ' + getCredentials() }
      });
    }

    /**********************************************************************************************************************************/
    service.ajaxAuthenticationRequest = function (xhr) {
      var token = getCredentials();
      if (token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + getCredentials());
        //config.headers.Authorization = 'Bearer ' + getCredentials();
      }
      return xhr;
    }
    //Add Authenticated Request i.e., add token to request object
    service.addAuthenticatedRequest = function (config) {
      config.headers = config.headers || {};
      var token = getCredentials();
      //if url is a server route, add token
      //if( config.url.indexOf(RESOURCES.DOMAIN) === 0 && token ) {
      if (token) {
        config.headers.Authorization = 'Bearer ' + getCredentials();
      }
      return config;
    };

    //Handle the authenticated received response
    service.handleAuthenticatedResponse = function (response) {
      return response;
    };

    return service;
  }]);
