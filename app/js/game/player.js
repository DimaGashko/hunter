;(function(global){
   "use strict"

   class Player extends Game.Actor {
      constructor(config = {}, options = {}) {
         super(config, options);
         setInterval(() => {
            //console.log(this.coords.x ^ 0, this.coords.y ^ 0)
         }, 500);
      }

   }
   
   Object.defineProperty(Player.prototype, 'type', {
      value: 'player',
   });

   global.Game.Player = Player;   
   
}(window));