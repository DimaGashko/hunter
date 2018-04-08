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
         this._init();
      }

      _init() {
         var img = this.tiles = new Image();
         
         img.addEventListener('load', () => {
            this._createSprite(img);
         });

         img.addEventListener('error', () => {
            this._setFaceColor();
         })
         
         img.src = this.options.tile.src;
      }

      _createSprite(img) {
            this.sprite = new Sprite({
                  w: this.options.tile.w,
                  h: this.options.tile.h,
                  sprite: img,
                  animation: this.animation,
            });
            
            this.img = this.sprite.canv;
      }

      _createParametrs(config, options) {
         this.options = extend(true, {}, DEF, options);

         this.x = config.x;
         this.y = config.y;
         this.w = config.w;
         this.h = config.h;

         this.sprite = null;
         this.img = null;

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