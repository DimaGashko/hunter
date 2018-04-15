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
   }); 

   function setSprite() {
      var stand = true;

      if (keysPress[KEYS.left]) {
         sprite.start('goToLeft');
         stand = false;
      }

      if (keysPress[KEYS.right]) {
         sprite.start('goToRight');
         stand = false;
      }

      if (keysPress[KEYS.top]) {
         sprite.start('jump');
         stand = false;
      }

      if (stand) {
         sprite.start('stand');
      }
   }

   function tik() {
      setSprite();

      render.render([{
         x: -1,
         y: -2,
         w: 1,
         h: 1,
         img: sprite.sprite,
         fillStyle: 'green',
      }]);
   }

   var KEYS = {
      top: 87,
      right: 68,
      bottom: 83,
      left: 65,
   };
   
}(window));