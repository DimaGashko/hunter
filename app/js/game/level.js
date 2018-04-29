;(function(global){
   "use strict"

   var DEF = {
      isVisible: () => {
         return true;
      },
   }

   class Level {
      constructor(game, options = {}) {
         this._createParametrs(options);
         this.game = game;

         this._init();
         this._initEvents();
      }

      startLevel(config = {}) { 
         this.config = config;

         this._initContainers();
         this._createAllObjects();
         this.findVisible();

         this.config = {};
      }

      _init() {
         
      }

      _initEvents() { 
         globalEvents.addEvent('removed_coin', (coin) => { 
            this._removeCoin(coin);
         });
      }

      /**
       * Возвращает все динамические (те на которые действует сила тяжести) 
       * объекты (возвращаются только объекты, отобранные методом findVisible())
       */
      getDinamicObjects() { 
         var objects =  this.objects.actors.concat(
            this.objects.blocks.dinamic || []
         );

         objects.push(this.player.person);
         
         return objects;
      }

      findVisible() {
         this._findVisibleBlocks('static');
         this._findVisibleBlocks('dinamic');
         this._findVisibleBlocks('decorates');
         this._findVisibleActors();
      }

      getObjectsToRender() {
         return [this.player.person.convertToRender()].concat(
            this._getActorsForRender(),
            this._getBlocksForRender('dinamic'),
            this._getBlocksForRender('static'),
            this._getBlocksForRender('decorates')
         );

      }

      _getActorsForRender() { 
         var actors = this.objects.actors;
         var res = [];

         for (var i = actors.length - 1; i >= 0; i--) {
            res.push(actors[i].convertToRender());
         }
         
         return res;
      }

      _getBlocksForRender(type = 'static') { 
         var blocks = this.objects.blocks[type];
         var res = [];

         for (var i = blocks.length - 1; i >= 0; i--) {
            res.push(blocks[i].convertToRender());
         }
         
         return res;
      }

      _createAllObjects() {
         this._createBlocks('static');
         this._createBlocks('dinamic', Game.DinamicBlock);
         this._createBlocks('decorates');
         
         this._createActors();

         this._createPlayer();
      }

      _createBlocks(type, defConstr) {
         var container = this.allObjects.blocks[type];
         var chunks = this.config.blocks[type];

         for (var i = chunks.length - 1; i >= 0; i--) {
            var chunk = chunks[i];
            
            var blocks = new Array(chunk.data.length);
            
            for (var j = chunk.data.length - 1; j >= 0; j--) {
               var Constr = this.objectTypes[chunk.data[j].type]
                  || defConstr || Game.Block;
               
               blocks[j] = new Constr(chunk.data[j], this.game.collisions);
            }

            var res = {
               x: chunk.x,
               y: chunk.y,
               w: chunk.w,
               h: chunk.h,
               data: blocks,
            }

            container.push(res);
         }
      }

      _createActors() {
         this.allObjects.actors = this.config.actors.map((item) => {
            var Constr = this.objectTypes[item.type] || Game.Actor;

            return new Constr(item, this.game.collisions);
         });
      }

      _createPlayer() {
         var config = this.config.player;
         
         var Constr = this.objectTypes[config.name] || Game.Actor;
         var person = new Constr(config, this.game.collisions);

         this.player = new Game.Player(person, {});
      }

      _findVisibleBlocks(type) {
         var container = this.objects.blocks[type];
         var isVisible = this.options.isVisible;

         container.length = 0; //Очищаем массив
         
         var blocks = this.allObjects.blocks[type];
         var blocksLen = blocks.length;

         for (var i = 0; i < blocksLen; i++) {
            var chunk = blocks[i];

            if (!isVisible(chunk)) continue;
            
            var dataLen = chunk.data.length; 
            for (var j = 0; j < dataLen; j++) {
               var item = chunk.data[j];

               if (isVisible(item.convertToRender())) { 
                  container.push(item);
                  item.start();
               
               } else {
                  item.stop();
               }
            }
            
         }

      }

      _findVisibleActors(type) {
         var container = this.objects.actors;
         var isVisible = this.options.isVisible;

         container.length = 0; //Очищаем массив
         
         var actors = this.allObjects.actors;

         for (var i = actors.length - 1; i >= 0; i--) {
            var actor = actors[i];

            if (isVisible(actor.convertToRender())) {
               container.push(actor);
               actor.start();

            } else {
               actor.stop();

            }
         }
      
      }
      
      _removeCoin(coin) {
         var chunks = this.allObjects.blocks.static;

         for (var i = chunks.length - 1; i >= 0; i--) {
            var coins = chunks[i].data;

            for (var j = coins.length - 1; j >= 0; j--) {
               if (coins[j] !== coin) continue;

               coins.splice(j, 1);
            }
            
         }
         
      }

      _initContainers() { 
         this.allObjects = {
            blocks: {
               static: [],
               dinamic: [],
               decorates: []
            },
            actors: [],
         }

         this.objects = {
            blocks: {
               static: [],
               dinamic: [],
               decorates: []
            },
            actors: [],
         }
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);

         this.objectTypes = {
            Steve: Game.Steve,
            Sprinter: Game.Sprinter,
            Actor: Game.Actor,
            Coin: Game.Coin,
            Lava: Game.Lava,
            Block: Game.Block,
            Finish: Game.Finish,
         }

      }

   }
   
   global.Game.Level = Level;   
   
}(window));