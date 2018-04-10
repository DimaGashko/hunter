;(function(global){
   "use strict"

   var created = false;

   class Player extends Game.Actor {
      constructor(config = {}, options = {}) {
         if (created) {
            throw new Error('Игрок уже созда');
         }
         config.w = 1;
         config.h = 1;
         super(config, options);
         console.log('player')
         setInterval(() => {
            //console.log(this.speed);
            //console.log(this.coords.x ^ 0, this.coords.y ^ 0)
         }, 500);
      }

   }
   
   Object.defineProperty(Player.prototype, 'type', {
      value: 'player',
   });

   global.Game.Player = Player;   
   
}(window));