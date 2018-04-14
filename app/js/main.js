;(function(global){
   "use strict"
   
   //var game = window.g = new Game();

   var render = new Game.Render({
      scale: new Vector(50, 50),
      eachTik: () => {
         tik();
      }
   });

   render.start();

   render.setCamera(new Vector(0, 0));

   var rect = new Game.Rect(-2,-2,4,4)

   function tik() {
      render.render([rect]);
   }

   
}(window));