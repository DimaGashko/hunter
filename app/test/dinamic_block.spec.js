'use strict';

describe('Класс Game.DinamicBlock', () => {  
   describe('Конструктор new Game.Block()', () => {
      it('Наследует от Game.Block', () => {
         var block = new Game.DinamicBlock();

         expect(block).is.instanceof(Game.Block);
      });

      it('Поле coords содержит переданные координаты', () => {
         var block = new Game.Block({
            x: 11,
            y: 22,
         });

         assert.strictEqual(block.coords.x, 11);
         assert.strictEqual(block.coords.y, 22);
      });

      it('Поле size содержит переданные размеры', () => {
         var block = new Game.Block({
            w: 11,
            h: 22,
         });
         
         assert.strictEqual(block.size.x, 11);
         assert.strictEqual(block.size.y, 22);
      });   

      it('По умолчанию поле speed равно (0:0)', () => {
         var block = new Game.DinamicBlock({});

         assert.strictEqual(block.speed.x, 0);
         assert.strictEqual(block.speed.y, 0);
      });

      it('Поле speed содержит переданную скорость', () => {
         var block = new Game.DinamicBlock({
            speed: new Vector(10, 5),
         });

         assert.strictEqual(block.speed.x, 10);
         assert.strictEqual(block.speed.y, 5);
      });
   });

   describe('Методы updateCoords()', () => {
      it('Добавляет к вектору координат вектор скорости', () => {
         var block = new Game.DinamicBlock({
            x: 1,
            y: 2,

            speedX: new Vector(2, 3),
         });

         block.updateCoords();

         assert.strictEqual(block.coords.x, 3);
         assert.strictEqual(block.coords.y, 5);

         block.speed = block.speed.plus(8, 7);

         block.updateCoords();

         assert.strictEqual(block.speed.x, 13);
         assert.strictEqual(block.speed.y, 15);
      });
   });

});
