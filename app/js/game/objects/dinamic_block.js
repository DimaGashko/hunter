;(function(global){
   "use strict"

   var DEF = {
      speed: new Vector(0, 0),
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

      updateCoords() {
         this.prevCoords = this.coords.copy();
         this.coords = this.coords.plus(this.speed);
      }

      _createParametrs(options) {
         super._createParametrs(options);

         this.speed = this.options.speed;
      }
      
   }

   Object.defineProperty(DinamicBlock.prototype, 'type', {
      value: 'dinamic_block',
   });
   
   global.Game.DinamicBlock = DinamicBlock;   
   
}(window));