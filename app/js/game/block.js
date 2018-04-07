;(function(global){
   "use strict"

   var DEF = {
      tile: {
         w: 32,
         h: 32,
         src: '',
      },
   }

   class Block {
      constructor(config = {}, options = {}) {
         this._createParametrs(config, options);

         this._paint();

         setTimeout(() => {
            if (this.img) return;
            this._setFaceColor();
         }, 500);
      }

      _paint() {
         var img = this.tiles = new Image();
         
         img.addEventListener('load', () => {
            this.ctx.drawImage(
               img,
               this.animation[0].startX,
               this.animation[0].startY,
               this.options.tile.w,
               this.options.tile.h,
               0, 0,
               this.options.tile.w,
               this.options.tile.h
            );
            this.img = this._canvas;
         });
         
         img.src = this.options.tile.src;
      }

      _createParametrs(config, options) {
         this.options = extend(true, {}, DEF, options);

         this.x = config.x;
         this.y = config.y;
         this.w = config.w;
         this.h = config.h;

         this.img = null;

         this._canvas = document.createElement('canvas');
         this._canvas.width = this.options.tile.w;
         this._canvas.height = this.options.tile.h;

         this.ctx = this._canvas.getContext('2d');

         this._tiles = null;
         this.fakeColor = null;

         this.animation = config.animation;
      }

      _setFaceColor() {
         this.fakeColor = `rgb(${(Math.random() * 255)^0},`
            + `${(Math.random() * 255)^0},`
            + `${(Math.random() * 255)^0})`;
      }

   }
   
   global.Game.Block = Block;   
   
}(window));