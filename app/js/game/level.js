;(function(global){
   "use strict"

   var DEF = {
      
   }

   class Level {
      constructor(config, options = {}) {
         this._createParametrs(options);
         this.config = config;
         
         this._createBlocks('blocks');
         this._createBlocks('decorates');

         if (config.player) {
            this.player = new Game.Player(config.player, {
               tile: this.config.tile
            });
         }
         global.l = this;

         this.config.blocks = {};
         this.config.decorates = {};
      }

      getAllObjects() {
         var objects = this._getLayerObjects(this.blocks)
            .concat(this._getLayerObjects(this.decorates));
   
         if (this.player) {
            objects.push(this.player);  
         }

         return objects;
      }

      _createBlocks(chunkName) {
         this[chunkName] = this.config[chunkName].map(chunk => {
            return {
               x: chunk.x,
               y: chunk.y,
               data: chunk.data.map(item => {
                  return new Game.Block(item, {
                     tile:  this.config.tile,
                  }); 
               }),
            }
         });
      }

      _getLayerObjects(layer) {
         var objects = [];

         layer.forEach(chunk => {
            objects = objects.concat(chunk.data);
         });

         return objects;
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);

         this.blocks = [];
         this.decorates = [];
      }

   }
   
   global.Game.Level = Level;   
   
}(window));