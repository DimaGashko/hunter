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

   var block = new Game.Block();
   console.log(block.size)
   function tik() { 
      render.render([{
         x: -2,
         y: -1,
         w: 1,
         h: 1,
      },
       
      block.convertToRender()
         
      ]);
   }

}(window));