;(function(global){
   "use strict"

   var DEF = {
      fillStyle: 'rgba(255,255,0,0.5)', //Цвет при отсутствии tileset-a
   }

   class Steve extends Game.Actor {
      constructor(config = {}, options = {}) {
         options = extend(true, {}, DEF, options);
         super(options);
      }

   }
   
   Object.defineProperty(Player.prototype, 'type', {
      value: 'Steve',
   });

   global.Game.Steve = Steve;   
   
}(window));