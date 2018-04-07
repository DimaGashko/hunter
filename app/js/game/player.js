;(function(global){
   "use strict"

   class Player extends Game.Block {
      constructor(config = {}, options = {}) {
         super(config, options);
         console.log(this.options.tile)
      }

   }
   
   global.Game.Player = Player;   
   
}(window));