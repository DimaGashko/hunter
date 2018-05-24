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
      }
      
      respondInteraction(obj, side) {
         this.hurt(obj);
      }

      hurt(obj, startDamage) { 
         var objHurtSize = new Game.Rect();
         objHurtSize.size = obj.size.mul(0.9);
         objHurtSize.setCenter(obj.getCenter());

         if (this.collisions && !this.collisions.intersetObjs(this, objHurtSize)) {
            return;
         }

         super.hurt.apply(this, arguments);
      }

   }
   
   global.Game.Lava = Lava;
   

}(window));
