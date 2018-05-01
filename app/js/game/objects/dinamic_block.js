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
      constructor(options = {}, collisions) {
         options = extend(true, {}, DEF, options);
         super(options, collisions);
      }

      /**
       * Обновляет координаты блока
       * (прибавляет текущую скорость)
       */
      updateCoords(dilation = 1) {
         this.prevCoords = this.coords;
         this.coords = this.coords.plus(this.speed.mul(dilation));
      }

      //Для DinamicBlock ничего не делает
      clearMoveStatus() { 

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

   Object.defineProperty(DinamicBlock.prototype, 'gravity', {
      value: true,
   });
   
   global.Game.DinamicBlock = DinamicBlock;   
   
}(window));