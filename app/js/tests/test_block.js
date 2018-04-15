;(function(global){
   "use strict"
   
   //var game = window.g = new Game();

   var render = new Game.Render({
      scale: new Vector(50, 50),
      eachTik: () => {
         tik();
      }
   });

   var gravity = new Game.Gravity();

   render.setCamera(new Vector(0, 0));
   render.start();

   var block = new Game.Block({
      x: 2,
      y: 1,
      w: 2,
      h: 2,
      animation: [{
         metrics: {
            x: 64,
            y: 0,
            w: 32,
            h: 32,
         },
         duration: 250,
      }, {
         metrics: {
            x: 96,
            y: 0,
            w: 32,
            h: 32,
         },
         duration: 250,
      }],
      tileset: 'img/minecraft-sprite.png',
      tileW: 32,
      tileH: 32,
   });

   function tik() { 
      block.start();

      render.render([

         block.convertToRender(),
      
         {
            x: -2,
            y: -1,
            w: 1,
            h: 1,
         }
      ]);
   }

}(window));