;(function(global){
   "use strict"

   var DEF = {
      type: 'smart',
      offsetScale: new Vector(0.45, 0.2),
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

      var lastPlayerX;
      var lastPlayerY;
      var timeUpdate;

      m.smart = function(camera, player, gameSize) {
         var offset = gameSize.scale(camera.options.offsetScale).scalarAbs();
         
         //Horizontal;
         if (player.right > camera.coords.x + offset.x) {
            camera.coords.x = player.right - offset.x;

         } else if (camera.coords.x > player.coords.x + offset.x) {
            camera.coords.x = player.left + offset.x;
         }

         //Vectical
         if (player.bottom > camera.coords.y + offset.y) {
            camera.coords.y = player.bottom - offset.y;

         } else if (camera.coords.y > player.coords.y + offset.y) {
            camera.coords.y = player.top + offset.y;
         }

         //Correct
         if (lastPlayerX != player.coords.x) {
            lastPlayerX = player.coords.x;
            timeUpdate = Date.now();
         }
         if (lastPlayerY != player.coords.y) {
            lastPlayerY = player.coords.y;
            timeUpdate = Date.now();
         }

         if (Date.now() - timeUpdate > 0) {
            //stepTo(camera, player);
         }
         
      }

      function stepTo(camera, player) {
         var xStep = Math.abs(player.coords.x - camera.coords.x) / 1000;
         var yStep = Math.abs(player.coords.y - camera.coords.y) / 1000;

         if (player.coords.x > camera.coords.x + 0.1) {
            camera.coords.x += xStep;
         }
         else if (camera.coords.x > player.coords.x + 0.1) {
            camera.coords.x -= xStep;
         }

         if (player.coords.y > camera.coords.y + 0.1) {
            camera.coords.y += yStep;
         }
         else if (camera.coords.y > player.coords.y + 0.1) {
            camera.coords.y -= yStep;
         }

      }

   }());  
   
   global.Game.Camera = Camera;   
   
}(window));




/*
smart: function smart (camera, player, gameSize) {
         var offset = gameSize.scale(camera.options.offsetScale).scalarAbs();
         var time = Date.now();
         var backSpeed = 0.01;
         var wait = 500;    
         
         //Horizontal;
         if (player.right > camera.coords.x + offset.x) {
            camera.coords.x = player.right - offset.x;
            smart.change = time;
            smart.coordsX = camera.coords.x;

         } else if (camera.coords.x > player.coords.x + offset.x) {
            camera.coords.x = player.left + offset.x;
            smart.change = time;
            smart.coordsX = camera.coords.x;

         } else if(camera.coords.x === smart.coordsX && time - smart.change > wait) {
            if (player.coords.x > camera.coords.x) {
               camera.coords.x += backSpeed;

               if (camera.coords.x > player.coords.x) {
                  camera.coords.x = player.coords.x;
               }

               smart.coordsX = camera.coords.x;

            } else if (camera.coords.x > player.coords.x) {
               camera.coords.x -= backSpeed;

               if (player.coords.x > camera.coords.x) {
                  camera.coords.x = player.coords.x;
               }

               smart.coordsX = camera.coords.x;

            }
         }

         //Vectical
         if (player.bottom > camera.coords.y + offset.y) {
            camera.coords.y = player.bottom - offset.y;
            smart.change = time;
            smart.coordsY = camera.coords.y;

         } else if (camera.coords.y > player.coords.y + offset.y) {
            camera.coords.y = player.top + offset.y;
            smart.change = time;
            smart.coordsY = camera.coords.y;
         
         } else if(camera.coords.y === smart.coordsY && time - smart.change > wait) {

            if (player.coords.y > camera.coords.y) {
               camera.coords.y += backSpeed;

               if (camera.coords.y > player.coords.y) {
                  camera.coords.y = player.coords.y;
               }

               smart.coordsY = camera.coords.y;

            } else if (camera.coords.y > player.coords.y) {
               camera.coords.y -= backSpeed;

               if (player.coords.y > camera.coords.y) {
                  camera.coords.y = player.coords.y;
               }

               smart.coordsY = camera.coords.y;

            }
         }

      },



*/