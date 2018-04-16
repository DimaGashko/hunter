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
         ro: 5500,
         mu: 0.01,
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

      //Объем
      get V() {
         return this.size.x * this.size.y * 1;
      }

      set V(val) {
         console.error('Менять объем напрямую нельзя');
      }

      //Масса
      get m() {
         return this.V * this.ro;
      }

      set m(val) {
         console.error('Менять массу напрямую нельзя');
      }

      //Полное ускорение
      get fullA() {
         return this.fullF.div(this.m); //2 закон Ньютора
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

      updateCoords() { 
         //Для Block-а ничего не делает
      }

      updateSpeed() { 
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
         //Реакция опоры по осям
         var N = new Vector(0, 0);

         if (
            (side === 'top' && obj.fullF.y > 0) ||
            (side === 'bottom' && obj.fullF.y < 0)
         ) {
            N.y = -obj.m * obj.fullF.y;
         }

         if (
            (side === 'left' && obj.fullF.x > 0) ||
            (side === 'right' && obj.fullF.y < 0)
         ) {
            N.y = -obj.m * obj.fullF.x;
         }

         //Трение
         var Ffr = new Vector(
            this.mu * N.x,
            this.mu * N.y
         );

         obj.fullF.plus(N);
         obj.fullF.plus(Ffr);
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);

         this.coords.x = this.options.x;
         this.coords.y = this.options.y;
         this.size.x = this.options.w;
         this.size.y = this.options.h; 

         this.speed = new Vector(0, 0);

         this.ro = this.options.props.ro;
         this.mu = this.options.props.mu;

         //Вектор сумарной силы приложеной к телу
         this.fullF = new Vector(0, 0);
 
         this.sprite = null;
      }

   }

   Object.defineProperty(Block.prototype, 'type', {
      value: 'block',
   });
   
   global.Game.Block = Block;   
   
}(window));