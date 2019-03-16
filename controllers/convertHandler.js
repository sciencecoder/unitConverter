/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  this.units = [
    {
      imperial: {
        short: "gal",
        full: "gallon",
        convertRatio: 3.7853,
      },
      metric: {
        short: "l",
        full: "liter",
         convertRatio: 0.2642,
      }
    },
     {
      imperial: {
        short: "mi",
        full: "mile",
        convertRatio: 1.6093,
      },
      metric: {
        short: "km",
        full: "kilometer",
         convertRatio: 0.6214
      }
    },
     {
      imperial: {
        short: "lb",
        full: "pound",
         convertRatio: 0.4536,
      },
      metric: {
        short: "kg",
        full: "kilogram",
         convertRatio: 2.2046,
      }
     }
    ];
  
  this.getNum = function(input) {
    var result;
    var raw_ints = input.match(/(\d{1,}(\.\d{1,})*)|\//g) || [];
    if( raw_ints.length == 3 &&  raw_ints[1] == "/") {
      result = parseFloat(raw_ints[0]) / parseFloat(raw_ints[2])
    } else if( raw_ints.length==1) {
      result = parseFloat(raw_ints[0]);
    } else if( raw_ints.length == 0) {
      result = 1;
    }
    
    return result ? result.toFixed(5) : false;
  };
  
  this.getUnit = function(input) {
    //selects numbers with optional decimal points and.or fractions with / symbol
    var queryUnit = input.match(/[a-z]{1,}/gi);
    queryUnit = queryUnit ? queryUnit[0] : "";
    
    var result = {
      unit: queryUnit.toLowerCase().replace("s", "")
    }
    for(var i = 0; i < this.units.length; i++) {
     // console.log("this is units index ", i)
     // console.log(this.units[i], this.units[i].imperial.short)
      if((result.unit == "gal" || 
      result.unit == "mi" ||
      result.unit == "lb") && 
      this.units[i].imperial.short == result.unit) {
        //console.log("found matching unit", i, result, this.units[i])
        result.index = i;
        result.sys = "imperial"
        break;
      }
      else if((result.unit == "l" || 
      result.unit == "km" ||
      result.unit == "kg")  && this.units[i].metric.short == result.unit) {
        result.index = i;
        result.sys = "metric"
        break;
      }
    }
    //console.log("unit data is ", result);
    if(!result.hasOwnProperty("index") || !result.hasOwnProperty("sys")) {
      //console.log("missing prop", result)
      return false;
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    if(!initUnit) {
      return false
    }
    var result;
    if(typeof initUnit == "object") {
      result = this.units[initUnit.index][initUnit.sys == "imperial" ? "metric" : "imperial"].short;
    }
    
    else if (typeof initUnit == "string") {
      initUnit = initUnit.toLowerCase();
      switch(initUnit) {
        case "mi":
          result = "km";
          break;
          case "km":
          result = "mi";
          break;
          case "gal":
          result = "l";
          break;
          case "l":
          result = "gal";
          break;
          case "lb":
          result = "kg";
          break;
          case "kg":
          result = "lb";
          break;
      }
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    if(!unit) {
      return false;
    }
    var result;
    if(typeof unit == "object") {
      result = this.units[unit.index][unit.sys].full
    } else if (typeof unit == "string") {
      unit=unit.toLowerCase().replace(/s$/, "")
      switch(unit) {
        case "mi":
          result = "mile";
          break;
          case "km":
          result = "kilometer";
          break;
          case "gal":
          result = "gallon";
          break;
          case "l":
          result = "liter";
          break;
          case "lb":
          result = "pound";
          break;
          case "kg":
          result = "kilogram";
          break;
      }
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
   //const galToL = 3.78541;
   // const lbsToKg = 0.453592;
    //const miToKm = 1.60934;
    //console.log(initUnit, this.units)
    if(!initNum || !initUnit) {
      return false;
    }
    var result;
    if(typeof initUnit == "object") {
      result = this.units[initUnit.index][initUnit.sys].convertRatio * initNum;
    }
  
    else if (typeof initUnit == "string") {
      initUnit = initUnit.toLowerCase().replace(/s$/, "");
      switch(initUnit) {
        case "mi":
          result = 1.6093 * initNum;
          break;
          case "km":
          result =  0.6214 * initNum;
          break;
          case "gal":
          result =3.7853 * initNum;
          break;
          case "l":
          result =0.2642 * initNum;
          break;
          case "lb":
          result = 0.4536 * initNum;
          break;
          case "kg":
          result =2.2046 * initNum;
          break;
      }
    };
    return result.toFixed(5);
 
  }
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
  // console.log("unit data", initUnit, this.units[0])
    if(!initNum && !initUnit) {
      return "invalid number and unit";
      
    } else if(!initNum) {
      return "invalid number";
    } else if(!initUnit) {
      return "invalid Unit";
    }
   
    var result = {
      initNum: parseFloat(initNum),
      initUnit: initUnit.unit,
      returnNum: parseFloat(returnNum),
      returnUnit,
      string: `${initNum} ${this.spellOutUnit(initUnit)}${initNum > 1 ? "s" : ""} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}${returnNum > 1 ? "s" : ""}`
    };
    
    return result;
  };
  
}

module.exports = ConvertHandler;
