;(function(global) {
   "use strict"

   var DEF = {
      startLevel: 0,
   }

   class Game extends Events {
      constructor(options) {
         super(...arguments); 
         this._createParametrs(options);
         this._init();
         this._initEvents();
      }

      startLevel() {         
         this.mapManager.getLevel().then((mapConfig) => {
            this.render.stop();

            this._initLevelParametrs();
            
            this.level.startLevel(mapConfig);

            this.camera.coords = this.level.player.person.getCenter();
            this._initHealth();
            
            this.render.start();

            this._updateLevelProgress()

            this._finishReady = true;

            this.trigger('change_level', this.mapManager.curLevel);
         }, () => {
            console.log("Не удалось загрузить уровень");
            this.trigger('error_level_load');
         });
      }

      pause() { 
         this.render.stop();
      }

      start() { 
         this.render.start();
      }

      won() {
         //- - - -
         this.render.stop();
      }

      restart() { 
         this.mapManager.curLevel = 0;
         this.startLevel();
      }
      
      openSecterLevel() {
         this.mapManager.curLevel = this.mapManager.levelCount - 1;
         this.startLevel();
      }   

      //Возвращает индекс текущего уровня
      get curLevel() { 
         return this.mapManager.curLevel;
      }

      //Возвращает кличество уровней в игре
      get levelsCount() { 
         return this.mapManager.options.levelsSrc.length - 1;
         //последный уровень - секретный 
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

         this._initGameParametrs();
      }

      _initGameParametrs() { 
         this.mapManager.curLevel = +this.options.startLevel || 0;
      }

      _initHealth() { 
         this.health.setObject(this.level.player.person);
      }

      _win() { 
         this.trigger('win');   
      }

      _restart() { 
         this.mapManager.curLevel = 0;
         this.startLevel();
      }   

      _nextLevel() { 
         this._initLevelParametrs();

         this.mapManager.nextLevel();
         this.startLevel();
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

            this.startLevel();
         });
      }

      _onFinish(object) { 
         if (!this._finishReady) return; 
            this._finishReady = false;

            if (!this._isPlayer(object)) { 
               return;
            };
            
            if (this._coinsFind < this._coinsCount) {
               //Приход на финиш до сбора всех предметов
               this.trigger('early_on_finish');
               this._onFinishTimout();
               return;
            }

            if (this.isLastMap()) {
               this._win();
               this._onFinishTimout();
            } else { 
               this._nextLevel();
            }
      }

      isLastMap() { 
         return this.mapManager.curLevel === this.mapManager.levelCount - 2;
         //Последний уровень - секретный
      }

      _isPlayer(obj) { 
         return this.level.player.person === obj;
      }

      _tik(dilation) {
         this.level.findVisible();
      
         var dinamicObjects = this.level.getDinamicObjects();

         this.level.player.move();

         this.worldBorders.use(dinamicObjects);

         dinamicObjects.forEach(obj => obj.tik(dilation));  
         this.level.objects.blocks.static.forEach(obj => obj.tik(dilation));  

         this.collisions.setDinamicObjects(dinamicObjects); 
         this.collisions.setStaticObjects(this.level.objects.blocks.static);

         this.gravity.use(dinamicObjects, dilation);
            
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
         this._updateCoinsProgress();
      }

      _findedCoins(n) { 
         this._coinsFind += n;
         this._updateCoinsProgress();

         this._finishReady = true;
      }

      _updateCoinsProgress() { 
         this.els.coinsProgress.innerHTML =
            `${this._coinsFind}/${this._coinsCount}`;
      }

      _updateLevelProgress() { 
         this.els.levelProgress.innerHTML =
            `${this.curLevel + 1}/${this.levelsCount}`;
      }

      _initLevelParametrs() { 
         this._finishReady = false;
         this._coinsCount = 0;
         this._coinsFind = 0;
      }

      _getElements() { 
         var root = this.els.root = document.querySelector('.game');

         this.els.coinsProgress = root.querySelector('.coins_progress');
         this.els.levelProgress = root.querySelector('.level_progress');
      }

      //Разрешает прийты на финиш через некоторое время
      _onFinishTimout() { 
         setTimeout(() => { 
            this._finishReady = true; 
         }, 5000);
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);

         this.els = {};

         this._initLevelParametrs()
      }

   }

   global.Game = Game;   
   
}(window));