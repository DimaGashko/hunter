;(function(global){
   "use strict"

   class Game {
      constructor() {
         this._init();

         this.render.start();
      }

      _init() {
         this.render = new Game.Render({
            getRenderConfig: () => {
               return this.getRenderConfig();
            }
         });

         global.img = new Image();
         global.img.src = 'favicon.png';
      }

      getRenderConfig() {
         return {
            camera: {
               x: 0,
               y: 0,
            },
            objects: [
               {x: 1, y: 1, w: 1, h: 1},
               {x: 3, y: 10, w: 2, h: 2},
               {x: 3, y: 3, w: 1, h: 1},
               {x: 5, y: 15, w: 1, h: 3},
               {x: 10, y: 3, w: 3, h: 2},
               {x: 20, y: 5, w: 5, h: 1},
               {x: 50, y: 20, w: 10, h: 10, img: global.img}
            ],
         }
      }
   }
   
   global.Game = Game;   
   
}(window));