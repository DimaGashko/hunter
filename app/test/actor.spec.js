'use strict';

describe('Класс Actor', () => {
   describe('Конструктор new Actor()', () => {
      it('Наследует от Game.DinamicBlock', () => {
         var block = new Game.Actor();

         expect(block).is.instanceof(Game.DinamicBlock);
      });

      it('Поле coords содержит переданные координаты', () => {
         var block = new Game.DinamicBlock({
            x: 11,
            y: 22,
         });

         assert.strictEqual(block.coords.x, 11);
         assert.strictEqual(block.coords.y, 22);
      });

      it('Поле size содержит переданные размеры', () => {
         var block = new Game.DinamicBlock({
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
            speedX: 10,
            speedY: 5,
         });

         assert.strictEqual(block.speed.x, 10);
         assert.strictEqual(block.speed.y, 5);
      });

      
   });

});
