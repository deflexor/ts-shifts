
import { expect } from 'chai'
import { describe } from 'mocha'
import { shiftl, shiftr, shiftable, findShifts, findLefts, findRights, nextShift } from '../shifts';

describe("shifts.ts", () => {
  describe("shiftl()", () => {
    it("should return", () => {      
      expect( shiftl([4,4,4]) ).to.deep.equal([8,4]);
      expect( shiftl([4,4,8,8]) ).to.deep.equal([8,16]);
    });
  });
  describe("shiftr()", () => {
    it("should return", () => {      
      expect( shiftr([4,4,4]) ).to.deep.equal([4,8]);
      expect( shiftr([4,4,8,8]) ).to.deep.equal([8,16]);
    });
  });
});
