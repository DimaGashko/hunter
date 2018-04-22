;(function(global){
   "use strict"

   var DEF = {
      fillStyle: 'rgba(255,255,0,0.5)', //Цвет при отсутствии tileset-a
   }

   class Steve extends Game.Actor {
      constructor(options = {}) {
         options = extend(true, {}, DEF, options);
         super(options);
         console.log(this.options); 
      }

   }
   
   Object.defineProperty(Steve.prototype, 'type', {
      value: 'Steve',
   });

   global.Game.Steve = Steve;   
   
}(window));