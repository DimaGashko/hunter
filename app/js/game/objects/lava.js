;(function(global){
   'use strict'
   
   var DEF = {
      props: {
         damage: 100,
      }
   }
   

   /**
    * Lava
    *
    * @class
    * @param {object} options - настройки (по умолчанию DEF)
   */
   class Lava extends Game.Block {
      constructor(options = {}, collisions) {
         options = extend(true, {}, DEF, options);
         super(options, collisions);

         console.log('Lava');
      }
      
      respondInteraction(obj, side) {
         this.hurt(obj);
      }

   }
   
   global.Game.Lava = Lava;
   

}(window));
