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
      }

      _init() {
         this._createAllObjects();
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

         ['actors', 'decorates', 'blocks'].forEach(type => {
            this.visibleObjects[type].forEach((obj) => {
               objects.push(obj.convertToRender());
            });
         });

         return objects;

      }

      _createAllObjects() {
         this._createBlocks('static');
         this._createBlocks('dinamic');
         this._createBlocks('decorates');

         this._createActors();
        
      }

      _createBlocks(chunkName) {
         this.objects[chunkName] = this.config.blocks[chunkName].map(chunk => {
            chunk.data = chunk.data.map(item => {
               var Constr = this.objectTypes[item.type] || Game.Block;
               
               return new Constr(item, {
                  tile: this.config.tile,
               });
            });

            return chunk;
         });
      }

      _createActors() {
         console.log(this.config.actors);
         
         this.allObjects.actors = this.config.actors.map((item) => {
            var Constr = this.objectTypes[item.type] || Game.Actor;

            return new Constr(item, {
               tile: this.config.tile,
            });
         });
      }

      _findVisible(type) {
         var container = this.visibleObjects[type];
         var isVisible = this.options.isVisible;

         container.length = 0; //Очищаем массив
         
         this.allObjects.blocks[type].forEach((chunk) => {
            if (!isVisible(chunk) && 0) return;
            
            chunk.data.forEach((item) => {
               if (!isVisible(item.convertToRender()) && item.type !== 'player') return;

               container.push(item);
            });
         });
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);

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

         this.objectTypes = {
            Player: Game.Player,
            Coin: Game.Coin,

            Block: Game.Block,
         }

      }

   }
   
   global.Game.Level = Level;   
   
}(window));