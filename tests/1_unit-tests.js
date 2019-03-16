/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = "2.33L";
      assert.equal(convertHandler.getNum(input), 2.33, "should return a decimal")
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = "2/2L";
      assert.equal(convertHandler.getNum(input), 1, "should return 1 for input 2/2L")
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = "2.2/2.2L"
      assert.equal(convertHandler.getNum(input), 1, "should return int for decimal and fractional mixed input")
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = "2/2/3/3L"
      assert.equal(convertHandler.getNum(input), false, "should return 'invalid number'")
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = "L";
      assert.equal(convertHandler.getNum(input), 1, "should default to 1")
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        //console.log(convertHandler.getUnit(ele).unit)
        assert.equal(convertHandler.getUnit(ele).unit, ele.toLowerCase().replace(/s$/, ""), `should return ${ele.toLowerCase()}`)
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
     
      assert.equal(convertHandler.getUnit("newtons"), false, "Should return false");
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lb','kg'];
      var expect = ['l','gal','km','mi','kg','lb'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i], `should equal/return ${expect[i]}`);
      });
      
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      //see above example for hint
       var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['gallon','liter','mile','kilometer','pound','kilogram'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
   
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.92650;
      
      assert.equal(convertHandler.convert(input[0],input[1]),expected,0.10000); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [5, 'L'];
      var expected = 1.32100;
      assert.equal(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [2, 'MI'];
      var expected = 3.21860;
      assert.equal(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
       var input = [3, 'Km'];
      var expected = 1.86420;
      assert.equal(convertHandler.convert(input[0],input[1]),expected); //0.1 tolerance
      done();
    });
   
    test('Lbs to Kg', function(done) {
       var input = [4, 'Lbs'];
      var expected = 1.81440;
     
      assert.equal(convertHandler.convert(input[0],input[1]),expected); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
       var input = [3, 'Kg'];
      var expected = 6.61380;
      assert.equal(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
  });

});