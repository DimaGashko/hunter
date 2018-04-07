;(function(global){
   "use strict"

   class Block {
      constructor(config = {}) {
         this._createParametrs(config);
      }

      _createParametrs(config) {
         this.x = config.x;
         this.y = config.y;
         this.w = config.w;
         this.h = config.h;

         this.img = null;
         this.animation = config.animation;
      }

   }
   
   global.Game.Block = Block;   
   
}(window));