;(function(global){
   'use strict'
   
   var DEF = {
      damage: 50,
      maxY: 250,
   }
   

   /**
    * WorldBorders - границы мира
    * Убивает всех, кто находится ниже maxY (вниз y увеличивается)
    *
    * @class
    * @param {object} options - настройки (по умолчанию DEF)
   */
   class WorldBorders {
      constructor(options = {}) {
         this._createParametrs(options);
      }

      /**
       * Применяет ограничения переданным объектам
       * 
       * @param {Array<Actor>} objects объекты, к которым 
       * нужно применить ограничения 
       */
      use(objects) { 
         for (var i = objects.length - 1; i >= 0; i--) {
            this._useBy(objects[i]);
         }
      }

      /**
       * 
       * @param {Actor} object 
       */
      _useBy(object) { 
         if (object.coords.y > this.options.maxY) { 
            var armor = object.armor;
            var min = object.minDamage;
            object.pain(100 + armor + min);
         }
      }
   
      //Создает основные параметры испльзуемые конструктором
      //options - передаются из конструктора при иницилизации
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
      
   

      }
   

   }
   
   global.Game.WorldBorders = WorldBorders;
   

}(window));
