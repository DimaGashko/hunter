;(function(global){
   "use strict"

   class Collisions {
      constructor() {
         
      }

      //Устраняет все столкновения на карте
      fix(actors, blocks) {
         actors.forEach((actor) => {
            var intersectBlocks = this.getIntersectObjects(actor, blocks); 
            if (intersectBlocks.length === 0) {
               return //нет пересечений с блоками
            }
            
            intersectBlocks.forEach((block) => {

            });
         });
      }

      //Возвращает массив из переданный объектов, которые пересекаются с actor 
      getIntersectObjects(actor, objects) {
         return objects.filter((obj) => {
            return this.intersetObjs(actor, obj);
         });
      }

      intersetObjs(obj1, obj2) {
         return isIntersectRect(
            obj1.left, obj1.right, obj1.top, obj1.bottom,
            obj2.left, obj2.right, obj2.top, obj2.bottom,
         );
      }
      

      _createParametrs() {
         
      }

   }

   
   global.Game.Collisions = Collisions;   
   
}(window));