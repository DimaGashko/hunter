;(function(global){
   "use strict"

   var DEF = {
      fillStyle: 'rgba(255,255,0,0.8)', //Цвет при отсутствии tileset-a

      tileW: 16,
      tileH: 16,

      tileset: 'img/sprite.png',
   }

   /**
    * Игровой персонаж - Стив 
    * 
    * В options обязательно должны быть параметры tileW, tileH
    * Они используются, для привидения размеров персонажа 
    * Из размеров в пикселях к реальным размерам 
    * 
    * @class
    */
   class Steve extends Game.Actor {
      constructor(options = {}) {
         options = extend(true, {}, DEF, options);
         super(options);

         this.size.x = 0.5;
         this.size.y = 2;

         console.log(this.convertToRender())
      }

      _initSprite() { 
         var o = this.options;
         
         this.sprite = new Game.Sprite({
            tileset: o.tileset,
            size: new Vector(16, 32),
            cadrs: {
               base: [{
                  metrics: SPRITES['player_stand'],
                  duration: 0,
               }],
            },
         });
         this.sprite.start();
         this.sprite.addEvent('tileset_load', (sprite) => {
            //sprite.start();
            console.log('load');
         });

      }

   }
   
   Object.defineProperty(Steve.prototype, 'type', {
      value: 'Steve',
   });

   global.Game.Steve = Steve;   
   
}(window));