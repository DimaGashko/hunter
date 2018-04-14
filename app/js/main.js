;(function(global){
   "use strict"
   
   var game = window.g = new Game();
   return
   var render = new Game.Render({
      scale: new Vector(50, 50),
      eachTik: () => {
         tik();
      }
   });

   render.start();

   render.setCamera(new Vector(0, 0));

   

   function tik() {
      render.render();
   }

   
}(window));