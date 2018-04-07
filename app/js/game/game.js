;(function(global){
   "use strict"

   class Game {
      constructor() {
         this._createParametrs();
         this._init();
         this._initEvents();

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
            },
            beforeRender: () => {
               this._beforeRender();
            }
         });

         this.levelManager = new Game.LevelManager({
            
         });

         this.camera = new Game.Camera();
      }

      _initEvents() {
         global.addEventListener('keydown', (event) => {
            this.keysPress[event.keyCode] = true;
         });

         global.addEventListener('keyup', (event) => {
            this.keysPress[event.keyCode] = false;
         });
      }

      _beforeRender() {
         this. _movePlayer();
         this._moveCamera();
      }

      _moveCamera() {
         var player = this.level.player;

         this.camera.x = player.x + player.w / 2;
         this.camera.y = player.y + player.h / 2;
      }

      _movePlayer() {
         var player = this.level.player;
         
         if (this.keysPress[this.KEYS.left]) {
            player.x -= 0.2;
         }
         if (this.keysPress[this.KEYS.top]) {
            player.y -= 0.2;
         }
         if (this.keysPress[this.KEYS.right]) {
            player.x += 0.2;
         }
         if (this.keysPress[this.KEYS.bottom]) {
            player.y += 0.2;
         }
      }

      _getRenderConfig() {
         return {
            camera: this.camera,
            objects: this.level.getAllObjects(),
         }
      }

      _createParametrs() {
         this.keysPress = {};

         this.KEYS = {
            top: 87,
            right: 68,
            bottom: 83,
            left: 65,
         };
      }

   }

   global.Game = Game;   
   
}(window));