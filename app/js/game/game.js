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
         this._getElements();

         global.globalEvents = new Events();

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

      _initEvents() { 
         globalEvents.addEvent('game_add_coins', (n) => { 
            this._addedCoins(n);
         });

         globalEvents.addEvent('game_remove_coins', (n) => { 
            this._removedCoins(n);
         });
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

      _addedCoins(n) { 
         this._coinsCount += n;
         this._updateCoinsRest();
      }

      _removedCoins(n) { 
         this._coinsFind += n;
         this._updateCoinsRest();
      }

      _updateCoinsRest() { 
         this.els.coinsStatus.innerHTML =
            `Собрано предметов: ${this._coinsFind} из ${this._coinsCount}`;
      }

      _getElements() { 
         var root = this.els.root = document.querySelector('.game');

         this.els.coinsStatus = root.querySelector('.game__coins');
      }

      _createParametrs() {
         this.els = {};

         this._coinsCount = 0;
         this._coinsFind = 0;
      }

   }

   global.Game = Game;   
   
}(window));