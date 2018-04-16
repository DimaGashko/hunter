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

   describe('Физические свойства', () => {

      describe('Плотность (ro)', () => {
         it('Передается из параметров', () => {
            var block = new Game.Block({
               props: {
                  ro: 2500,
               }
            });

            assert.strictEqual(block.options.props.ro, 2500);
            assert.strictEqual(block.ro, 2500);
         });
      });

      describe('Объем (V)', () => {
         it('Равен умножению размеров (по оси z длина всех блоков - 1)', () => {
            var block = new Game.Block({
               w: 11,
               h: 4
            });

            assert.strictEqual(block.V, 44);
         });

         it('Меняется при изменении размеров', () => {
            var block = new Game.Block({
               w: 11,
               h: 4
            });

            assert.strictEqual(block.V, 44);

            block.size.x = 2;
            assert.strictEqual(block.V, 8);

            block.size.y = 3;
            assert.strictEqual(block.V, 6);
         });

         it('Нельзя поменять напрямую', () => {
            var block = new Game.Block({
               w: 11,
               h: 4
            });

            block.V = 1000;

            assert.strictEqual(block.V, 44);
         });

      });

      describe('Масса (m)', () => {
         it('Равна V*ro', () => {
            var block = new Game.Block({
               w: 11,
               h: 4,
               props: {
                  ro: 1000,
               }
            });

            assert.strictEqual(block.m, (11*4) * 1000);
         });

         it('Меняется при изменении размеров', () => {
            var block = new Game.Block({
               w: 2,
               h: 3,
               props: {
                  ro: 10,
               }
            });

            assert.strictEqual(block.m, 60);

            block.size.x = 3;
            assert.strictEqual(block.m, 90);

            block.size.y = 1;
            assert.strictEqual(block.m, 30);
         });

         it('Меняется при изменении плотности', () => {
            var block = new Game.Block({
               w: 2,
               h: 3,
               props: {
                  ro: 10,
               }
            });

            assert.strictEqual(block.m, 60);

            block.ro = 20;
            assert.strictEqual(block.m, 120);
         });

         it('Нельзя поменять напрямую', () => {
            var block = new Game.Block({
               w: 11,
               h: 4,
               props: {
                  ro: 10,
               }
            });

            block.m = 1000;

            assert.strictEqual(block.m, 440);
         });

      }); 
      
      describe('Коэффициент трения (mu)', () => {
         it('Есть по умолчанию', () => {
            var block = new Game.Block();

            assert(block.mu);
         });

         it('Равен переданному значению', () => {
            var block = new Game.Block({
               props: {
                  mu: 0.1,
               }
            });

            assert.strictEqual(block.mu, 0.1);
         });
      });

      describe('Сумарная сила приложенная к телу (fullF)', () => {
         it('Есть по умолчанию', () => {
            var block = new Game.Block();

            assert(block.mu);
         });

         it('Равен переданному значению', () => {
            var block = new Game.Block({
               props: {
                  mu: 0.1,
               }
            });

            assert.strictEqual(block.mu, 0.1);
         });
      });

      describe('Полное ускорение (fullA)', () => {
         it('Равно fullF/m', () => {
            var block = new Game.Block({

            });

            block.fullF = new Vector(10, 5);

            assert.strictEqual(block.fullA.x, block.fullF.div(block.m).x);
            assert.strictEqual(block.fullA.y, block.fullF.div(block.m).y);
         });

         it('Меняется при изменении значения fullF', () => {
            var block = new Game.Block({
      
            });

            block.fullF = new Vector(10, 5);
            assert.strictEqual(block.fullA.x, block.fullF.div(block.m).x);
            assert.strictEqual(block.fullA.y, block.fullF.div(block.m).y);
            
            block.fullF = new Vector(5, 10);
            assert.strictEqual(block.fullA.x, block.fullF.div(block.m).x);
            assert.strictEqual(block.fullA.y, block.fullF.div(block.m).y);
         });
      });

   });


});
