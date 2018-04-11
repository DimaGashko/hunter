;(function(global){
   "use strict"

   var DEF = {
      

   }

   /**
    * Камера игры
    * 
    * @constructor
    * Управляет областью, которая будет отрисована
    */
   class Camera {
      constructor(coords = new Vector(0, 0), options = {}) {
         this.coords = coords;

         this._createParametrs(options);
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         

      }

   }
   
   global.Game.Camera = Camera;   
   
}(window));