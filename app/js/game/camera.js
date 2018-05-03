;(function(global){
   "use strict"

   var DEF = {
      type: 'smart',
      offsetScale: new Vector(0.1, 0.2),
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
            
         setCamaraByAxis(camera, center, offset, 'x');
         setCamaraByAxis(camera, center, offset, 'y');
      }

      function setCamaraByAxis(camera, playerCenter, offset, axis) {
         if (playerCenter[axis] > camera.coords[axis] + offset[axis]) {
            camera.coords[axis] = playerCenter[axis] - offset[axis];

         } else if (camera.coords[axis] > playerCenter[axis] + offset[axis]) {
            camera.coords[axis] = playerCenter[axis] + offset[axis];
         }
      }

   }());  
   
   global.Game.Camera = Camera;   
   
}(window));