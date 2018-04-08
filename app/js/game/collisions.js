;(function(global){
   "use strict"

   class Collisions {
      constructor() {
         
      }

      //Устраняет все столкновения на карте
      fix(actors, blocks) {
         actors.forEach((actor) => {
            var intersectBlocks = this.getIntersectObjects(actor, blocks);
            console.log(intersectBlocks);
         });
      }

      getIntersectObjects(actor, objects) {
         var result = [];

         objects.forEach((obj) => {
            if (this.intersetObjs(actor, obj)) {
               result.push(obj);
            }
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