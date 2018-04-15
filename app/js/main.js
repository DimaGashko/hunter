;(function(global){
   "use strict"
   
   //var game = window.g = new Game();

   var render = new Game.Render({
      scale: new Vector(50, 50),
      eachTik: () => {
         tik();
      }
   });

   render.setCamera(new Vector(0, 0));
   render.start();

   var sprite = new Sprite({
      tileset: 'img/sprite.png',
   });

   sprite.start(); 

   function tik() {
      render.render([{
         x: -1,
         y: -2,
         w: 3,
         h: 4,
         img: sprite.canvas,
         fillStyle: 'green',
      }]);
   }

   
}(window));