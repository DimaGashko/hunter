;(function(global){
   "use strict"

   class Collisions {
      constructor() {
         
      }

      //Находит и устраняет все столкновения на карте
      findAndfix(actors, blocks) {         
         actors.forEach((actor) => {
            var intersectBlocks = this.getIntersectObjects(actor, blocks.concat(actors)); 
            
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

            actor.speed.x /= 2;

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
              //actor.jumpDown(); //прыгнуть
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
      
      //Возвращает массив из переданный объектов, которые пересекаются с actor 
      getIntersectObjects(actor, objects) {
         return objects.filter((obj) => {
            return (actor !== obj && this.intersetObjs(actor, obj));
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