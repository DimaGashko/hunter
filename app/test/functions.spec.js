'use strict';

describe('Functiоns.js', () => {
  
  describe('isIntersectLines()', () => {
    it('(1;4) и (3;6) - пересекаются', () => {
      assert.isTrue(isIntersectLines(1, 4, 3, 6));
    });
    it('(4;1) и (3;6) - пересекаются', () => {
      assert.isTrue(isIntersectLines(4, 1, 3, 6));
    });
    it('(1;4) и (6;3) - пересекаются', () => {
      assert.isTrue(isIntersectLines(1, 4, 6, 3));
    });
    it('(4;1) и (6;3) - пересекаются', () => {
      assert.isTrue(isIntersectLines(4, 1, 6, 3));
    });
    it('(1;10) и (5;6) - пересекаются', () => {
      assert.isTrue(isIntersectLines(1, 10, 5, 6));
    });
    it('(1;2) и (2;3) - пересекаются', () => {
      assert.isTrue(isIntersectLines(1, 2, 2, 3));
    });
    it('(5;6) и (5;6) - пересекаются', () => {
      assert.isTrue(isIntersectLines(5, 6, 5, 6));
    });

  });

});
