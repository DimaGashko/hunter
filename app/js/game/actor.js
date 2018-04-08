;(function(global){
   "use strict"

   class Actor extends Game.Block {
      constructor(config = {}, options = {}) {
         super(config, options);
      }

      goToLeft() {
         this.coords.x -= 0.2;
      }

      goToRight() {
         this.coords.x += 0.2;
      }

      jump() {
         this.coords.y -= 0.2;
      }

      _createParametrs() {
         super._createParametrs.apply(this, arguments);

         this.speed = new Vector(0, 0);
         this.a = new Vector(0, 0);
         this.gravity = new Vector(0, 0);
      }

   }
   
   global.Game.Actor = Actor;   
   
}(window));