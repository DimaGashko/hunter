;(function(global){
   "use strict"

   var DEF = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,

      fillStyle: '', //Цвет, что будет использоваться, когда нет картинки

      animation: {} //Настройки для спрайтов передаваемые в Sprite
   }
      
   /**
    * Класс для создания игрового блока
    */
   class Block extends Game.Rect {
      constructor(config = {}, options = {}) {
         super(config.x, config.y, config.w, config.h);

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
            fillStyle: this.fakeColor,
         }
      }

      _init() {
         var img = this.tiles = new Image();
         
         img.addEventListener('load', () => {
            this._createSprite(img);
         });

         img.addEventListener('error', () => {
               this._setFaceColor();
         });
      
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

         this.sprite = null;
         this.img = null;

         this.fakeColor = null;

         this.status = {
            init: false,
            run: false,
         };

         this.animation = config.animation;
      }

   }

   Object.defineProperty(Block.prototype, 'type', {
      value: 'block',
   });
   
   global.Game.Block = Block;   
   
}(window));