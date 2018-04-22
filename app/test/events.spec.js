'use strict';

describe('Класс Events', () => {
   describe('Конструктор new Events()', () => {
      it('Содержит свойство _handlers', () => {
         var events = new Events();

         assert.isTrue('_handlers' in events);
      });
      
   });

   describe('Подписка на события', () => {
      it('Подписка на события без параметров', () => {
         var events = new Events();

         var val = 10;

         events.addEvent('test', () => { 
            val = 20;
         });

         events.trigger('test');

         assert.strictEqual(val, 20);
      });

      it('Подписка на события с одним параметром', () => {
         var events = new Events();

         var val = 10;

         events.addEvent('test', (newVal) => { 
            val = newVal;
         });

         events.trigger('test', 50);

         assert.strictEqual(val, 50);
      });

      it('Подписка на события с несколькими параметрами', () => {
         var events = new Events();

         var val1 = 10;
         var val2 = 20;

         events.addEvent('test', (_val1, _val2) => { 
            val1 = _val1;
            val2 = _val2;
         });

         events.trigger('test', 50, 100);

         assert.strictEqual(val1, 50);
         assert.strictEqual(val2, 100);
      });

      it('Несколько подписок на одно событие', () => {
         var events = new Events();

         var val1 = 10;
         var val2 = 50;

         events.addEvent('test', (newVal) => { 
            val1 = newVal;
         });

         events.addEvent('test', (newVal) => { 
            val2 = newVal;
         });

         events.trigger('test', 100);

         assert.strictEqual(val1, 100);
         assert.strictEqual(val2, 100);
      });
      
   });

});
