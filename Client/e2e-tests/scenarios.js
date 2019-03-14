'use strict';

// AngularJS E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('Pets Peers Application', function() {

  it('should redirect `index.html` to `index.html#!/pets', function() {
    browser.get('index.html');
    expect(browser.getCurrentUrl()).toContain('index.html#!/pets');
  });

  describe('View: Pet list', function() {

    beforeEach(function() {
      browser.get('index.html#!/pets');
    });

    it('should filter the pet list as a user types into the search box', function() {
      var phoneList = element.all(by.repeater('pet in $ctrl.pets'));
      var query = element(by.model('$ctrl.query'));

      expect(phoneList.count()).toBe(20);

      query.sendKeys('nexus');
      expect(phoneList.count()).toBe(1);

      query.clear();
      query.sendKeys('motorola');
      expect(phoneList.count()).toBe(8);
    });

    it('should be possible to control phone order via the drop-down menu', function() {
      var queryField = element(by.model('$ctrl.query'));
      var orderSelect = element(by.model('$ctrl.orderProp'));
      var nameOption = orderSelect.element(by.css('option[value="name"]'));
      var phoneNameColumn = element.all(by.repeater('pet in $ctrl.pets').column('pet.name'));

      function getNames() {
        return phoneNameColumn.map(function(elem) {
          return elem.getText();
        });
      }

      queryField.sendKeys('tablet');   // Let's narrow the dataset to make the assertions shorter

      expect(getNames()).toEqual([
        'Motorola XOOM\u2122 with Wi-Fi',
        'MOTOROLA XOOM\u2122'
      ]);

      nameOption.click();

      expect(getNames()).toEqual([
        'MOTOROLA XOOM\u2122',
        'Motorola XOOM\u2122 with Wi-Fi'
      ]);
    });

    it('should render phone specific links', function() {
      var query = element(by.model('$ctrl.query'));
      query.sendKeys('nexus');

      element.all(by.css('.pets li a')).first().click();
      expect(browser.getCurrentUrl()).toContain('index.html#!/pets/nexus-s');
    });

  });

  describe('View: Pet detail', function() {

    beforeEach(function() {
      browser.get('index.html#!/pets/nexus-s');
    });

    it('should display the `nexus-s` page', function() {
      expect(element(by.binding('$ctrl.pet.name')).getText()).toBe('Nexus S');
    });

    // it('should display the first pet image as the main pet  image', function() {
    //   var mainImage = element(by.css('img.pet.selected'));

    //   expect(mainImage.getAttribute('src')).toContain('img/phones/nexus-s.0.jpg');
    // });

    // it('should swap the main image when clicking on a thumbnail image', function() {
    //   var mainImage = element(by.css('img.phone.selected'));
    //   var thumbnails = element.all(by.css('.phone-thumbs img'));

    //   thumbnails.get(2).click();
    //   expect(mainImage.getAttribute('src')).toContain('img/phones/nexus-s.2.jpg');

    //   thumbnails.get(0).click();
    //   expect(mainImage.getAttribute('src')).toContain('img/phones/nexus-s.0.jpg');
    // });

  });

});
