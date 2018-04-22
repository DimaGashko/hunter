;(function(global){
   "use strict"

   class Coin extends Game.Actor {
      constructor(config = {}, options = {}) {
         super(config, options);
      }

      

   }

   Object.defineProperty(Coin.prototype, 'type', {
      value: 'coin',
   });
   
   global.Game.Coin = Coin;   
   
}(window));