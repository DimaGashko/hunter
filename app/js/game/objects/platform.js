;(function(global){
   'use strict'
   
   var DEF = {
      props: {
         wayX: 2,
         wayY: 0,
         speed: 0.3,
      }
   }
   
   /**
    * Platform
    *
    * @class
    * @param {object} options - настройки (по умолчанию DEF)
   */
   class Platform extends Game.Actor {
      constructor(options = {}, collisions) {
         options = extend(true, {}, DEF, options);
         super(options, collisions);

         console.log('Platform');
      }

      _createParametrs() { 
         this._createParametrs.apply(this, arguments);

         this.way = new Vector(
            this.options.props.wayX,
            this.options.props.wayY,
         );
      }

   }

   Object.defineProperty(Platform.prototype, 'gravity', {
      value: false,
   });
   
   global.Game.Platform = Platform;
   
}(window));
