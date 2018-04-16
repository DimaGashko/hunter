;(function(global){
   "use strict"
   
   //var game = window.g = new Game();

   var render = new Game.Render({
      scale: new Vector(4, 4),
      eachTik: () => {
         tik();
      }
   });

   var gravity = new Game.Gravity({
      g: new Vector(0, 9.8/60/100)
   });

   render.setCamera(new Vector(0, 0));
   render.start();

   var block = new Game.DinamicBlock({
      x: 0,
      y: -80,
      w: 1,
      h: 1,
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

      gravity.use([block]);

      block.updateCoords();

      render.render([

         block.convertToRender(),
      
         {
            x: -2,
            y: -1,
            w: 1,
            h: 1,
         }
      ]);

      if (block.coords.y > 100) block.coords.y = -100; 
   }

}(window));