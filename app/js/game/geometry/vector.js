;(function(global){
   "use strict"

   /**
    * Класс для работы с векторами
    * 
    * @class
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
      
      /**
       * Добавляет вектор
       * 
       * @param {vector} vector вектор, который будет добавлен
       */
      plus(vector) {    
         return new Vector(
            this.x + vector.x,
            this.y + vector.y
         );
      }

      /**
       * Вычитает векторы
       * 
       * @param {vector} vector вектор, который будет вычтен
       */
      minus(vector) {    
         return new Vector(
            this.x - vector.x,
            this.y - vector.y
         );
      }

      /**
       * Умножает координаты вектора на переданное число
       * 
       * @param {number} n число, на которое будут умножены 
       * координаты вектора
       */
      mul(n) {
         return new Vector(
            this.x * n,
            this.y * n
         );
      }

      /**
       * Делит координаты вектора на переданное число
       * 
       * @param {number} n число, на которое будут поделены 
       * координаты вектора
       */
      div(n) {
         return new Vector(
            this.x / n,
            this.y / n
         );
      }

      /**
       * Умножает координаты вектора на соответствующие координаты
       * переданного вектора 
       * 
       * @param {vector} vector вектор, на который будет происходить умножение
       */
      scale(scale) {
         return new Vector(
            this.x * scale.x,
            this.y * scale.y,
         );
      }

      /**
       * Делит координаты вектора на соответствующие 
       * координаты переданного вектора
       * 
       * @param {vector} vector вектор, на которой будет происходить деление
       */
      diScale(scale) {
         return new Vector(
            this.x / scale.x,
            this.y / scale.y,
         );
      }

      /**
       * Делает обе координаты положительными
       */
      scalarAbs() {
         return new Vector(
            Math.abs(this.x),
            Math.abs(this.y)
         ); 
      }

      /**
       * Копирует вектор
       */   
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