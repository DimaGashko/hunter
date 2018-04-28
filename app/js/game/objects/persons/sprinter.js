;(function(global){
   "use strict"

   var DEF = {
      tileset: 'img/sprite.png',
   }

   /**
    * Игровой персонаж - Спринтер 
    * 
    * @class
    * 
    */
   class Sprinter extends Game.DinamicActor {
      constructor(options = {}, collisions) {
         options = extend(true, {}, DEF, options);
         super(options, collisions);
         console.log('asdf')
      }

      _initConfig() { 
         this._state = 'stand'; //cостояние персонажа (стоит, идет...)
      
         this._cadrsConfig = {
            'stand': [{
               metrics: SPRITES['sprinter_stand'],
            }],

            'jump': [{
               metrics: SPRITES['sprinter_jump'],
            }],

            'go': [{
               metrics: SPRITES['sprinter_go_1'],
               duration: 100,
            }, {
               metrics: SPRITES['sprinter_go_2'],
               duration: 100,
            }, {
               metrics: SPRITES['sprinter_go_3'],
               duration: 100,
            }, {
               metrics: SPRITES['sprinter_go_4'],
               duration: 100,
            }, {
               metrics: SPRITES['sprinter_go_5'],
               duration: 100,
            }, {
               metrics: SPRITES['sprinter_go_6'],
               duration: 100,
            }, {
               metrics: SPRITES['sprinter_go_7'],
               duration: 100,
            }, {
               metrics: SPRITES['sprinter_go_8'],
               duration: 100,
            }],
         }
      }

   }
   
   Object.defineProperty(Sprinter.prototype, 'type', {
      value: 'Sprinter',
   });

   global.Game.Sprinter = Sprinter;   
   
}(window));