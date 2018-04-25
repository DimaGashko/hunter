;(function(global){
   "use strict"

   var DEF = {
      springSpeed: 0.08,
      springDist: 0.1,
   }

   class Coin extends Game.Block {
      constructor(options, collisions) {
         options = extend(true, {}, DEF, options);
         super(options, collisions);
      }

      tik() { 
         super.tik.apply(this, arguments);
         this._animate();

      }

      _animate() { 
         this.coords = this._getNextCoords();
      }

      _getNextCoords() { 
         this.updateSpring();

         return this._startCoords.plus(this.getSpringVector());
      }

      getSpringVector() {
         return new Vector(
            0,
            Math.sin(this.spring) * this.options.springDist
         );
      }

      updateSpring() {
         this.spring += this.options.springSpeed;
      }

      respondInteraction(obj, side) {
         this.size = new Vector(0, 0);
      }

      _createParametrs() {
         super._createParametrs.apply(this, arguments);

         this._startCoords = this.coords.copy();
         this.spring = Math.random() * Math.PI * 2;
      }

   }

   Object.defineProperty(Coin.prototype, 'type', {
      value: 'coin',
   });
   
   global.Game.Coin = Coin;   
   
}(window));