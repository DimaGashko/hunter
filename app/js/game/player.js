;(function(global){
   "use strict"

   class Player extends Game.Actor {
      constructor(config = {}, options = {}) {
         super(config, options);
         
      }

   }
   
   global.Game.Player = Player;   
   
}(window));