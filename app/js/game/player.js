;(function(global){
   "use strict"

   class Player extends Game.Block {
      constructor(config = {}, options = {}) {
         super(config, options);
         
      }

   }
   
   global.Game.Player = Player;   
   
}(window));