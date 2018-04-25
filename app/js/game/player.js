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
         this._initEvents();

         setInterval(() => {
            //console.log(this.person.coords)
         }, 5000);
      }

      _init() {
         this._getElements();

         this.person.sprite.addEvent('tileset_load', () => {
            this.person.start();
         });
      }

      _initEvents() { 
         touchDown(this.els.goLeft, () => { 
            this._moves.left = true;
            console.log('down')
         });

         touchDown(this.els.goRight, () => { 
            this._moves.right = true
         });

         touchDown(this.els.goJump, () => { 
            this._moves.jump = true;
         });

         touchUp(this.els.goLeft, () => { 
            this._moves.left = false;
            console.log('up')
         });

         touchUp(this.els.goRight, () => { 
            this._moves.right = false;
         });

         touchUp(this.els.goJump, () => { 
            this._moves.jump = false;
         });
      }

      move() {
         this.person.beforeMove();


         if (keysPress[this.KEYS.left] || this._moves.left) {
            this.person.goToLeft();
         }

         if (keysPress[this.KEYS.right] || this._moves.right) {
            this.person.goToRight();
         }

         if (keysPress[this.KEYS.top] || this._moves.jump) {
            this.person.moveStatus.jump = true;
            this.person.moveParametrs.jump = true;
         }

         this.person.afterMove();
      }

      _getElements() { 
         this.els.goLeft = document.querySelector('.game__move_left');
         this.els.goRight = document.querySelector('.game__move_right');
         this.els.goJump = document.querySelector('.game__move_jump');
      }
   

      //Создает основные параметры испльзуемые конструктором
      //options - передаются из конструктора при иницилизации
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         this.els = {};
         
         this.KEYS = {
            top: 87,
            right: 68,
            bottom: 83,
            left: 65,
         };

         this._moves = {
            left: false,
            right: false,
            jump: false
         }

      }
   

   }
   
   global.Game.Player = Player;
   
}(window));
