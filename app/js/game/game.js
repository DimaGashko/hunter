;(function(global){
   "use strict"

   class Game {
      constructor() {
         this._init();

         this.levelManager.getLevel().then((levelConfig) => {
            this._createLevel(levelConfig);
            this.render.start();
            console.timeEnd('create');
         }, () => {
            console.log("error");
         });
      }

      _createLevel(levelConfig) {
         this.level = new Game.Level(levelConfig);
      }

      _init() {
         this.render = new Game.Render({
            getRenderConfig: () => {
               return this._getRenderConfig();
            }
         });

         this.levelManager = new Game.LevelManager({
            
         });

         global.img = new Image();
         global.img.src = 'favicon.png';
      }

      _getRenderConfig() {
         return {
            camera: {
               x: 40,
               y: 20,
            },
            objects: this.level.getAllObjects(),
         }
      }

   }

   global.Game = Game;   
   
}(window));