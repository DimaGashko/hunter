;(function(global){
   "use strict"

   var DEF = {
      speedX: 0,
      speedY: 0,
   }
      
   /**
    * Класс для создания игрового динамического блока
    * (содержит интерфейс для изменения положения)
    */
   class DinamicBlock extends Game.Block { 
      constructor(options = {}) {
         options = extend(true, {}, DEF, options);
         super(options);
      }

      /**
       * Обновляет координаты блока
       * (прибавляет текущую скорость)
       */
      updateCoords() {
         this.coords = this.coords.plus(this.speed);
      }

      /**
       * Обновляет скорость блока
       * (прибавляет к текущей скорости вектор ускорения)
       * @param {number} times отклонение времени кадра от нормы (16 ms)
       * times === 2 - длительность кадра 32ms
       * times === 0.5 длительность кадра 8ms
       */
      updateSpeed(times = 1) { 
         var a = this.fullA.mul(times);
         this.speed = this.speed.plus(a);
      }

      _createParametrs(options) {
         super._createParametrs(options);
         
         this.speed = new Vector(
            this.options.speedX,
            this.options.speedY
         );
         
      }
      
   }

   Object.defineProperty(DinamicBlock.prototype, 'type', {
      value: 'dinamic_block',
   });
   
   global.Game.DinamicBlock = DinamicBlock;   
   
}(window));