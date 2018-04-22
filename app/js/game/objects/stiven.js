;(function(global){
   "use strict"

   var created = false;

   class Stiven extends Game.Actor {
      constructor(config = {}, options = {}) {
         if (created) {
            throw new Error('Игрок уже созда');
         }
         
         super(config, options);
      }

      _setFaceColor() {
         this.fakeColor = 'rgba(0,0,255,0.5)';
      }

   }
   
   Object.defineProperty(Player.prototype, 'type', {
      value: 'Stiven',
   });

   global.Game.Stiven = Stiven;   
   
}(window));