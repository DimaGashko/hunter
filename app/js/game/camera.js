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

      smart: function smart (camera, player, gameSize) {
         var offset = gameSize.scale(camera.options.offsetScale).scalarAbs();
         var time = Date.now();
         var backSpeed = 0.02;
         var wait = 2000;
         
         //Horizontal;
         if (player.right > camera.coords.x + offset.x) {
            camera.coords.x = player.right - offset.x;
            smart.changeX = time;
            smart.coordsX = camera.coords.x;

         } else if (camera.coords.x > player.coords.x + offset.x) {
            camera.coords.x = player.left + offset.x;
            smart.changeX = time;
            smart.coordsX = camera.coords.x;

         } else if(time - smart.changeX > wait) {
            console.log(camera.coords.x, smart.coordsX)
            if (player.coords.x > camera.coords.x) {
               camera.coords.x += backSpeed;

               if (camera.coords.x > player.coords.x) {
                  camera.coords.x = player.coords.x;
               }

            } else if (camera.coords.x > player.coords.x) {
               camera.coords.x -= backSpeed;

               if (player.coords.x > camera.coords.x) {
                  camera.coords.x = player.coords.x;
               }

            }
         }

         //Vectical
         if (player.bottom > camera.coords.y + offset.y) {
            camera.coords.y = player.bottom - offset.y;
            smart.changeY = time;
            smart.coordsY = camera.coords.y;

         } else if (camera.coords.y > player.coords.y + offset.y) {
            camera.coords.y = player.top + offset.y;
            smart.changeY = time;
            smart.coordsY = camera.coords.y;
         
         } else if(camera.coords.y != smart.coordsY && time - smart.changeY > wait) {

            if (player.coords.y > camera.coords.y) {
               camera.coords.y += backSpeed;

               if (camera.coords.y > player.coords.y) {
                  camera.coords.y = player.coords.y;
               }

            } else if (camera.coords.y > player.coords.y) {
               camera.coords.y -= backSpeed;

               if (player.coords.y > camera.coords.y) {
                  camera.coords.y = player.coords.y;
               }

            }
         }

      },
   }
   
   global.Game.Camera = Camera;   
   
}(window));