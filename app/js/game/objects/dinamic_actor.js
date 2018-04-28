;(function(global){
   "use strict"

   var DEF = {
      tileset: 'img/sprite.png',
      tileW: 16,
      tileH: 16,
   }

   /**
    * Игровой персонаж 
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
   class DinamicActor extends Game.Actor {
      constructor(options = {}, collisions) {
         options = extend(true, {}, DEF, options);
         super(options, collisions);

         this._initSprite();
      }

      goToLeft() {
         super.goToLeft.apply(this, arguments);

         this.mirrorX = true;
         this.moveParametrs.go = true;
      }

      goToRight() {
         super.goToRight.apply(this, arguments);
         
         this.mirrorX = false;
         this.moveParametrs.go = true;
      }

      jump() {
         this.moveParametrs.jump = true;

         if (!this.moveStatus.jump) return;

         super.jump.apply(this, arguments);
      }

      start() { 
         this._initEvents();
         this.sprite.start(this._state);
      }

      //Внешний код вызывает перед перемещением
      beforeMove() { 
         this.moveParametrs = {
            go: false,
            jump: false,
         }
      }

      //Врешний код вызывает после перемещения
      afterMove() { 
         if (!this.sprite) return;

         var req = this.mirrorX !== this.sprite.options.mirrorX;

         var type = 'stand';

         var p = this.moveParametrs;

         if (p.go && p.jump) type = 'jump';
         else if (p.go) type = 'go';

         this.sprite.options.mirrorX = this.mirrorX;
         this._setState(type);
      }

      /**
       * Устанавливает состояние персонажа
       * 
       * @param {string} state 
       */
      _setState(state) {
         this._state = state;
         this.sprite.start(state);
      }

      _initSprite() { 
         var o = this.options;
         
         this.sprite = new Game.Sprite({
            tileset: o.tileset,
            size: this.tileSize,
            cadrs: this._cadrsConfig,
         });

         this.sprite.addEvent('tileset_load', () => {
            this.start();
         });
      }

      _init() {
         super._init.apply(this, arguments); 
      }

      _initEvents() { 
         this.sprite.addEvent('before_chande_cadr', (config, disallow) => {
            var center = this.getCenter();

            var prevCoords = this.coords;
            var prevSize = this.size;

            var newSize = new Vector(
               config.metrics.w,
               config.metrics.h,
            ).diScale(this.tileSize);

            //Немного уменьшаем, что бы не считать касания
            this.size = newSize.mul(0.999);
            this.setCenter(center);

            if (this.collisions.objectAt(this)) { 
               disallow();

               this.size = prevSize;
               this.coords = prevCoords;
               this.setCenter(center);
               return;
            }

            this.size = newSize;
            this.setCenter(center);

            /*this.sprite.changeSize(new Vector(
               config.metrics.w,
               config.metrics.h,
            ));*/
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
            this._cadrsConfig[this._state][0].metrics.w,
            this._cadrsConfig[this._state][0].metrics.h,
         );
         
         this.size = this.spriteSize.diScale(this.tileSize);
      }

      _initConfig() { 
         this._state = 'stand'; //cостояние персонажа (стоит, идет...)
      
         this._cadrsConfig = {
            'stand': [{
               metrics: SPRITES['steve_stand'],
            }],

            'jump': [{
               metrics: SPRITES['steve_go'],
            }],

            'go': [{
               metrics: SPRITES['steve_go'],
               duration: 200,
            }, {
               metrics: SPRITES['steve_stand'],
               duration: 200,
            }],
         }
      }

      _createParametrs() { 
         super._createParametrs.apply(this, arguments);

         this.tileSize = new Vector(
            this.options.tileW,
            this.options.tileH,
         );

         this.mirrorX = false;

         this._initConfig();

         this._setSize();
         console.log(this.size)
      }

   }

   global.Game.DinamicActor = DinamicActor;   
   
}(window));