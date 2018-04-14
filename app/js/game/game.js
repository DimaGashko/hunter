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
         this.mapManager.getLevel().then((levelConfig) => {
            this._createLevel(levelConfig);

            this.camera.coords = this.level.player.getCenter();
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
            eachTik: () => {
               this._tik();
            }
         });

         this.mapManager = new Game.MapManager();
         this.camera = new Game.Camera({
            type: 'smart',
         });

         this.gravity = new Game.Gravity;
         this.collisions = new Game.Collisions;
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
         var actors = this.level.visibleObjects.actors;
         var blocks = this.level.visibleObjects.blocks;

         this.gravity.use(actors);
         this._movePlayer();
         
         actors.forEach((actor) => {
            actor.updateCoords();
         });

         this.collisions.findAndfix(actors, blocks);
         this.level.player.clearStatus();

         this._moveCamera();  

         this.level.findVisibleObjects();
         this._rerender();
      }

      _rerender() {
         this.render.render(this.level.getObjectsToRender());
      }

      _moveCamera() {
         this.camera.updateCoords(
            this.level.player,
            this.render.metrics.realGameSize
         );

         this.render.setCamera(this.camera.coords);
      }

      _movePlayer() {
         var player = this.level.player;
         
         if (this.keysPress[this.KEYS.left]) {
            //player.status.left = true;
            player.goToLeft()
         }
         if (this.keysPress[this.KEYS.right]) {
            //player.status.right = true;
            player.goToRight();
         }
         if (this.keysPress[this.KEYS.top]) {
            player.status.jump = true;
            //player.jump()
         }
         if (this.keysPress[this.KEYS.bottom]) {
            //player.speed.y += 0.01;
         }

         /*if (this.keysPress[13]) {
            player.coords.x += 1 * (player.speed.x > 0 ? 1 : -1);
         }
         if (this.keysPress[32]) {
            player.coords.y += 1 * (player.speed.y > 0 ? 1 : -1);                                                                    
         }*/
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