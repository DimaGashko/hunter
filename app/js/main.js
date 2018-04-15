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
      cadrs: {
         'stand': [{
            metrics: SPRITES['player-stand'],
         }],

         'jump': [{
            metrics: SPRITES['player-jump'],
         }],

         'goToLeft': [{
            metrics: SPRITES['player-go'],
            duration: 200,
            transforms: {
               mirrorX: true,
            },
         }, {
            metrics: SPRITES['player-stand'],
            duration: 200,
            transforms: {
               mirrorX: true,
            },
         }],
         'goToRight': [{
            metrics: SPRITES['player-go'],
            duration: 200,
         }, {
            metrics: SPRITES['player-stand'],
            duration: 200,
         }]
      },
   }); 

   function setSprite() {
      
   }

   function tik() {
      setSprite();

      render.render([{
         x: -1,
         y: -2,
         w: 0.8,
         h: 1.8,
         img: sprite.sprite,
         fillStyle: 'green',
      }]);
   }

   
}(window));