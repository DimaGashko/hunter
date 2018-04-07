;(function(global){
   "use strict"

   class Game {
      constructor() {
         _this.init();

         this.render.start();
      }

      _init() {
         this.render = new Game.Render({
            getRenderConfig: () => {
               return this.getRenderConfig();
            }
         });
      }

      getRenderConfig() {
         return {
            camera: {
               x: 0,
               y: 0,
            },
            objects: [
               {x: 1, y: 1, w: 1, h: 1},
               {x: 3, y: 3, w: 25, h: 2},
               {x: 3, y: -3, w: 1, h: 1},
               {x: -5, y: 10, w: 1, h: 3},
               {x: -10, y: 3, w: 3, h: 2},
               {x: 20, y: 5, w: 5, h: 1}
            ],
         }
      }
   }
   
   global.Game = Game;   
   
}(window));