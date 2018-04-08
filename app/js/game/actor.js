;(function(global){
   "use strict"

   class Actor extends Game.Block {
      constructor(config = {}, options = {}) {
         super(config, options);
         
         this.speed = new Vector(0, 0);
      }

   }
   
   global.Game.Actor = Actor;   
   
}(window));