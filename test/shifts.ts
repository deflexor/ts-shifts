
import { expect } from 'chai'
import { describe } from 'mocha'
import { shiftl, shiftr, shiftable, findShifts, findLefts, findRights, nextShift } from '../shifts';

describe("shifts.ts", () => {
  describe("shiftl()", () => {
    it("should return array", () => {      
      expect( shiftl([]) ).to.deep.equal([]);
      expect( shiftl([2]) ).to.deep.equal([2]);
      expect( shiftl([4,4,4]) ).to.deep.equal([8,4]);
      expect( shiftl([4,4,8,8]) ).to.deep.equal([8,16]);
    });
  });
  describe("shiftr()", () => {
    it("should return array", () => {      
      expect( shiftr([]) ).to.deep.equal([]);
      expect( shiftr([2]) ).to.deep.equal([2]);
      expect( shiftr([4,4,4]) ).to.deep.equal([4,8]);
      expect( shiftr([4,4,8,8]) ).to.deep.equal([8,16]);
      expect( shiftr([4,4,4,8]) ).to.deep.equal([4,8,8]);
    });
  });
  describe("shiftable()", () => {
    it("should return bool", () => {      
      expect( shiftable([4,4,4]) ).to.equal(true);
      expect( shiftable([4,2,4]) ).to.equal(false);
      expect( shiftable([4]) ).to.equal(false);
      expect( shiftable([]) ).to.equal(false);
    });
  });
  describe("findShifts()", () => {
    it("should return Array of optimal (shortest) shifts", () => {      
      // [4,4,4,8] -> [Shift SRight [4,8,8],Shift SRight [4,16]]
      expect( findShifts([4,4,4,8], []) ).to.deep.equal([{"arr": [4,16],"dir": "Right"}, {"arr": [4,8,8],"dir": "Right"}]);
    });
  });
  describe("nextShift()", () => {
    it("should return next optimal shift", () => {      
      expect( nextShift([4,4,4,8]) ).to.deep.equal({"arr": [4,8,8],"dir": "Right"});
    });
  });
  describe("findLefts()", () => {
    it("should return number of consequent left shifts available", () => {      
      expect( findLefts(0, [4,4,4,8]) ).to.equal(0);
    });
  });
  describe("findRights()", () => {
    it("should return number of consequent right shifts available", () => {      
      expect( findRights(0, [4,4,4,8]) ).to.equal(1);
    });
  });
});
