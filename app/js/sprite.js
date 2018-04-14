;(function(global){
   "use strict"

   var DEF = {
      w: 32,
      h: 32,
      sprite: null, //Путь к картинке спрайта
      animation: [], //Описание анимации спрайта
      cur: 0,
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

      _clear() {
         this.ctx.clearRect(0, 0, this.options.w, this.options.h);
      }

      _setSize() {
         this.canv.width = this.options.w;
         this.canv.height = this.options.h;
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