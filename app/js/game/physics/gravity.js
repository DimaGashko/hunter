;(function(global){
   "use strict"

   var DEF = {
      g: new Vector(0, 9.8/600/20),
   }

   /**
    * Класс для применения гравитации к объектам
    */
   class Gravity {
      constructor(options = {}) {
         this._createParametrs(options);
      }

      /**
       * Применяет гравитацию к переданным объектам
       * 
       * @param {Array} actors объекты, к которым нужно применить гравитацию
       * Объекты должны содержать поле speed, которое является вектором
       */
      use(actors) {
         actors.forEach((actor) => {
            actor.fullF = actor.fullF.plus(this.g.mul(actor.m));
         });
      }
      
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);

         this.g = new Vector(
            this.options.g.x,
            this.options.g.y,
         );
      }

   }

   global.Game.Gravity = Gravity;   
   
}(window));