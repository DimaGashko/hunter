;(function(global){
   "use strict"

   //Кеширование tileset
   //Содержит поля у который ключ - это путь к картинке
   //А значение - либо DOM элемент tileset-a (Image)
   //Либо null если картинку с таким адресом загрузить не удалось
   var tilesets = {} 

   var DEF = {
      tileset: 'tileset.png', //Путь к тайлсету со спрайтами

      size: new Vector(32, 32), //Размеры элемента канваса/спрайта

      //Объект, сореджащий кадры анимаций по типам
      //Тип передается при вызове метода start
      //И испльзуется для выбора кадров, которые стоит отрисовывать
      cadrs: {

         //Каждый тип - этом массив, содержащий объекты вида:
         base: [{
            //x, y - точки на tileset-e с которых начинается кадр
            //w, h - ширина и высота тайла
            //duration - длительность показа данного кадра

            x: 0, 
            y: 0,
            w: 32,
            h: 32,
            duration: 0,
         }],
      }
   }

   class Sprite {
      constructor(options = {}) {
         this._createParametrs(options);
         this._init();
      }

      _init() {
         this._loadTileset().then(() => {
            this._createCanvas();
            this._setSize();

         }, () => {
            console.error(
               'Не удалось загрузить tileset',
               this.options.tileset
            );
         });
      }

      /**
       * Начинает анимацию спрайта переданного типа
       * 
       * @param {string} type типа анимации
       * Праметры типа - options.cadrs[type]
       * 
       * Пока не загружен tileste ничего не делает.
       */
      start(type) {
         if (this.tileset === null) return;


      }

      /**
       * Меняет размеры канваса/спрайта
       * 
       * @param {Vector} newSize новый размер
       * 
       * Все что нарисовано на спрайте будет стерто
       */
      changeSize(newSize) {
         this.options.size = newSize;
         this._setSize();
      }

      _loadTileset() {
         return new Promise((resolve, reject) => {
            
         });
      }

      _clear() {
         this.ctx.clearRect(0, 0, this.options.w, this.options.h);
      }

      _setSize() {
         this.canv.width = this.options.w;
         this.canv.height = this.options.h;
      }

      _createCanvas() {
         this.canv = document.createElement('canvas');
         this.ctx = this.canv.getContext('2d');
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         this.timer = 0; //Таймер, используемый для setTimeout

         this.tileset = null;
         this.canvas = null;
         this.ctx = null;
      }
   }









































   class Sprite {
      constructor(options = {}) {
         this._createParametrs(options);
         this._setSize();
         this.start();
      }

      start() {
         var o = this.options;
         var self = this;

         if (!o.animation || o.animation.length === 0) {
            throw new Error(`Cant't start animation (0 cadrs)`);
         }
         else if (o.animation.length === 1) {
            this.options.cur = 0;
            this._draw();
         }

         this._draw();

         setTimeout(function tik() {
            o.cur = (o.cur + 1) % o.animation.length;
            self._clear();
            self._draw();

            setTimeout(tik, o.animation[o.cur].duration);
         }, o.animation[o.cur].duration);
      }

      _draw() {
         var o = this.options;
         var anim = o.animation[o.cur];

         this.ctx.drawImage(
            o.sprite,
            anim.startX,
            anim.startY,
            o.w, o.h,
            0, 0,
            o.w, o.h
         );
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         this.canv = document.createElement('canvas');
         this.ctx = this.canv.getContext('2d');
      }
   }
    
   global.Sprite = Sprite;   
   
}(window));