'use strict';

describe('Класс Game.Rect', () => {  
  describe('Конструктор new Game.Rect()', () => {
    it('Cоздает два свойства-вектора coords и size', () => {
      var rect = new Game.Rect();

      expect(rect.coords).is.instanceof(Vector);
      expect(rect.size).is.instanceof(Vector);
    });

    it('coords содержит координаты равны первым 2 аргументам конструктора', () => {
      var rect = new Game.Rect(1, 2, 3, 4);

      assert.strictEqual(rect.coords.x, 1);
      assert.strictEqual(rect.coords.y, 2);
    });

    it('Содержит свойство type равное rect', () => {
      var rect = new Game.Rect();

      assert.strictEqual(rect.type, 'rect');
    });

    it('size содержит координаты равны вторым 2 аргументам конструктора', () => {
      var rect = new Game.Rect(1, 2, 3, 4);

      assert.strictEqual(rect.size.x, 3);
      assert.strictEqual(rect.size.y, 4);
    });

  });

  describe('Геттеры', () => {
    it('left - возвращает левую границу прямоугольника', () => {
      var rect = new Game.Rect(1, 2, 3, 4);

      assert.strictEqual(rect.left, 1);
    });

    it('right - возвращает правую границу прямоугольника', () => {
      var rect = new Game.Rect(1, 2, 3, 4);

      assert.strictEqual(rect.right, 1 + 3);
    });

    it('top - возвращает верхнюю границу прямоугольника', () => {
      var rect = new Game.Rect(1, 2, 3, 4);

      assert.strictEqual(rect.top, 2);
    });

    it('bottom - возвращает нижнюю границу прямоугольника', () => {
      var rect = new Game.Rect(1, 2, 3, 4);

      assert.strictEqual(rect.bottom, 2 + 4);
    });
  });

  describe('Сеттеры', () => {
    it('left - устанавливает левую границу (меняется положение)', () => {
      var rect = new Game.Rect(1, 2, 3, 4);

      rect.left = 11;

      assert.strictEqual(rect.coords.x, 11);
    });

    it('right - устанавливает правую границу (меняется положение)', () => {
      var rect = new Game.Rect(1, 2, 3, 4);

      rect.right = 11;

      assert.strictEqual(rect.coords.x, 11 - 3);
    });

    it('top - устанавливает верхнюю границу (меняется положение)', () => {
      var rect = new Game.Rect(1, 2, 3, 4);

      rect.top = 11;

      assert.strictEqual(rect.coords.y, 11);
    });

    it('bottom - устанавливает нижнуюю границу (меняется положение)', () => {
      var rect = new Game.Rect(1, 2, 3, 4);

      rect.bottom = 20;

      assert.strictEqual(rect.coords.y, 20 - 4);
    });

  });
});
