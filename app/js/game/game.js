;(function(global){
   "use strict"

   class Game {
      constructor() {
         this._createParametrs();
         this._init();
         this._initEvents();

         this.start();
      }

      start() {
         this.levelManager.getLevel().then((levelConfig) => {
            this._createLevel(levelConfig);
            this.render.start();
         }, () => {
            console.log("error");
         });
      }

      won() {
         //- - - -
         this.render.stop();
      }

      _init() {
         this.render = new Game.Render({
            beforeRender: () => {
               this._tik();
            }
         });

         this.levelManager = new Game.LevelManager();
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

      _createLevel(levelConfig) {
         var self = this;

         this.level = new Game.Level(levelConfig, {
            isVisible: function() {
               return self.render.isVisible.apply(self.render, arguments);
            },
         });
      }

      _tik() {
         this.level.updateVisibleObjects();

         this._movePlayer();
         this._moveCamera();

         this._rerender();
      }

   _rerender() {
      this.render.setCamera(this.camera);

      this.render.render(this.level.getAllObjects());
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