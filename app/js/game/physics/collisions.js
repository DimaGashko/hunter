;(function(global){
   "use strict"

   var DEF = {

   }

   class Collisions {
      constructor(options = {}) {
         this._createParametrs(options);
      }

      //Находит и устраняет все столкновения на карте
      findAndfix() {        
         for (var i = this._objects.length - 1; i >= 0; i--) {
            var obj = this._objects[i];

            var intersectBlocks = this.getIntersectObjects(obj, this._objects); 
            
            for (var j = intersectBlocks.length - 1; j >= 0; j--) {
               var otherObj = intersectBlocks[j];
               
               if (!this.intersetObjs(obj, otherObj)) {
                  continue; //Если obj уже не пересекается с otherObj
               }

               if (this._isOnDeg(obj, otherObj)) {
                  continue; //Если на углу - то это не пересечение
               }
               
               this._fixCollision(obj, otherObj);
            }
   
         }
      }

      /**
       * Устанавливает объекты, которые буду учавствовать в колизиях
       * 
       * @param {array} objects передаваемые объекты (Block и его наследники)
       */
      setObjects(objects) { 
         this._objects = objects;
      }
      
      /**
       * Возвращает, находится ли в переданном прямоугольнике какой-либо объект
       * (проверят, будет ли пересечения с каким-то объектом)
       * 
       * @param {Rect} rect проверяемая область
       * @param {Rect} except какой объект не учитывать
       */
      objectAt(rect, except) {
         except = except || rect;

         return this._objects.some((obj) => { 
            return obj !== except && this.intersetObjs(rect, obj);
         });
      }

      _fixCollision(actor, obj) {
         var side = '';
               
         if (this._isTopCotact(actor, obj)) {
            side = 'top';
         
         } else if (this._isLeftContact(actor, obj)) {
            side = 'left';
         
         } else if (this._isBottomContact(actor, obj)) {
            side = 'bottom';
         
         } else if (this._isRightContact(actor, obj)) {
            side = 'right';
            
         }

         obj.respondInteraction(actor, side);
      }
/*
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

      }*/

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

      _getFakeActor(coords = new Vector(0, 0), size) {
         return new Game.Rect(coords.x, coords.y,
            size.x, size.y);
      }
      
      //Возвращает массив из переданный объектов, которые пересекаются с actor

      //Вначале была реализация через filter,
      //Но performance в параметрах разработчика хрома 
      //Показал, что он занимает очень много вермени

      getIntersectObjects(obj, objects) {
         var intersects = [];

         for (var i = objects.length - 1; i >= 0; i--) {
            if (obj !== objects[i] && this.intersetObjs(obj, objects[i])) { 
               intersects.push(objects[i]);
            }

         }
         
         return intersects;
      }

      intersetObjs(obj1, obj2) {
         return isIntersectRect(
            obj1.left, obj1.right, obj1.top, obj1.bottom,
            obj2.left, obj2.right, obj2.top, obj2.bottom,
         );
      }
      
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);

         this._objects = []; //содержит объекты, которые участвуют в колизиях
            //передается во внешнем коде методом setObjects()
      }

   }

   
   global.Game.Collisions = Collisions;   
   
}(window));