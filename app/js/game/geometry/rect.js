;(function(global){
   "use strict"

   class Rect {
      constructor(x = 0, y = 0, w = 0, h = 0) {
         this.coords = new Vector(x, y);
         this.size = new Vector(w, h);
      }

      get left() {
         return this.coords.x;
      }

      set left(val) { 
         this.coords.x = val; 
      }

      get top() { 
         return this.coords.y; 
      }

      set top(val) { 
         this.coords.y = val; 
      }

      get right() { 
         return this.coords.x + this.size.x;
      }

      set right(val) { 
         this.coords.x = val - this.size.x; 
      }

      get bottom() { 
         return this.coords.y + this.size.y; 
      }

      set bottom(val) { 
         this.coords.y = val - this.size.y; 
      }

      getCenter() {
         return new Vector(
            this.coords.x + this.size.x / 2,
            this.coords.y + this.size.y / 2
         );
      }

      setCenter(center) {
         this.coords.x = center.x - this.size.x / 2;
         this.coords.y = center.y - this.size.y / 2;
      }

   }

   Object.defineProperty(Rect.prototype, 'type', {
      value: 'rect',
   });
   
   global.Game.Rect = Rect;   
   
}(window));