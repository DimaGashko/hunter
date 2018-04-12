'use strict';

describe('Класс Vector', () => {
  const x = 3, y = 7, left = 5, top = 10, n = 5;

  describe('Конструктор new Vector()', () => {
    it('создает объект со свойствами x и y равными аргументам конструктора', () => {
      const position = new Vector(left, top);

      expect(position.x).is.equal(left);
      expect(position.y).is.equal(top);
    });

    it('без аргументов создает объект со свойствами x и y равными 0', () => {
      const position = new Vector();

      expect(position.x).is.equal(0);
      expect(position.y).is.equal(0);
    });

  });

  describe('Метод plus()', () => {
    it('создает новый вектор', () => {
      const position = new Vector(x, y);

      const newPosition = position.plus(new Vector(left, top));

      expect(newPosition).is.instanceof(Vector);
    });

    it('координаты нового вектора равны сумме координат суммируемых', () => {
      const position = new Vector(x, y);

      const newPosition = position.plus(new Vector(left, top));

      expect(newPosition.x).is.equal(8);
      expect(newPosition.y).is.equal(17);
    });
  });

  describe('Метод minus()', () => {
    it('создает новый вектор', () => {
      const position = new Vector(x, y);

      const newPosition = position.minus(new Vector(left, top));

      expect(newPosition).is.instanceof(Vector);
    });

    it('координаты нового вектора равны разнице координат суммируемых', () => {
      const position = new Vector(10, 20);

      const newPosition = position.minus(new Vector(5, 6));

      expect(newPosition.x).is.equal(5);
      expect(newPosition.y).is.equal(14);
    });
  });

  describe('Метод mul()', () => {
    it('создает новый вектор', () => {
      const position = new Vector(x, y);

      const newPosition = position.mul(n);

      expect(newPosition).is.instanceof(Vector);
    });

    it('координаты нового вектора увеличины в n раз', () => {
      const position = new Vector(4, 5);

      const newPosition = position.mul(5);

      expect(newPosition.x).is.equal(20);
      expect(newPosition.y).is.equal(25);
    });
  });

  describe('Метод div()', () => {
    it('создает новый вектор', () => {
      const position = new Vector(x, y);

      const newPosition = position.div(n);

      expect(newPosition).is.instanceof(Vector);
    });

    it('координаты нового вектора уменьшены в n раз', () => {
      const position = new Vector(20, 25);

      const newPosition = position.div(5);

      expect(newPosition.x).is.equal(4);
      expect(newPosition.y).is.equal(5);
    });
  });

  describe('Метод scale()', () => {
    it('создает новый вектор', () => {
      const position = new Vector(10, 20);

      const newPosition = position.scale(3, 2);

      expect(newPosition).is.instanceof(Vector);
    });

    it('Координаты нового вектора увеличены на n и m', () => {
      const position = new Vector(10, 20);
      
      const newPosition = position.scale(new Vector(3, 2));

      expect(newPosition.x).is.equal(30);  
      expect(newPosition.y).is.equal(40);   
    });
  });

  describe('Метод diScale()', () => {
    it('создает новый вектор', () => {
      const position = new Vector(10, 20);

      const newPosition = position.diScale(3, 2);

      expect(newPosition).is.instanceof(Vector);
    });

    it('Координаты нового вектора уменьшены на n и m', () => {
      const position = new Vector(10, 20);
      
      const newPosition = position.diScale(new Vector(2, 4));

      expect(newPosition.x).is.equal(5);  
      expect(newPosition.y).is.equal(5);   
    });
  });

  describe('Метод copy()', () => {
    it('создает новый вектор', () => {
      const position = new Vector(10, 20);

      const newPosition = position.copy();

      expect(newPosition).is.instanceof(Vector);
    });

    it('Координаты нового вектора такие же как у начального', () => {
      const position = new Vector(10, 20);

      const newPosition = position.copy();

      expect(newPosition.x).is.equal(10);  
      expect(newPosition.y).is.equal(20);   
    });
  });

  describe('Метод scalarAbs()', () => {
    it('создает новый вектор', () => {
      const position = new Vector(10, 20);

      const newPosition = position.copy();

      expect(newPosition).is.instanceof(Vector);
    });

    it('Vector(-10, -20) => Vector(10, 20)', () => {
      const position = new Vector(-10, -20);
      const newPosition = position.scalarAbs();

      expect(newPosition.x).is.equal(10);  
      expect(newPosition.y).is.equal(20);   
    });

    it('Vector(10, 20) => Vector(10, 20)', () => {
      const position = new Vector(10, 20);
      const newPosition = position.scalarAbs();

      expect(newPosition.x).is.equal(10);  
      expect(newPosition.y).is.equal(20);   
    });

    it('Vector(-10, 20) => Vector(10, 20)', () => {
      const position = new Vector(-10, 20);
      const newPosition = position.scalarAbs();

      expect(newPosition.x).is.equal(10);  
      expect(newPosition.y).is.equal(20);   
    });

    it('Vector(10, -20) => Vector(10, 20)', () => {
      const position = new Vector(10, -20);
      const newPosition = position.scalarAbs();

      expect(newPosition.x).is.equal(10);  
      expect(newPosition.y).is.equal(20);   
    });
  });

});
