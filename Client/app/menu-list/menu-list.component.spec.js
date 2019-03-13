'use strict';

describe('menuList', function(){

        beforeEach(module('menuList'));

        describe('menuListController', function(){
            it('shoule create a menu list with 2 menus', inject(function($componentController){
                var ctrl = $componentController('menuList');
                expect(ctrl.menus.length).toBe(2);
            }));
        });
});