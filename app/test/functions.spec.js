'use strict';

describe('Functiоns.js', () => {
  
  describe('isIntersectLines()', () => {

    it('(1;4) и (3;6) - пересекаются', () => {
      assert.isTrue(isIntersectLines(1, 4, 3, 6));
    });
    it('(3;6) и (1;4) - пересекаются', () => {
      assert.isTrue(isIntersectLines(3, 6, 1, 4));
    });
    it('(1;10) и (2;5) - пересекаются', () => {
      assert.isTrue(isIntersectLines(1, 10, 2, 5));
    });
    it('(2;5) и (1;10) - пересекаются', () => {
      assert.isTrue(isIntersectLines(2, 5, 1, 10));
    });
    it('(2;5) и (6;10) - не пересекаются', () => {
      assert.isFalse(isIntersectLines(2, 5, 6, 10));
    });
    it('(6;10) и (2;5) - не пересекаются', () => {
      assert.isFalse(isIntersectLines(6, 10, 2, 5));
    });

  });

});
