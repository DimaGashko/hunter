;(function(global){
   "use strict"

   class Game {
      constructor() {
         this._init();

         this.levelManager.getLevel().then((levelConfig) => {
            this._createLevel(levelConfig);
         }, () => {
            console.log("error");
         });

         this.render.start();
      }

      _createLevel(levelConfig) {
         new Game.Level(levelConfig);
      }

      _init() {
         this.render = new Game.Render({
            getRenderConfig: () => {
               return this.getRenderConfig();
            }
         });

         this.levelManager = new Game.LevelManager({
            
         });

         global.img = new Image();
         global.img.src = 'favicon.png';
      }

      getRenderConfig() {
         return {
            camera: {
               x: 50 + 5,
               y: 20 + 5,
            },
            objects: [
               {x: 10, y: -10, w: 1, h: 1},
               {x: -10, y: -10, w: 1, h: 1},
               {x: -10, y: 10, w: 1, h: 1},
               {x: 10, y: 10, w: 1, h: 1},
               {x: 0, y: 0, w: 1, h: 1},
               {x: 2, y: 2, w: 1, h: 1},
               {x: 3, y: 3, w: 2, h: 2},
               {x: 5, y: 5, w: 1, h: 1},
               {x: 6, y: 6, w: 1, h: 1},
               {x: 20, y: 20, w: 5, h: 1},
               {x: 50, y: 20, w: 1.2, h: 1.2, img: global.img}
            ],
         }
      }
   }
   
   global.Game = Game;   
   
}(window));