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
               this._fixCollision(actor, obj);
            });
         });

      }

      _fixCollision(actor, obj) {
         var deg = this._getDegName(actor.speed);
         var a1 = this._getDegCoords(deg, actor.coords, actor.size);
         var a2 = this._getDegCoords(deg, actor.coords.minus(actor.speed), actor.size);

         
      }

      //Возвращает координаты угла actor по его названию
      _getDegCoords(deg, coords, size) {
         if (deg === 'leftBottom') {
            return new Vector(coords.x, coords.y + size.y);
         }
         if (deg === 'rightBottom') {
            return new Vector(coords.x + size.x, coords.y + size.y);
         }
         if (deg === 'rightTop') {
            return new Vector(coords.x + size.x, coords.y);
         }
         if (deg === 'leftTop') {
            return coords.copy();
         }
      }

      //Возвращает индек угла actor-а, которым он приближается к объекту
      _getDegName(speed) {
         if (speed.x <= 0 && speed.y >= 0) return 'leftBottom';
         if (speed.x >= 0 && speed.y >= 0) return 'rightBottom';
         if (speed.x >= 0 && speed.y <= 0) return 'rightTop';
         if (speed.x <= 0 && speed.y <= 0) return 'leftTop';
      }

      //Решает столкновение между actor и obj по оси axis (в проекции на эту ось)
      /*_fixCollision(actor, obj, axis) {
         if (!this.intersetObjs(actor, obj)) {
            return; //если объекты уже не пересекаются
         }

         var speed = actor.speed[axis];

         if (speed === 0) {
            return; //Если скорость по оси - 0, то не трогаем
         }

         actor.speed[axis] = 0;
         
         if (axis == 'x') {
            if (speed > 0) actor.right = obj.left;
            else actor.left = obj.right;
         }
         else {
            if (speed > 0) actor.bottom = obj.top;
            else actor.top = obj.bottom;
         }
      }*/

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