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
      constructor(person, options = {}) {
         this.person = person;

         this._createParametrs(options);
         this._init();

         setInterval(() => {
            //console.log(this.person.coords)
         }, 5000);
      }

      _init() {
         this.person.sprite.addEvent('tileset_load', (sprite) => {
            sprite.start();
         });
      }

      move() {
         if (keysPress[this.KEYS.left]) {
            this.person.moveStatus.goToLeft = true;
            this.person.goToLeft();
         }

         if (keysPress[this.KEYS.right]) {
            this.person.moveStatus.goToRight = true;
            this.person.goToRight();
         }

         if (keysPress[this.KEYS.top]) {
            this.person.moveStatus.jump = true;
            //this.person.jump()
         }
      }
   

      //Создает основные параметры испльзуемые конструктором
      //options - передаются из конструктора при иницилизации
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         
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
