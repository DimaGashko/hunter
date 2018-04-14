;(function(global){
   "use strict"

   class Game {
      constructor() {
         this._createParametrs();
         this._init();

         this.start();
      }

      start() {
         this.mapManager.getLevel().then((mapConfig) => {
            console.log(mapConfig);
            
            this._createLevel(mapConfig);

            this.camera.coords = this.level.player.person.getCenter();
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

      _createLevel(levelConfig) {
         var self = this;

         this.level = new Game.Level(levelConfig, {
            isVisible: function() {
               return self.render.isVisible.apply(self.render, arguments);
            },
         });
      }

      _tik() {
         var actors = this.level.objects.actors.concat(this.level.player.person);
         var blocks = this.level.objects.blocks.static;

         this.gravity.use(actors);

         this.level.player.move();
         
         actors.forEach((actor) => {
            actor.updateCoords();
         });

         this.collisions.findAndfix(actors, blocks);
         this.level.player.person.clearStatus();

         this._moveCamera();  

         this.level.findVisible();
         this._rerender();
      }

      _rerender() {
         this.render.render(this.level.getObjectsToRender());
      }

      _moveCamera() {
         this.camera.updateCoords(
            this.level.player.person,
            this.render.metrics.realGameSize
         );

         this.render.setCamera(this.camera.coords);
      }

      _createParametrs() {
         
      }

   }

   global.Game = Game;   
   
}(window));