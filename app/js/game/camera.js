;(function(global){
   "use strict"

   var DEF = {
      type: 'smart',
      offsetScale: new Vector(0.2, 0.3),
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
         this._init();
      }

      updateCoords(player, gameSize) {
         var method = Camera._moveMethods[this.options.type];
         
         method(this, ...arguments);
      }

      _init() {
         this._initMoveMethod();
      }

      _initMoveMethod() {
         var type = this.options.type;

         //Если нету переданного метода движения камеры
         if (!(type in Camera._moveMethods)) {
            console.error(
               'Несуществующий метод движения камеры. Выбран simple'
            );

            this.options.type = 'static';
         }

      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         
      }

   }

   /**
    * Методы движения камеры
    */
   Camera._moveMethods = {
      simple: function (camera, player) {
         camera.coords = player.getCenter();
      },

      smart: function (camera, player, gameSize) {
         var offset = gameSize.scale(camera.options.offsetScale).scalarAbs();
      
         //Horizontal;
         if (player.right > camera.coords.x + offset.x) {
            camera.coords.x = player.right - offset.x;

         }  if (camera.coords.x > player.coords.x + offset.x) {
            camera.coords.x = player.left + offset.x;
         }

         //Vectical
         if (player.bottom > camera.coords.y + offset.y) {
            camera.coords.y = player.bottom - offset.y;

         } if (camera.coords.y > player.coords.y + offset.y) {
            camera.coords.y = player.top + offset.y;
         }

      },
   }
   
   global.Game.Camera = Camera;   
   
}(window));