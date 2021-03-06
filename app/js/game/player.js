;(function(global){
   'use strict'
   
   var DEF = {
      personConfig: {},
   }
   
   /**
    * Player
    *
    * @class
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
      }

      _initEvents() { 
         touchDown(this.els.controls, (target) => {
            if (target.classList.contains('game__move_left')) {
               this._moves.left = true;
               target.classList.add('game__move-active');

            } else if (target.classList.contains('game__move_right')) {
               target.classList.add('game__move-active');
               this._moves.right = true;

            } else {
               this._moves.jump = true; 

            }
         });

         touchUp(this.els.controls, (target) => {
            if (target.classList.contains('game__move_left')) {
               target.classList.remove('game__move-active');
               this._moves.left = false;

            } else if (target.classList.contains('game__move_right')) {
               target.classList.remove('game__move-active');
               this._moves.right = false;

            } else if (target.classList.contains('game__controls')) {
               this._moves.jump = false;

            }
         });
      }

      move() {
         this.person.beforeMove();

         if (this.KEYS.left.some(n => keysPress[n]) || this._moves.left) {
            this.person.goToLeft();
         }

         if (this.KEYS.right.some(n => keysPress[n]) || this._moves.right) {
            this.person.goToRight();
         }

         if (this.KEYS.top.some(n => keysPress[n]) || this._moves.jump) {
            this.person.moveStatus.jump = true;
            this.person.moveParametrs.jump = true;
         }

         this.person.afterMove();
      }

      _getElements() { 
         this.els.controls = document.querySelector('.game__controls');
      }

      //Создает основные параметры испльзуемые конструктором
      //options - передаются из конструктора при иницилизации
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         this.els = {};
         
         this.KEYS = {
            left:    [37, 65],
            right:   [39, 68],
            bottom:  [40, 40],
            top:     [38, 87, 32],
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
