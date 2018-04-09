;(function(global){
   "use strict"

   class Gravity {
      constructor() {
         this._createParametrs();
      }

      use(actors) {
         actors.forEach((actor) => {
            actor.speed = actor.speed.plus(this.g);
         });
      }
      
      _createParametrs() {
         this.g = new Vector(0.1, -9.8/60/10);
      }

   }
   
   Object.defineProperty(Gravity.prototype, 'type', {
      value: 'gravity',
   });

   global.Game.Gravity = Gravity;   
   
}(window));