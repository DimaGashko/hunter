;(function(global){
   "use strict"

   /**
    * Класс для работы с прямоугольниками
    * 
    * @class
    * 
    * Аргументами в конструктор передаются координаты и размеры прямоугольника
    * 
    * - - - - -
    * Наследует от Events, поэтому этот класс, и все классы, 
    * Что наследуют от него имеют поддержку событий
    */
   class Rect extends Events {
      constructor(x = 0, y = 0, w = 0, h = 0) {
         super();

         this.coords = new Vector(x, y);
         this.size = new Vector(w, h);
      }

      //Геттеры возвращают значение соответствующей стороны или др.

      //Сеттеры ставят прямоугольник в нужное место нужной стороной 
      //(меняя координаты, размеры при этмо НЕ меняются)
      
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
   
   global.Game.Rect = Rect;   
   
}(window));