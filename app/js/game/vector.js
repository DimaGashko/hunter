;(function(global){
   "use strict"

   class Vector {
      constructor(x = 0, y = 0) {
         this.x = x;
         this.y = y;
      }
    
      plus(vector) {    
         return new Vector(
            this.x + vector.x,
            this.y + vector.y
         );
      }

      minus(vector) {    
         return new Vector(
            this.x - vector.x,
            this.y - vector.y
         );
      }
      
      copy() {
         return new Vector(
            this.x,
            this.y
         );
      }

      mul(n) {
         return new Vector(
            this.x * n,
            this.y * n
         );
      }

      div(n) {
         return new Vector(
            this.x / n,
            this.y / n
         );
      }

      scale(scale) {
         return new Vector(
            this.x * scale.x,
            this.y * scale.y,
         );
      }
   }  
   
   global.Vector = Vector;   
   
}(window));