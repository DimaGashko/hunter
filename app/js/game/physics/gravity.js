;(function(global){
   "use strict"

   var DEF = {
      g: new Vector(0, 9.8/60/10),
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
            //console.log(actor.gravity)
            if (!actor.gravity) return;

            actor.speed = actor.speed.plus(this.g);
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