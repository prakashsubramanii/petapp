describe('petsController', function(){ /*controller*/

    beforeEach(module('petsApp')); /*module*/

    /*String test*/
    it('should be hello the world', inject(function($controller){

        var scope = {};
        var ctrl = $controller('petsController',{$scope: scope});

        expect(scope.name).toBe('the world');

    }));

});