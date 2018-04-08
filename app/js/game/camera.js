;(function(global){
   "use strict"

   class Camera {
      constructor(x = 0, y = 0) {
         this.coords = new Vector(x, y);
      }

   }
   
   global.Game.Camera = Camera;   
   
}(window));