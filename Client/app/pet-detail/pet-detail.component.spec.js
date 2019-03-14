
'use strict';

describe('petDetail', function() {

    // Load the module that contains the `petDetail` component before each test
    beforeEach(module('petDetail'));
  
    // Test the controller
    describe('petDetailController', function() {
      var $httpBackend, ctrl;
  
      beforeEach(inject(function($componentController, _$httpBackend_, $routeParams) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('phones/xyz.json').respond({name: 'phone xyz'});
  
        $routeParams.phoneId = 'xyz';
  
        ctrl = $componentController('petDetail');
      }));
  
      it('should fetch the phone details', function() {
        expect(ctrl.pet).toBeUndefined();
  
        $httpBackend.flush();
        expect(ctrl.pet).toEqual({name: 'phone xyz'});
      });
  
    });
  
  });
  