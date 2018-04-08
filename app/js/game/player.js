;(function(global){
   "use strict"

   class Player extends Game.Actor {
      constructor(config = {}, options = {}) {
         super(config, options);
         
      }

   }
   
   Object.defineProperty(Player.prototype, 'type', {
      value: 'player',
   });

   global.Game.Player = Player;   
   
}(window));