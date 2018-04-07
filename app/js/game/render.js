;(function(global){
   "use strict"

   var startCount = 1;

   var DEF = {
      scaleX: 32,
      scaleY: 32, 

      getRenderConfig: () => {
         return {};
      }
   }

   class Render {
      constructor(options = {}) {
         this._createParametrs(options);
         this._init();
         this._initEvents();
      }

      _initEvents() {
         global.addEventListener('resize', () => {
            this.resize();
            this.tik();
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
         startCount++;
      }

      
      resize() {
         this.updateMetrics();

         this.canv.width = this.metrics.gameW;
         this.canv.height = this.metrics.gameH;
      }

      updateMetrics() {
         var m = this.metrics;

         m.gameW = document.body.offsetWidth;
         m.gameH = document.body.offsetHeight;
      }

      clear() {
         this.ctx.clearRect(0, 0, this.metrics.gameW, this.metrics.gameH);
      }

      tik() {
         this.clear();
         this._render()
      }

      _render() {
         var config = this.options.getRenderConfig();
         var objects = config.objects;
         var camera = this._getCameraOnScreen(config.camera);
         var ctx = this.ctx;
         
         for (var i = objects.length - 1; i >= 0; i--) {
            var obj = this._getCoordsOnScreen(objects[i], camera);

            if (!this._isVisible(obj)) {
               continue; 
            }
            
            if (objects[i].img) {
               ctx.drawImage(objects[i].img, obj.x, obj.y, obj.w, obj.h);
            } else {
               ctx.fillStyle = objects[i].fakeImgColor;

               ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
            }
           
         }

      }

      _getCameraOnScreen(camera) {
         return {
            x: camera.x * this.options.scaleX,
            y: camera.y * this.options.scaleY,
         }
      }

      _getCoordsOnScreen(obj, camera) {
         var m = this.metrics;
         var scaleX = this.options.scaleX;
         var scaleY = this.options.scaleY;

         return {
            x: (obj.x * scaleX) - camera.x + m.gameW / 2,
            y: (obj.y * scaleY) - camera.y + m.gameH / 2,
            w: obj.w * scaleX,
            h: obj.h * scaleY,
         }
      }

      _isVisible(obj) {
         var m = this.metrics;

         return (
            obj.x + obj.w >= 0 &&
            obj.y + obj.h >= 0 &&
            obj.x <= m.gameW &&
            obj.y <= m.gameH
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

         this.metrics = {};
      }
      
   }
   
   global.Game.Render = Render;   
   
}(window));