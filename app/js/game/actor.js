;(function(global){
   "use strict"

   class Actor extends Game.Block {
      constructor(config = {}, options = {}) {
         super(config, options);
         
      }

   }
   
   global.Game.Actor = Actor;   
   
}(window));