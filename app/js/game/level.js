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

         this.config = {};

         window.level = this;
      }

      _createBlocks(chunkName) {
         this[chunkName] = this.config[chunkName].map(chunk => {
            return {
               x: chunk.x,
               y: chunk.y,
               data: chunk.data.map(item => {
                  return new Game.Block(item);
               }),
            }
         });
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);

         this.blocks = [];
         this.decorates = [];
      }

   }
   
   global.Game.Level = Level;   
   
}(window));