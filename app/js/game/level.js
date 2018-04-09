;(function(global){
   "use strict"

   var DEF = {
      isVisible: () => {
         return true;
      },
   }

   class Level {
      constructor(config, options = {}) {
         this._createParametrs(options);
         this.config = config;

         this._init();
         this._clearConfig();
      }

      _init() {
         this._createAllObjects();
         this._findPlayer();
         this.findVisibleObjects()
      }

      findVisibleObjects() {
         this._findVisible('blocks');
         this._findVisible('actors');
         this._findVisible('decorates');
      }

      getObjectsToRender() {
         //Сейчас игрок рисуется 2 раза, так как он уже есть в actors
         //(что бы он был на переднем плане)
         var objects = [this.player.convertToRender()];

         ['blocks', 'actors', 'decorates'].forEach(type => {
            this.visibleObjects[type].forEach((obj) => {
               objects.push(obj.convertToRender());
            });
         });

         return objects;

      }

      _createAllObjects() {
         this._createBlocks('blocks');
         this._createBlocks('decorates');
         this._createBlocks('actors');
      }

      _createBlocks(chunkName) {
         this.objects[chunkName] = this.config[chunkName].map(chunk => {
            chunk.data = chunk.data.map(item => {
               var Constr = this.objectTypes[item.type] || (function() {
                  return (chunkName === 'actors') ? Game.Actor : Game.Block;
               }()); 
               
               return new Constr(item, {
                  tile: this.config.tile,
                });
            });

            return chunk;
         });
      }

      _findPlayer() {
         this.objects.actors.forEach(chunk => {
            if (this.player) return;
            chunk.data.forEach(actor => {
               if (this.player) return;
               if (actor.type === 'player') this.player = actor;
            });
         });
      }

      _findVisible(type) {
         var container = this.visibleObjects[type];
         var isVisible = this.options.isVisible;

         container.length = 0; //Очищаем массив
         
         this.objects[type].forEach((chunk) => {
            if (!isVisible(chunk) && 0) return;
            
            chunk.data.forEach((item) => {
               if (!isVisible(item.convertToRender()) && 0) return;

               container.push(item);
            });
         });
      }

      _clearConfig() {
         this.config.blocks = {};
         this.config.actors = {};
         this.config.decorates = {};
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);

         this.objects = {
            blocks: [],
            decorates: [],
            actors: [],
         }

         this.visibleObjects = {
            blocks: [],
            decorates: [],
            actors: [],
         }

         this.objectTypes = {
            Player: Game.Player,
            Block: Game.Block,
         }

      }

   }
   
   global.Game.Level = Level;   
   
}(window));