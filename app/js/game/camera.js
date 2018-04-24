;(function(global){
   "use strict"

   var DEF = {
      type: 'smart',
      offsetScale: new Vector(0.3, 0.2),
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
   var m = Camera._moveMethods = {}; 
   
   (function () { 

      m.simple = function(camera, player) {
         camera.coords = player.getCenter();
      }

   }());  
   
   (function () { 

      m.smart = function(camera, player, gameSize) {
         var offset = gameSize.scale(camera.options.offsetScale).scalarAbs();
         
         var center = player.getCenter();
            
         //Horizontal;
         if (center.x > camera.coords.x + offset.x) {
            camera.coords.x = center.x - offset.x;

         } else if (camera.coords.x > center.x + offset.x) {
            camera.coords.x = center.x + offset.x;
         }

         //Vectical
         if (center.y > camera.coords.y + offset.y) {
            camera.coords.y = center.y - offset.y;

         } else if (camera.coords.y > center.y + offset.y) {
            camera.coords.y = center + offset.y;
         }

      }

   }());  
   
   global.Game.Camera = Camera;   
   
}(window));