;(function(global){
   'use strict'
   
   var DEF = {
      
   }
   

   /**
    * Finish
    *
    * @class
    * @param {object} options - настройки (по умолчанию DEF)
   */
   class Finish extends Game.Block {
      constructor(options = {}) {
         options = extend(true, {}, DEF, options);
         super(options);

         console.log('Finish');
      }

      respondInteraction(obj, side) { 
         super.respondInteraction.apply(this, arguments);
         console.log('Finish', side);
      }
   
      _init() {
         super._init.apply(this, arguments);
      }
   

      //Создает основные параметры испльзуемые конструктором
      //options - передаются из конструктора при иницилизации
      _createParametrs(options) {
         super._createParametrs.apply(this, arguments);
         

      }   

   }

   Object.defineProperty(Finish.prototype, 'type', {
      value: 'finish',
   });
   
   global.Game.Finish = Finish;   

}(window));
