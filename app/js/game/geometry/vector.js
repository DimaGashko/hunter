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
      
      //Cумма векторв
      plus(vector) {    
         return new Vector(
            this.x + vector.x,
            this.y + vector.y
         );
      }

      //Разница векторов
      minus(vector) {    
         return new Vector(
            this.x - vector.x,
            this.y - vector.y
         );
      }

      //Умножение на число
      mul(n) {
         return new Vector(
            this.x * n,
            this.y * n
         );
      }

      //Деление на число
      div(n) {
         return new Vector(
            this.x / n,
            this.y / n
         );
      }

      //Умножение на соответствующую координату
      scale(scale) {
         return new Vector(
            this.x * scale.x,
            this.y * scale.y,
         );
      }

      //Деление на соответствующую координату
      diScale(scale) {
         return new Vector(
            this.x / scale.x,
            this.y / scale.y,
         );
      }

      //Модуль к всем координатам
      scalarAbs() {
         return new Vector(
            Math.abs(this.x),
            Math.abs(this.y)
         ); 
      }

      //Копирование
      copy() {
         return new Vector(
            this.x,
            this.y
         );
      }

      /**
       * Проверяет, одинаковые ли параметры у ветора с переданным
       * 
       * @param {vector} vector сравниваемый вектор
       */
      isSame(vector) { 
         return this.x === vector.x
            && this.y === vector.y;
      }
      
   }  
   
   global.Vector = Vector;   
   
}(window));