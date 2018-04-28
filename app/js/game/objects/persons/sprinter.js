;(function(global){
   "use strict"

   var DEF = {
      
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
               duration: 200,
            }, {
               metrics: SPRITES['sprinter_go_2'],
               duration: 200,
            }, {
               metrics: SPRITES['sprinter_go_3'],
               duration: 200,
            }, {
               metrics: SPRITES['sprinter_go_4'],
               duration: 200,
            }, {
               metrics: SPRITES['sprinter_go_5'],
               duration: 200,
            }, {
               metrics: SPRITES['sprinter_go_6'],
               duration: 200,
            }, {
               metrics: SPRITES['sprinter_go_7'],
               duration: 200,
            }, {
               metrics: SPRITES['sprinter_go_8'],
               duration: 200,
            }],
         }
      }

   }
   
   Object.defineProperty(Steve.prototype, 'type', {
      value: 'Steve',
   });

   global.Game.Steve = Steve;   
   
}(window));