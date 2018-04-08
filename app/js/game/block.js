;(function(global){
   "use strict"

   class Block {
      constructor(config = {}, options = {}) {
         this._createParametrs(config, options);
         this.start();
      }

      start() {
         if (!this.status.init) {
            this._init();
         }

         this.status.run = true;
      }

      stop() {
         this.status.run = false;
      }

      convertToRender() {
         return {
            x: this.coords.x,
            y: this.coords.y,
            w: this.size.x,
            h: this.size.y,
            img: this.img,
         }
      }

      _init() {
         var img = this.tiles = new Image();
         
         img.addEventListener('load', () => {
            this._createSprite(img);
         });

         img.addEventListener('error', () => {
            this._setFaceColor();
         })
         
         img.src = this.options.tileSrc;

         this.status.init = true;
      }

      _createSprite(img) {
            this.sprite = new Sprite({
                  w: this.options.tileW,
                  h: this.options.tileH,
                  sprite: img,
                  animation: this.animation,
            });
            
            this.img = this.sprite.canv;
      }

      _createParametrs(config, options) {
         this.options = {
            tileW: options.tile.w,
            tileH: options.tile.h,
            tileSrc: options.tile.src,
         }

         this.coords = new Vector(config.x, config.y);
         this.size = new Vector(config.w, config.h);

         this.sprite = null;
         this.img = null;

         this.fakeColor = null;

         this.status = {
            init: false,
            run: false,
         };

         this.animation = config.animation;
      }

      get left() {return this.pos.x;}
      get top() {return this.pos.y;}
      get right() {return this.pos.x + this.size.x;}
      get bottom() {return this.pos.y + this.size.y;}

      _setFaceColor() {
         this.fakeColor = `rgb(${(Math.random() * 255)^0},`
            + `${(Math.random() * 255)^0},`
            + `${(Math.random() * 255)^0})`;
      }

   }

   Object.defineProperty(Block.prototype, 'type', {
      value: 'block',
   });
   
   global.Game.Block = Block;   
   
}(window));