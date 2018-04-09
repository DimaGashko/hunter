;(function(global){
   "use strict"

   var created = false;

   class Player extends Game.Block {
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
         this.prevCoords = this.coords.copy();
         
         this._correctSpeed();
         //console.log(this.speed.x, this.speed.y);
         
         //this.speed.mul(times);
         this.coords = this.coords.plus(this.speed);
      }

      _correctSpeed() {
         var speed = this.speed;
         var max = this.maxSpeed;
         var min = this.minSpeed;

         if (speed.x > max.x) speed.x = max.x;
         else if (speed.x < min.x) speed.x = min.x;

         if (speed.y > max.y) speed.y = max.y;
         else if (speed.y < min.y) speed.y = min.y;
         
         //this.speed = this.speed.div(2);
      }

      _createParametrs() {
         super._createParametrs.apply(this, arguments);

         this.speed = new Vector(0, 0);

         this.maxSpeed = new Vector(4/60, 1/60);
         this.minSpeed = new Vector(-4/60, -1/60);

         this.a = new Vector(0.01, 1);
      }

   }
   
   Object.defineProperty(Player.prototype, 'type', {
      value: 'player',
   });

   global.Game.Player = Player;   
   
}(window));