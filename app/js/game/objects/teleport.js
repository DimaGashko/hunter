;(function(global){
   'use strict'
   
   var DEF = {
      props: {
         x: 0,
         y: -1,
      }
   }
   

   /**
    * Teleport
    *
    * @class
    * @param {object} options - настройки (по умолчанию DEF)
   */
   class Teleport extends Game.Block {
      constructor(options = {}, collisions) {
         options = extend(true, {}, DEF, options);
         super(options, collisions);
      }
      
      respondInteraction(obj, side) {
         super.respondInteraction.apply(this, arguments);
         if (side === 'top') {             
            obj.coords = this.coords.plus(this.teleportMove);
            obj.speed = new Vector();
         } 

      }
 
      _createParametrs() { 
         super._createParametrs.apply(this, arguments);

         this.teleportMove = new Vector(
            this.options.props.x,
            this.options.props.y
         );

         this.coords = this.coords.minus(new Vector(0, 1));
      }

   }
   
   global.Game.Teleport = Teleport;
   

}(window));
