;(function(global){
   'use strict'
   
   var DEF = {
      personConfig: {},
   }
   
   /**
    * Player
    *
    * @constructor
    * @param {object} options - настройки (по умолчанию DEF)
   */
   class Player {
      constructor(options = {}) {
         this._createParametrs(options);
         this._init();

         setInterval(() => {
            console.log(this.person.coords)
         }, 5000);
      }

      _init() {
         var config = this.options.personConfig;
         console.log('--', config)
         this.person = new Game.Actor({
            animation: [{
               duration: 0,
               id: 37,
               startX: 160,
               startY: 64
            }],
            x: config.x / 32,
            y: config.y / 32,
            w: 1,
            h: 1
         }, {
            tile: {w: 32, h: 32, src: "img/minecraft-sprite.png"}   
         });
      }

      move() {
         if (keysPress[this.KEYS.left]) {
            //this.person.goToLeft();
            this.person.moveStatus.goToLeft = true;
         }

         if (keysPress[this.KEYS.right]) {
            //this.person.goToRight();
            this.person.moveStatus.goToRight = true;
         }

         if (keysPress[this.KEYS.top]) {
            //this.person.jump()
            this.person.moveStatus.jump = true;
         }
      }
   

      //Создает основные параметры испльзуемые конструктором
      //options - передаются из конструктора при иницилизации
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         this.person = null;
         
         this.KEYS = {
            top: 87,
            right: 68,
            bottom: 83,
            left: 65,
         };

      }
   

   }
   
   global.Game.Player = Player;
   
}(window));
