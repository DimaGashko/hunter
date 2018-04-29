;(function(global){
   'use strict'
   
   var DEF = {
      
   }
   

   /**
    * Health
    *
    * @class
    * @param {object} options - настройки (по умолчанию DEF)
   */
   class Health {
      constructor(options = {}) {
         this._createParametrs(options);
         this._init();

         console.log('Helth');
         
      }

      /**
       * Устанавливает actor, за жизнями которого нужно следить
       * 
       * @param {Actor} actor 
       */
      setObject(actor) { 
         this.actor = actor;

         this._initActorEvents();
         this.update();
      }

      /**
       * Обновляет значение жизней actor-а
       */
      update() {
         this.root.innerHTML = this.getHealthPercent() + '%';
      }

      getHealthPercent() { 
         return Math.round(this.actor.health / this.actor.fullHealth * 100)
      }

      _init() {
         this._getHTMLElements();
      }  

      _getHTMLElements() { 
         var r = this.root = document.querySelector('.health');
      }
   
      //Иницилизирует события
      _initActorEvents() {
         this.actor.addEvent('pain', () => { 
            this.update();
         })
      }
   

      //Создает основные параметры испльзуемые конструктором
      //options - передаются из конструктора при иницилизации
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
      
         this.els = {};

         this.actor = null;

      }
   

   }
   
   global.Game.Health = Health;

}(window));
