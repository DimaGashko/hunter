;(function(global){
   "use strict"

   class Coin extends Game.Block {
      constructor(options, collisions) {
         super(options, collisions);
      }

      tik() { 
         super.tik.apply(this, arguments);
         
      }

      respondInteraction(obj, side) {
         
      }

   }

   Object.defineProperty(Coin.prototype, 'type', {
      value: 'coin',
   });
   
   global.Game.Coin = Coin;   
   
}(window));