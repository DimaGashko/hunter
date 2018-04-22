'use strict';

describe('Класс Game.Block', () => {  
   describe('Конструктор new Game.Block()', () => {
      it('Наследует от Game.Rect', () => {
         var block = new Game.Block();

         expect(block).is.instanceof(Game.Rect);
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

   });

   describe('Скорость', () => {
      it('По умолчанию 0', () => {
         var block = new Game.Block();

         assert.strictEqual(block.speed.x, 0);
         assert.strictEqual(block.speed.y, 0);
      });

      it('При передаче в параметрах все равно 0', () => {
         var block = new Game.Block({
            speedX: 1,
            speedY: 2,
         });

         assert.strictEqual(block.speed.x, 0);
         assert.strictEqual(block.speed.y, 0);
      });
   });

   describe('Метод convertToRender()', () => {
      it('Возвращает объект с метриками', () => {
         var block = new Game.Block({
            x: 10,
            y: 20,
            w: 1,
            h: 2,
         });

         var toRender = block.convertToRender();

         assert.strictEqual(toRender.x, 10);
         assert.strictEqual(toRender.y, 20);
         assert.strictEqual(toRender.w, 1);
         assert.strictEqual(toRender.h, 2);
      });
   });

   describe('Методы updateCoords()', () => {
      it('Метод updateCoords() есть', () => {
         var block = new Game.Block();

         assert.strictEqual(typeof block.updateCoords, 'function');
      });
      
      it('Не меняет координаты', () => {
         var block = new Game.Block({
            x: 1,
            y: 2,

            speedX: 2, 
            speedY: 3
         });

         block.updateCoords();

         assert.strictEqual(block.coords.x, 1);
         assert.strictEqual(block.coords.y, 2);
      });
   });

   /*
   describe('Физические свойства', () => { 

   });
   */

   /*
   describe('Метод respondInteraction() - реакция на взаимодействие', () => {
      var config = {
         //V = 1
         w: 1,
         h: 1,

         props: {
            ro: 2, //=== m (V === 1)
            mu: 0.5
         }
      }

      describe('При движении к блоку', () => {
         it('При взаимодействии сверху - меняется приложенная сила', () => {
            //у блоков ro = 2, V = 1, m = 2, mu = 0.5
   
            var block1 = new Game.Block(config);
            var block2 = new Game.Block(config);
   
            block1.fullF = new Vector(10, 5);
   
            block2.respondInteraction(block1, 'top');
   
            assert.strictEqual(block1.fullF.x, 7.5);
            assert.strictEqual(block1.fullF.y, 0);
         });

         it('При взаимодействии снизу - меняется приложенная сила', () => {
            //у блоков ro = 2, V = 1, m = 2, mu = 0.5
   
            var block1 = new Game.Block(config);
            var block2 = new Game.Block(config);
   
            block1.fullF = new Vector(10, -5);
   
            block2.respondInteraction(block1, 'bottom');
   
            assert.strictEqual(block1.fullF.x, 7.5);
            assert.strictEqual(block1.fullF.y, 0);
         });

         it('При взаимодействии слева - меняется приложенная сила', () => {
            //у блоков ro = 2, V = 1, m = 2, mu = 0.5
   
            var block1 = new Game.Block(config);
            var block2 = new Game.Block(config);
   
            block1.fullF = new Vector(10, 5);
   
            block2.respondInteraction(block1, 'left');
   
            assert.strictEqual(block1.fullF.x, 0);
            assert.strictEqual(block1.fullF.y, 0);
         });

         it('При взаимодействии справа - меняется приложенная сила', () => {
            //у блоков ro = 2, V = 1, m = 2, mu = 0.5
   
            var block1 = new Game.Block(config);
            var block2 = new Game.Block(config);
   
            block1.fullF = new Vector(-10, 5);
   
            block2.respondInteraction(block1, 'right');
   
            assert.strictEqual(block1.fullF.x, 0);
            assert.strictEqual(block1.fullF.y, 0);
         });
      });

      describe('При движении от блока', () => {

         it('При взаимодействии сверху - не меняется приложенная сила', () => {
            //у блоков ro = 2, V = 1, m = 2, mu = 0.5

            var block1 = new Game.Block(config);
            var block2 = new Game.Block(config);
   
            block1.fullF = new Vector(10, -5);
   
            block2.respondInteraction(block1, 'top');
   
            assert.strictEqual(block1.fullF.x, 10);
            assert.strictEqual(block1.fullF.y, -5);
         });

         it('При взаимодействии снизу - не меняется приложенная сила', () => {
            //у блоков ro = 2, V = 1, m = 2, mu = 0.5

            var block1 = new Game.Block(config);
            var block2 = new Game.Block(config);
   
            block1.fullF = new Vector(10, 5);
   
            block2.respondInteraction(block1, 'bottom');
   
            assert.strictEqual(block1.fullF.x, 10);
            assert.strictEqual(block1.fullF.y, 5);
         });

         it('При взаимодействии слева - не меняется приложенная сила', () => {
            //у блоков ro = 2, V = 1, m = 2, mu = 0.5

            var block1 = new Game.Block(config);
            var block2 = new Game.Block(config);
   
            block1.fullF = new Vector(-10, 5);
   
            block2.respondInteraction(block1, 'left');
   
            assert.strictEqual(block1.fullF.x, -10);
            assert.strictEqual(block1.fullF.y, 5);
         });

         it('При взаимодействии справа - не меняется приложенная сила', () => {
            //у блоков ro = 2, V = 1, m = 2, mu = 0.5

            var block1 = new Game.Block(config);
            var block2 = new Game.Block(config);
   
            block1.fullF = new Vector(10, 5);
   
            block2.respondInteraction(block1, 'right');
   
            assert.strictEqual(block1.fullF.x, 10);
            assert.strictEqual(block1.fullF.y, 5);
         });
      
      });
   });
*/

});
