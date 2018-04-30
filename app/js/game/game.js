;(function(global){
   "use strict"

   class Game extends Events {
      constructor() {
         super(...arguments);
         this._createParametrs();
         this._init();
         this._initEvents();

         this.start();
      }

      start() {
         this.mapManager.getLevel().then((mapConfig) => {
            this.render.stop();

            this._initLevelParametrs();
            
            this.level.startLevel(mapConfig);

            this.camera.coords = this.level.player.person.getCenter();
            this._initHealth();
            
            this.render.start();
            this._finishReady = true;
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

         var self = this;
         this.level = new Game.Level(this, {
            isVisible: function() {
               return self.render.isVisible.apply(self.render, arguments);
            },
         });

         this.camera = new Game.Camera({
            type: 'smart',
         });
         

         this.gravity = new Game.Gravity();
         this.collisions = new Game.Collisions();
         this.worldBorders = new Game.WorldBorders();
         
         this.health = new Game.Health();
      }

      _initHealth() { 
         this.health.setObject(this.level.player.person);
      }

      _win() { 
         this.trigger('win');   
      }

      _restart() { 
         this.mapManager.curLevel = 0;
         this.start();
      }   

      _penalize() { 
         console.log('Сначала соберите все предметы');
      }

      _nextLevel() { 
         this._initLevelParametrs();

         this.mapManager.nextLevel();
         this.start();
      }

      _initEvents() { 
         globalEvents.addEvent('game_add_coins', (n) => { 
            this._addedCoins(n);
         });

         globalEvents.addEvent('game_remove_coins', (n) => { 
            this._findedCoins(n);
         });
         
         globalEvents.addEvent('on_finish', (object) => {
            this._onFinish(object);
         });

         globalEvents.addEvent('actor_die', (object) => { 
            if (!this._isPlayer(object)) return;

            console.log('Die');

            this.start();
         });
      }

      _onFinish(object) { 
         if (!this._finishReady) return; 
            this._finishReady = false;

            if (!this._isPlayer(object)) { 
               return;
            };
            
            if (this._coinsFind < this._coinsCount) {
               //Штраф, за приход на финиш до сбора всех предметов
               this._penalize(object);
               return;
            }

            if (this.mapManager.isLastMap()) {
               this._win();
            } else { 
               this._nextLevel();
            }
      }

      _isPlayer(obj) { 
         return this.level.player.person === obj;
      }

      _tik(dilation) {
         this.level.findVisible();
      
         var dinamicObjects = this.level.getDinamicObjects();

         this.level.player.move();

         this.worldBorders.use(dinamicObjects);

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

      _findedCoins(n) { 
         this._coinsFind += n;
         this._updateCoinsRest();

         this._finishReady = true;
      }

      _updateCoinsRest() { 
         this.els.coinsStatus.innerHTML =
            `${this._coinsFind}/${this._coinsCount}`;
      }

      _initLevelParametrs() { 
         this._finishReady = false;
         this._coinsCount = 0;
         this._coinsFind = 0;
      }

      _getElements() { 
         var root = this.els.root = document.querySelector('.game');

         this.els.coinsStatus = root.querySelector('.coins__val');
      }

      _createParametrs() {
         this.els = {};

         this._initLevelParametrs()
      }

   }

   global.Game = Game;   
   
}(window));