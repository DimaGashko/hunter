;(function(global){
   "use strict"

   var DEF = {
      //Метрики блока
      x: 0,
      y: 0,
      w: 0,
      h: 0,

      //Физические параметры блока
      props: {
         ro: 5500,
      },

      fillStyle: '', //Цвет, что будет использоваться, когда нет картинки

      //Настройки для спрайтов передаваемые в new Sprite
      //Должен содержать массив объектов кадров в формета 
      //Указанном в Game.Sprite
      //Непосредственно для Block-ов будет записан 
      //В тип кадров 'base' (cadrs.base)
      animation: [{
         metrics: {
            x: 0,
            y: 0,
            w: 32,
            h: 32,
         },
         duration: 0,
      }],

      tileset: '', //Адресс к tileset-у
      tileW: 32,
      tileH: 32,
   }
      
   /**
    * Класс для создания игрового блока
    */
   class Block extends Game.Rect { 
      constructor(options = {}) {
         super(options.x, options.y, options.w, options.h);

         this._createParametrs(options);
      }

      start() {
         if (!this.status.init) {
            this._init();
         }

         this._startUpdate();
      }

      _startUpdate() {
         this.sprite.start('base');
      }

      stop() {
         this.sprite.stop();
      }

      convertToRender() {
         return {
            x: this.coords.x,
            y: this.coords.y,
            w: this.size.x,
            h: this.size.y,
            img: this.sprite.sprite,
            fillStyle: this.options.fillStyle,
         }
      }

      _init() {
         this._initSprite();
      }

      _initSprite() {
         var o = this.options;

         this.sprite = new Game.Sprite({
            tileset: o.tileset,
            size: new Vector(o.tileW, o.tileH),
            cadrs: {
               base: this.options.animation,
            }
         });
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);

         this.sprite = null;
      }

   }

   Object.defineProperty(Block.prototype, 'type', {
      value: 'block',
   });
   
   global.Game.Block = Block;   
   
}(window));