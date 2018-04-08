;(function(global){
   "use strict"

   class Collisions {
      constructor() {
         
      }

      //Находит и устраняет все столкновения на карте
      findAndfix(actors, blocks) {
         actors.forEach((actor) => {
            var intersectBlocks = this.getIntersectObjects(actor, blocks); 
            if (intersectBlocks.length === 0) {
               return //нет пересечений с блоками
            }
            
            intersectBlocks.forEach((obj, i) => {
               this._fixCollision(actor, obj, 'x');
               this._fixCollision(actor, obj, 'y');
            });
         });

      }

      //Решает столкновение между actor и obj по оси axis (в проекции на эту ось)
      _fixCollision(actor, obj, axis) {
         if (!this.intersetObjs(actor, obj)) {
            return; //если объекты уже не пересекаются
         }

         var speed = actor.speed[axis];

         if (speed === 0) {
            return; //Если скорость по оси - 0, то не трогаем
         }
         
         if (axis == 'x') {
            if (speed > 0) actor.right = obj.left;
            else actor.left = obj.right;
         }
         else {
            if (speed > 0) actor.bottom = obj.top;
            else actor.top = obj.bottom;
         }
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