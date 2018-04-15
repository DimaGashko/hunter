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

   var block = new Game.Block({
      x: 1,
      y: 2,
      w: 2,
      h: 1,
      fillStyle: '',
      
   });

   function tik() {
      render.render([{
         x: -1,
         y: -2,
         w: 3,
         h: 4,
      }]);
   }

   
}(window));