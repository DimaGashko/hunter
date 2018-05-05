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
         damage: 0,
         armor: 0,
         hurtInterval: 500,
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
            w: 16,
            h: 16,
         },
         duration: 0,
      }],

      tileset: '', //Адресс к tileset-у
      tileW: 16,
      tileH: 16,
   }
      
   /**
    * Класс для создания игрового блока
    */
   class Block extends Game.Rect { 

      /**
       * @param {object} options опции
       * @param {Collisions} collisions - collisions 
       */
      constructor(options = {}, collisions) {
         super();

         this.collisions = collisions;
         
         this._createParametrs(options);
         this._init();
      }

      hurt(obj, startDamage = 0) { 
         var time = Date.now();
         if (time - this._prevHurt < this._hurtInterval) { 
            return;
         }

         var damage = startDamage + this.damage;

         obj.pain(damage);

         this._prevHurt = time;
      }

      pain() { 

      }

      /**
       * Включает все процессы, которые выполняются периодично
       * (отрисовку спрайта)
       */
      start() {
         if (!this.sprite) this._initSprite();
         this.sprite.start('base');
      }

      /**
       * Выключает все процессы, которые выполняются периодично
       * (отрисовку спрайта)
       */
      stop() {
         if (this.sprite) this.sprite.stop();
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
            img: (this.sprite) ? this.sprite.sprite : null,
            fillStyle: this.options.fillStyle,
         }
      }

      _init() {
         
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

      tik() { 
         
      }

      clearMoveStatus() { 

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
         //this.speed = this.speed.plus(obj.speed.mul(-0.3));

         var startDamage = 0;

         //Если это именно блок
         if (obj.type === 'block') return;

         if (side === 'top') {
            startDamage += this._convertSpeedToPain(obj.speed.y);
            obj.speed.y = 0;
            obj.bottom = this.top;

         } else if (side === 'bottom') {
            startDamage += this._convertSpeedToPain(obj.speed.y);
            obj.speed.y = 0;
            obj.top = this.bottom;
         
         } else if (side === 'left') {
            startDamage += this._convertSpeedToPain(obj.speed.x);
            obj.speed.x = 0;
            obj.right = this.left;
         
         } else if (side === 'right') {
            startDamage += this._convertSpeedToPain(obj.speed.x);
            obj.speed.x = 0;
            obj.left = this.right;
         
         } 
         
         this.hurt(obj, startDamage);

         //Если это персонаж или его наследники
         if (obj instanceof Game.Actor) {
            if (side === 'top') {
               obj.jump();
            }

            if (side === 'top' || side === 'bottom') {
               obj.speed.x /= 10;
            }

         }

         obj.afterCollision();
      }

      afterCollision() { 
         
      }

      _convertSpeedToPain(speed) { 
         return Math.pow(Math.abs(speed * 5), 4);
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);

         this.coords.x = this.options.x;
         this.coords.y = this.options.y;
         this.size.x = this.options.w;
         this.size.y = this.options.h; 

         this.speed = new Vector(0, 0);
 
         this.sprite = null;

         this.damage = this.options.props.damage;
         this.armor = this.options.props.armor;
         this._hurtInterval = this.options.props.hurtInterval;

         this._prevHurt = 0;

      }

   }

   Object.defineProperty(Block.prototype, 'type', {
      value: 'block',
   });

   //Действует ли на блок сила тяжести
   Object.defineProperty(Block.prototype, 'gravity', {
      value: false,
   });
   
   global.Game.Block = Block;   
   
}(window));