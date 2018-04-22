;(function(global){
   "use strict"

   var DEF = {
      //Метрики блока
      x: 0,
      y: 0,
      w: 1,
      h: 1,

      //Физические параметры блока
      props: {
         
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
      tileW: 0,
      tileH: 0,
   }
      
   /**
    * Класс для создания игрового блока
    */
   class Block extends Game.Rect { 
      constructor(options = {}) {
         super();

         this._createParametrs(options);
         this._init();
      }

      /**
       * Включает все процессы, которые выполняются периодично
       * (Например, отрисовку спрайта)
       */
      start() {
         this.sprite.start('base');
      }

      /**
       * Выключает все процессы, которые выполняются периодично
       * (Например, отрисовку спрайта)
       */
      stop() {
         this.sprite.stop();
      }

      /**
       * Возвращает объект параметров для рендера
       */
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
            },
         });
      }

      updateCoords() { 
         //Для Block-а ничего не делает
      }

      /**
       * Реакия на взаимодействие с другим объектом 
       * (изменяет параметры переданного объека)
       * 
       * Обеспечивает такие эффекти на переданный обект:
       * - нормальная реакция опоры 
       * - сила трения
       * - нанесение урона
       * - и др.
       * 
       * @param {Block} obj - другой объект (наследующий от Block)
       * (на объекты типа block не влияет
       * влияет на объекты dinamicBlock и их наследников)
       * 
       * @param {Block} side - cторона взаимодействия (left, top, right, bottom)
       */
      respondInteraction(obj, side) {
         //Если это именно блок
         if (obj.type === 'block') return;

         if (side === 'top') {
            obj.speed.y = 0;
            obj.bottom = this.top;

         } else if (side === 'bottom') {
            obj.speed.y = 0;
            obj.top = this.bottom;
         
         } else if (side === 'left') {
            obj.speed.x = 0;
            obj.right = this.left;
         
         } else if (side === 'right') {
            obj.speed.x = 0;
            obj.left = this.right;
         
         }        

         //Если это персонаж или его наследники
         if (obj instanceof Game.Actor) {
            if (side === 'top') {
               obj.jump();
               obj.goToLeft();
               obj.goToRight();

            } else if (side === 'left') {
               obj.goToRight();

            } else if (side === 'right') {
               obj.goToLeft();

            }

            if (side === 'top' || side === 'bottom') {
               obj.speed.x /= 10;
            }

         }
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);

         this.coords.x = this.options.x;
         this.coords.y = this.options.y;
         this.size.x = this.options.w;
         this.size.y = this.options.h; 

         this.speed = new Vector(0, 0);
 
         this.sprite = null;
      }

   }

   Object.defineProperty(Block.prototype, 'type', {
      value: 'block',
   });
   
   global.Game.Block = Block;   
   
}(window));