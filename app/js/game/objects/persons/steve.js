;(function(global){
   "use strict"

   var DEF = {
      tileset: 'img/sprite.png',
   }

   /**
    * Игровой персонаж - Стив 
    * 
    * @class
    * 
    * В options обязательно должны быть параметры tileW, tileH
    * Они используются, для привидения размеров персонажа 
    * Из размеров в пикселях к реальным размерам 
    * 
    * После иницилизации нужно вызвать метод start.
    * Метод start нужно вызвыать, после загрузки тайлсера
    * Например так:
    * 
    * var steve = new Steve({...});
    * 
    * steve.sprite.addEvent('tileset_load', () => {
    *    steve.start();
    * });
    */
   class Steve extends Game.DinamicActor {
      constructor(options = {}, collisions) {
         options = extend(true, {}, DEF, options);
         super(options, collisions);
      }

      _initConfig() { 
         this._state = 'go'; //cостояние персонажа (стоит, идет...)
      
         this._cadrsConfig = {
            'stand': [{
               metrics: SPRITES['steve_stand'],
            }],

            'jump': [{
               metrics: SPRITES['steve_go'],
            }],

            'go': [{
               metrics: SPRITES['steve_go'],
               duration: 200,
            }, {
               metrics: SPRITES['steve_stand'],
               duration: 200,
            }],
            
            'died': [{
               metrics: SPRITES['steve_died'],
            }],
         }
      }

   }
   
   Object.defineProperty(Steve.prototype, 'type', {
      value: 'Steve',
   });

   global.Game.Steve = Steve;   
   
}(window));