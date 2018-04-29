;(function(global){
   'use strict'
   
   var DEF = {
      props: {
         wayX: 2,
         wayY: 0,
         speedX: 0.1,
         speedY: 0.1,
      }
   }
   
   /**
    * Platform
    *
    * @class
    * @param {object} options - настройки (по умолчанию DEF)
   */
   class Platform extends Game.Actor {
      constructor(options = {}, collisions) {
         console.log(options)
         options = extend(true, {}, DEF, options);
         super(options, collisions);

         console.log('Platform');
      }

      respondInteraction(obj, side) {
         var speed = this.speed;

         super.respondInteraction.apply(this, arguments);
      }

      updateCoords() { 
         super.updateCoords.apply(this, arguments);

         this._useBorders();
      }

      _useBorders() { 
         if (this.coords.x < this.borders.left) {
            this.coords.x = this.borders.left;
            this.speed.x = -this.speed.x;
         
         } else if (this.coords.x > this.borders.right) {
            this.coords.x = this.borders.right;
            this.speed.x = -this.speed.x;

         } 

         if (this.coords.y < this.borders.top) {
            this.coords.x = this.borders.top;
            this.speed.y = -this.speed.y;
         
         } else if (this.coords.y > this.borders.bottom) {
            this.coords.y = this.borders.bottom;
            this.speed.y = -this.speed.y;
            
         } 
      }

      _initWay() { 
         var x1 = this.coords.x;
         var x2 = this.coords.x + this.way.x;

         var y1 = this.coords.y;
         var y2 = this.coords.y + this.way.y

         if (x1 > x2) [x1, x2] = [x2, x1];
         if (y1 > y2) [y1, y2] = [y2, y1];

         this.borders.left = x1;
         this.borders.right = x2;
         this.borders.top = y1;
         this.borders.bottom = y2;

         console.log(this.borders)
      }

      _createParametrs() { 
         super._createParametrs.apply(this, arguments);

         this.way = new Vector(
            this.options.props.wayX,
            this.options.props.wayY,
         );

         this.speed = new Vector(
            this.options.props.speedX,
            this.options.props.speedY,
         );

         this.borders = {};

         this._initWay();
      }

   }

   Object.defineProperty(Platform.prototype, 'gravity', {
      value: false,
   });
   
   global.Game.Platform = Platform;
   
}(window));
