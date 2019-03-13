// 'use strict';

// describe('petList', function () {

//     beforeEach(module('petList'));

//     describe('petListController', function () {

//         var $httpBackend, ctrl;

//         beforeEach(inject(function ($componentController,_$httpBackend_) {
//             $httpBackend = _$httpBackend_;
//             $httpBackend.expectGET('phones/phones.json')
//                         .respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
      
//             ctrl = $componentController('petList');
//         }));

//         it('should create a `phones` property with 2 phones fetched with `$http`', function() {
//             expect(ctrl.pets).toBeUndefined();
          
//             $httpBackend.flush();
//             expect(ctrl.pets).toEqual([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
//           });
        
//           it('shoule create a pet list with 3 pets', function () {
//             expect(ctrl.pets.length).toBe(3);
//         });

//         it('should set a default value for the `orderProp` model', function () {
//             expect(ctrl.orderProp).toBe('name');
//         });

//     });
// });