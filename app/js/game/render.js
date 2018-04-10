;(function(global){
   "use strict"

   var startCount = 1; //испльзутеся для корректного старта и паузы отрисовки 
      //(зашита от несколькоих stop/start за время одного кадра)

   var DEF = {
      scale: new Vector(64, 64), //масштаб игры по осям

      beforeRender: () => {}, //будер выполнятся перед каждой переросовкой
   }

   window.p = () => {
      console.log(startCount)
   }

   console.log(100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000)
   /**
    * Управление отрисовкой игры
    * 
    * @constructor 
    * @param {object} options - настройки (по умолчанию DEF)
    * 
    * Для начала отрисовки необходимо вызвать метод start
    */
   class Render {
      constructor(options = {}) {
         this._createParametrs(options);
         this._init();
         this._initEvents();
      }

      _initEvents() {

         var resizeTimer = 0;
         global.addEventListener('resize', () => {
            clearInterval(resizeTimer);

            resizeTimer = setTimeout(() => {
               requestAnimationFrame(() => {
                  this.resize();
                  this.tik();
               })
            }, 150);
         });

         global.addEventListener('load', () => {
            this.resize();
            this.tik();
         });
      }

      _init() {
         this._getCanvas();
         this._getCtx();
         this.resize();
      }

      start() {
         if (this.status.start) return;
         this.status.start = true;

         var self = this;
         var start = startCount;

         requestAnimationFrame(function tik() {
            self.tik();

            if (start == startCount) {
               requestAnimationFrame(tik); 
            }
         });
      }

      stop() {
         this.status.start = false;
         startCount++;
      }

      resize() {
         this.updateMetrics();

         this.canv.width = this.metrics.gameW;
         this.canv.height = this.metrics.gameH;
      }

      updateMetrics() {
         var m = this.metrics;

         m.gameW = window.innerWidth;
         m.gameH = window.innerHeight;
      }

      clear() {
         this.ctx.clearRect(0, 0, this.metrics.gameW, this.metrics.gameH);
      }

      tik() {
         this.clear();
         this.options.beforeRender();
      }

      setCamera(camera) {
         this.camera = this._getCameraOnScreen(camera);
      }

      render(objects) {
         var ctx = this.ctx;
         //console.log(objects.length);

         for (var i = objects.length - 1; i >= 0; i--) {
            var obj = this._getObjOnScreen(objects[i]);
            
            if (objects[i].img) {
               ctx.drawImage(objects[i].img, obj.x, obj.y, obj.w, obj.h);
            } else {
               ctx.fillStyle = objects[i].fakeColor || 'rgba(0,0,0,0.3)';
               ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
            }
           
         }

      }

      _getCameraOnScreen(camera) {
         return camera.scale(this.options.scale);
      }

      _getObjOnScreen(obj) {
         var m = this.metrics;
         var scaleX = this.options.scale.x;
         var scaleY = this.options.scale.y;
         
         return {
            x: (obj.x * scaleX) - this.camera.x + m.gameW / 2,
            y: (obj.y * scaleY) - this.camera.y + m.gameH / 2,
            w: obj.w * scaleX,
            h: obj.h * scaleY,
         }
      }

      isVisible(config) {
         var obj = this._getObjOnScreen(config);
         //console.log(obj);

         return isIntersectRect(
            0, this.metrics.gameW, 0, this.metrics.gameH,
            obj.x, obj.x + obj.w, obj.y, obj.y + obj.h
         );
      }

      _getCtx() {
         this.ctx = this.canv.getContext('2d');
      }

      _getCanvas() {
         this.canv = document.querySelector('.game__main_canv');
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);

         this.canv = null;
         this.ctx = null;
         this.camera = {};

         this.status = {
            start: false,
         }

         this.metrics = {};
      }
      
   }
   
   global.Game.Render = Render;   
   
}(window));