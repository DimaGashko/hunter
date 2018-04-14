;(function(global){
   "use strict"

   /**
    * Класс для работы с векторами
    * 
    * @constructor
    * 
    * Аргументами конструктора являются координаты x, y вектора
    * По умолчанию координаты равны 0:0
    * 
    * Все методы возвращают новый вектор
    */
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

      diScale(scale) {
         return new Vector(
            this.x / scale.x,
            this.y / scale.y,
         );
      }

      scalarAbs() {
         return new Vector(
            Math.abs(this.x),
            Math.abs(this.y)
         ); 
      }

      copy() {
         return new Vector(
            this.x,
            this.y
         );
      }
      
   }  
   
   global.Vector = Vector;   
   
}(window));