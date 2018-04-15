;(function(global){
   "use strict"

   var render = new Game.Render({
      scale: new Vector(50, 50),
      eachTik: () => {
         tik();
      }
   });

   render.setCamera(new Vector(0, 0));
   render.start();

   var sprite = new Game.Sprite({
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
            duration: 150,
            transforms: {
               mirrorX: true,
            },
         }, {
            metrics: SPRITES['player-stand'],
            duration: 150,
            transforms: {
               mirrorX: true,
            },
         }],
         'goToRight': [{
            metrics: SPRITES['player-go'],
            duration: 150,
         }, {
            metrics: SPRITES['player-stand'],
            duration: 150,
         }]
      },
      onTilesetLoaded: () => {
         sprite.start('stand');
      }
   }); 

   var types = ['goToLeft', 'goToRight', 'jump', 'stand'];
   var cur = 0;

   setInterval(() => {
      sprite.start(types[cur]);
      cur = (cur + 1) % types.length;
   }, 2500);

   function tik() {
      render.render([{
         x: -1,
         y: -2,
         w: 1,
         h: 1,
         img: sprite.sprite,
      }]);
   }

   var KEYS = {
      top: 87,
      right: 68,
      bottom: 83,
      left: 65,
   };
   
}(window));