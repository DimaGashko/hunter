;(function(global){
   'use strict'

   /**
    * Events - класс, реализующий события
    *
    * @class
    * 
    * Использование:
    * 1) Можно задавать явно:
    * 
    * var events = new Events();
    * events.addEvent('eventName', () => {
    *    console.log('ok');
    * })
    * event.trigger('eventName');
    * 
    * -----------------------------------------------------
    * 2) Также можно наследовать от Events в своих классах:
    * 
    * class A extends Events {...}
    * 
    * В таком случае класс А будет обретать все возможности Events
    * 
    * var a = new A();
    * a.addEvent('eventName', () => {
    *    console.log('ok');
    * })
    * a.trigger('eventName');
    * 
   */
   class Events {
      constructor() {         
         //Хранит все вызываемые функции при наступлении событий
         //Все хранятся в свойстве с названием события
         //Функции хранятся в массиве
         //Например: {load: [f1, f2, f3]}
         this._handlers = {}
      }
      
      /**
       * Добавляет событие
       * Записывает функцию в массив this._handlers[type]
       * Если такого события еще не было (нет свойства type - добавляет)
       * 
       * @param {string} type тип события
       * @param {function} handler фунцкия, которую нужно выполнить
       */
      addEvent(type, handler) { 
         this._handlers[type] = this._handlers[type] || [];
         this._handlers[type].push(handler);
      }

      /**
       * Вызывает переданное событие
       * 
       * @param {string} type тип события
       * 
       * Все параметры после первого будут переданны во все handler-ы
       */
      trigger(type/*[, parametrs]*/) { 
         //На такое событие не подписывались
         if (!this._handlers[type]) return;

         var args = Array.from(arguments).slice(1);
         
         this._handlers[type].forEach((handler) => { 
            handler.apply(null, args);
         });
      }
   }
   
   global.Events = Events;
   

}(window));
