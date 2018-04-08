;(function(global){
   "use strict"

   class Actor extends Game.Block {
      constructor(config = {}, options = {}) {
         super(config, options);
      }

      goToLeft() {
         this.speed.x -= this.a.x;
      }

      goToRight() {
         this.speed.x += this.a.x;
      }

      jump() {
         this.speed.y -= this.a.y;
      }

      updateCoords(times = 1) {
         this._correctSpeed();
         this.coords = this.coords.plus(this.speed.mul(times));
      }

      _correctSpeed() {
         var speed = this.speed;
         var max = this.maxSpeed;
         var min = this.minSpeed;

         if (speed.x > max.x) speed.x = max.x;
         else if (speed.x < min.x) speed.x = min.x;

         if (speed.y > max.y) speed.y = max.y;
         else if (speed.y < min.y) speed.y = min.y;

         this.speed = this.speed.div(10);
      }

      _createParametrs() {
         super._createParametrs.apply(this, arguments);

         this.speed = new Vector(0, 0);

         this.maxSpeed = new Vector(2/60, 10/60);
         this.minSpeed = new Vector(-2/60, -5/60);

         this.a = new Vector(0.01, 0.1);
         this.gravity = new Vector(0, 0);
      }

   }

   Object.defineProperty(Actor.prototype, 'type', {
      value: 'actor',
   });
   
   global.Game.Actor = Actor;   
   
}(window));