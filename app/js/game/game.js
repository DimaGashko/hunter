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
            eachTik: (dilation) => {
               this._tik(dilation);
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

         this.level = new Game.Level(this, levelConfig, {
            isVisible: function() {
               return self.render.isVisible.apply(self.render, arguments);
            },
         });
      }

      _tik(dilation) {
         this.level.findVisible();
      
         var dinamicObjects = this.level.getDinamicObjects();

         this.level.player.move();

         dinamicObjects.forEach(obj => obj.tik());  
         this.level.objects.blocks.static.forEach(obj => obj.tik());  

         this.collisions.setDinamicObjects(dinamicObjects); 
         this.collisions.setStaticObjects(this.level.objects.blocks.static);

         this.gravity.use(dinamicObjects);

         dinamicObjects.forEach((obj) => {
            obj.updateCoords(dilation);
         });

         this.collisions.findAndfix();

         dinamicObjects.forEach((obj) => {
            obj.clearMoveStatus();
         }); 

         this._moveCamera();
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