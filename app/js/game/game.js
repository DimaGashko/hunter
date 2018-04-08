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
         this._movePlayer();
         this._moveCamera();  

         this.level.findVisibleObjects();
         this._rerender();
      }

      _rerender() {
         this.render.render(this.level.getObjectsToRender());
      }

      _moveCamera() {
         var player = this.level.player;

         this.camera.coords = player.coords.plus(player.size.div(2));
         this.render.setCamera(this.camera.coords);
      }

      _movePlayer() {
         var player = this.level.player;
         
         if (this.keysPress[this.KEYS.left]) {
            player.goToLeft();
         }
         if (this.keysPress[this.KEYS.right]) {
            player.goToRight();
         }
         if (this.keysPress[this.KEYS.top]) {
            player.jump();
         }
         if (this.keysPress[this.KEYS.bottom]) {
            player.coords.y += 0.2;
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