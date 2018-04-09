;(function(global){
   "use strict"

   class Collisions {
      constructor() {
         
      }

      //Находит и устраняет все столкновения на карте
      findAndfix(actors, blocks) {         
         actors.forEach((actor) => {
            var intersectBlocks = this.getIntersectObjects(actor, blocks); 
            
            intersectBlocks.forEach((obj, i) => {
               if (!this.intersetObjs(actor, obj)) {
                  return; //Если actor уже не пересекается с obj
               }

               if (this._isOnDeg(actor, obj)) {
                  return; //Если на углу - то это не пересечение
               }

               this._fixCollision(actor, obj);
            });
         });
      }

      _fixCollision(actor, obj) {
         if (this._isTopCotact(actor, obj)) {
            actor.pain(Math.pow(actor.speed.y * 5, 4));
            actor.speed.y = 0;
            actor.bottom = obj.top;

            //Оттолкнувшись от земли actor может:
            if (actor.status.left) {
               actor.goToLeft(); //пойти на лево
            }

            if (actor.status.right) {
               actor.goToRight(); //пойти на право
            }
            
            if (actor.status.jump) {
               actor.jump(); //прыгнуть
            }

            //console.log('top')
         
         } else if (this._isLeftContact(actor, obj)) {
            actor.pain(Math.pow(actor.speed.x * 5, 3));
            actor.speed.x = 0;
            actor.right = obj.left;

            //Оттолкнувшись от левой стенки actor может:
            if (actor.status.right) {
               actor.goToRight(); //пойти на право
            }
            //console.log('left')
         
         } else if (this._isBottomContact(actor, obj)) {
            actor.pain(Math.pow(actor.speed.y * 5, 3));
            actor.speed.y = 0;
            actor.top = obj.bottom;

            //Оттолкнувшись от земли actor может:
            if (actor.status.left) {
               actor.goToLeft(); //пойти на лево
            }

            if (actor.status.right) {
               actor.goToRight(); //пойти на право
            }
            
            if (actor.status.jump) {
               actor.jumpDown(); //прыгнуть
            }

            //console.log('bottom')
         
         } else if (this._isRightContact(actor, obj)) {
            actor.pain(Math.pow(actor.speed.x * 5, 3));
            actor.speed.x = 0;
            actor.left = obj.right;
            
            //Оттолкнувшись от правой стенки actor может:
            if (actor.status.left) {
               actor.goToLeft(); //пойти на лево
            }

            //console.log('right')
         
         }

      }

      _isTopCotact(actor, obj) {
         var prev = this._getFakeActor(actor.prevCoords, actor.size);

         if (prev.bottom > obj.top) {
            
            return false; //actor находится ниже верхней стороны obj 
               //(y-координата у него больше)
         }
         
         if (prev.right >= obj.left || prev.left <= obj.right) {
            return true; //actor находится над obj (он не может 
               //коснуться obj никак, кроме как сверху)
         }

         return false;
      }

      _isLeftContact(actor, obj) {
         var prev = this._getFakeActor(actor.prevCoords, actor.size);

         if (prev.right > obj.left) {
            return false;
         }

         if (prev.bottom >= obj.top || prev.top <= obj.bottom) {
            return true; 
         }

         return false;
      }

      _isBottomContact(actor, obj) {
         var prev = this._getFakeActor(actor.prevCoords, actor.size);
         
         if (prev.top < obj.bottom) {
            return false; 
         }

         if (prev.right >= obj.left || prev.left <= obj.right) {
            return true;
         }

         return false;
      }

      _isRightContact(actor, obj) {
         var prev = this._getFakeActor(actor.prevCoords, actor.size);

         if (prev.left < obj.right) {
            return false;
         }

         if (prev.bottom >= obj.top || prev.top <= obj.bottom) {
            return true; 
         }

         return false;
      }

      _isOnDeg(actor, obj) {
         return actor.right === obj.left 
            || actor.left === obj.right 
            || actor.top === obj.bottom
            || actor.bottom === obj.top;
      }

      _getFakeActor(coords, size) {
         return new Game.Rect(coords.x, coords.y, size.x, size.y);
      }

     /* _fixCollision(actor, obj) {
         while (this.intersetObjs(actor, obj)) {
            console.log('intersect')
            actor.coords = actor.coords.minus(actor.speed.div(20));
         }
         
         return;
         var deg = this._getDegIndex(actor.speed);
         var prevActor = new Game.Rect();

         prevActor.coords = actor.prevCoords;
         prevActor.size = actor.size.copy();

         var a1 = actor.getDegCoords(deg);
         var a2 = prevActor.getDegCoords(deg);
         console.log(deg);
         var lines = {
            0: [[2, 3], [1, 2]],
            1: [[2, 3], [3, 0]],
            2: [[0, 1], [3, 0]],
            3: [[0, 1], [1, 2]],
         }

         for (var i = 0; i < 2; i++) {
            var degs = lines[deg][0];

            var b1 = obj.getDegCoords(degs[0]);
            var b2 = obj.getDegCoords(degs[1]);
            //console.log(isIntersectRect(a1.x, a2.x, b1.x, b2.x, a1.y, a2.y, b1.y, b2.y));
            if (isIntersectRect(a1.x, a2.x, b1.x, b2.x, a1.y, a2.y, b1.y, b2.y)) {

               this._fixCollisionAxis(actor, obj, (i == 0) ? 'x' : 'y');
               return;
            }
         }

      }

      //Возвращает индек угла actor-а, которым он приближается к объекту
      //(Индексы из Vctor.fn.getDegCoords)
      _getDegIndex(speed) {
         if (speed.x <= 0 && speed.y >= 0) return 3;
         if (speed.x >= 0 && speed.y >= 0) return 2;
         if (speed.x >= 0 && speed.y <= 0) return 1;
         if (speed.x <= 0 && speed.y <= 0) return 0;
      }

      //Решает столкновение между actor и obj по оси axis (в проекции на эту ось)
      _fixCollisionAxis(actor, obj, axis) {
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