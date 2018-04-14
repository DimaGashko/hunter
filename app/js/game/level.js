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
         this.findVisible()
      }

      findVisible() {
         this._findVisibleBlocks('static');
         this._findVisibleBlocks('dinamic');
         this._findVisibleBlocks('decorates');
         this._findVisibleActors();
      }

      getObjectsToRender() {
         var objects = [this.player.person.convertToRender()];

         ['decorates', 'statis', 'blocks'].forEach(type => {
            this.objects.blocks[type].forEach((obj) => {
               objects.push(obj.convertToRender());
            });
         });

         this.objects.actors.forEach((obj) => {
            objects.push(obj.convertToRender()); 
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
         this.allObjects.actors = this.config.actors.map((item) => {
            var Constr = this.objectTypes[item.type] || Game.Actor;

            return new Constr(item, {
               tile: this.config.tile,
            });
         });
      }

      _findVisibleBlocks(type) {
         var container = this.objects.blocks[type];
         var isVisible = this.options.isVisible;

         container.length = 0; //Очищаем массив
         
         this.allObjects.blocks[type].forEach((chunk) => {
            if (!isVisible(chunk) && 0) return;
            
            chunk.data.forEach((item) => {
               if (!isVisible(item.convertToRender())) return;

               container.push(item);
            });
         });
      }

      _findVisibleActors(type) {
         var container = this.objects.actors;
         var isVisible = this.options.isVisible;

         container.length = 0; //Очищаем массив
         
         this.allObjects.actors.forEach((actor) => {
            if (!isVisible(actor.convertToRender()), 2) return;

            container.push(actor);
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