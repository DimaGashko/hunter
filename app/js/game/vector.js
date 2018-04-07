;(function(global){
   "use strict"

   class Vector {
      constructor(x = 0, y = 0) {
         this.x = x;
         this.y = y;
      }
    
      plus(addVector) {
         if ( !(addVector instanceof Vector) ) {
            throw new SyntaxError('Можно прибавлять к вектору только вектор типа Vector');
         }
    
         return new Vector(
            this.x + addVector.x,
            this.y + addVector.y
         );
      }
   
      times(n) {
         return new Vector(
            this.x * n,
            this.y * n
         );
      }
   }  
   
   global.Vector = Vector;   
   
}(window));