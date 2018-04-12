;(function(global){
   "use strict"

   var DEF = {
      type: 'smart',

   }

   /**
    * Камера игры
    * 
    * @constructor
    * Управляет областью, которая будет отрисована
    */
   class Camera {
      constructor(options = {}) {
         this.coords = new Vector(0, 0);

         this._createParametrs(options);
      }

      updateCoords(player, gameSize) {
         var method = Camera._moveMethods[this.options.type];
         
         method(this, ...arguments);
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         
         //Если нету переданного метода движения камеры
         if (!(this.options.type in Camera._moveMethods)) {
            console.error(
               'Несуществующий метод движения камеры. Выбран simple'
            );

            this.options.type = 'static';
         }

         console.log(this.options.type, options)
      }

   }

   /**
    * Методы движения камеры
    */
   Camera._moveMethods = {
      simple: function (camera, player) {
         camera.coords = player.coords.plus(player.size.div(2));
      },

      smart: function (camera, player, gameSize) {
         console.log('smart');
      },
   }
   
   global.Game.Camera = Camera;   
   
}(window));