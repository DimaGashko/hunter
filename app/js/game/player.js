;(function(global){
   'use strict'
   
   var DEF = {
      
   }
   

   /**
    * Player
    *
    * @constructor
    * @param {object} options - настройки (по умолчанию DEF)
   */
   class A {
      constructor(options = {}) {
         this._createParametrs(options);
         this._init();
         this._initEvents();
      }
   

      _init() {
         
      }
   
      //Иницилизирует DOM-события
      _initEvents() {
      
      }
   

      //Создает основные параметры испльзуемые конструктором
      //options - передаются из конструктора при иницилизации
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         this.person = null;
   

      }
   

   }
   
   global.Game.Player = Player;
   

}(window));
