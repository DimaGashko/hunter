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
         this.prevCoords = this.coords;
         this.coords = this.coords.plus(this.speed);
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