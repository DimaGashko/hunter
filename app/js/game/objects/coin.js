;(function(global){
   "use strict"

   var DEF = {
      springSpeed: 0.08,
      springDist: 0.1,
   }

   /**
    * Класс ценных предметов
    * 
    * @class
    */
   class Coin extends Game.Block {
      constructor(options, collisions) {
         options = extend(true, {}, DEF, options);
         super(options, collisions);

         globalEvents.trigger('game_add_coins', 1);
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
         globalEvents.trigger('removed_coin', this);
         globalEvents.trigger('game_remove_coins', 1);
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