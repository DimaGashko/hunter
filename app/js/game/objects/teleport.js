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
            console.log('asdf');
            
            obj.coords.x = this.coords.x + this.options.props.x;
            obj.coords.y = this.coords.y + this.options.props.y;
         }
      }

   }
   
   global.Game.Teleport = Teleport;
   

}(window));
