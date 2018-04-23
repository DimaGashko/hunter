;(function(global){
   "use strict"

   var DEF = {
      tileset: 'img/sprite.png',
      tileW: 16,
      tileH: 16,
   }

   /**
    * Игровой персонаж - Стив 
    * 
    * @class
    * 
    * В options обязательно должны быть параметры tileW, tileH
    * Они используются, для привидения размеров персонажа 
    * Из размеров в пикселях к реальным размерам 
    * 
    * После иницилизации нужно вызвать метод start.
    * Метод start нужно вызвыать, после загрузки тайлсера
    * Например так:
    * 
    * var steve = new Steve({...});
    * 
    * steve.sprite.addEvent('tileset_load', () => {
    *    steve.start();
    * });
    */
   class Steve extends Game.Actor {
      constructor(options = {}) {
         options = extend(true, {}, DEF, options);
         super(options);
      }

      goToLeft() {
         super.goToLeft.apply(this, arguments);

         this._state = 'steve_go';
         this.sprite.start('steve_go');
         
         this.sprite.options.transforms.mirrorX = true;
      }

      goToRight() {
         super.goToRight.apply(this, arguments);
         
         this._state = 'steve_go';
         this.sprite.start('steve_go');
         this.sprite.options.transforms.mirrorX = false;
      }

      start() { 
         this.sprite.start(this._state);
      }

      _initSprite() { 
         var o = this.options;
         
         this.sprite = new Game.Sprite({
            tileset: o.tileset,
            size: this.tileSize,
            cadrs: {
               'steve_stand': [{
                  metrics: SPRITES['steve_stand'],
               }],

               'steve_go': [{
                  metrics: SPRITES['steve_go'],
                  duration: 300,
               }, {
                  metrics: SPRITES['steve_stand'],
                  duration: 300,
               }],
               
               'base': [{
                  metrics: SPRITES['steve_stand'],
                  duration: 0,
               }],
            },
         });
      }

      _init() {
         this._setSize();

         super._init.apply(this, arguments);
         
         this._initEvents();
      }

      _initEvents() { 
         this.sprite.addEvent('before_chande_cadr', (config) => {
            var center = this.getCenter();

            this.size = new Vector(
               config.metrics.w,
               config.metrics.h,
            ).diScale(this.tileSize);

            this.sprite.changeSize(new Vector(
               config.metrics.w,
               config.metrics.h,
            ));

            this.setCenter(center);
         });
      }

      /**
       * Устанавливает размеры персонажа, 
       * В зависимости от состояния (стоит, идет...)
       * 
       * Устанавливает два свойства:
       * this.size - реальные размеры персонажа
       * this.spriteSize - размеры спрайта
       */
      _setSize() { 
         this.spriteSize = new Vector(
            SPRITES[this._state].w,
            SPRITES[this._state].h,
         );

         this.size = this.spriteSize.diScale(this.tileSize);
      }

      _createParametrs() { 
         super._createParametrs.apply(this, arguments);

         this.tileSize = new Vector(
            this.options.tileW,
            this.options.tileH,
         );

         this._state = 'steve_jump'; //cостояние персонажа (стоит, идет...)
      }

   }
   
   Object.defineProperty(Steve.prototype, 'type', {
      value: 'Steve',
   });

   global.Game.Steve = Steve;   
   
}(window));