;(function(global){
   "use strict"

   var startCount = 1;

   var DEF = {
      scaleX: 10,
      scaleY: 10, 

      getRenderConfig: () => {
         return {};
      }
   }

   class Render {
      constructor(options) {
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
         var cameraX = config.cameraX;
         var cameraY = config.cameraY;

         var ctx = this.ctx;
         var scaleX = this.options.scaleX;
         var scaleY = this.options.scaleY;

         for (var i = objects.length - 1; i >= 0; i--) {
            var obj = objects[i];

            var x = obj.x * scaleX;
            var y = obj.y * scaleY;
            var w = obj.w * scaleX;
            var h = obj.h * scaleY;

            if (!this._isVisible(x, y, w, h, cameraX, cameraY)) {
               continue; 
            }

            if (obj.img) {
               ctx.drawImage(obj.img, x, y, w, h);
            } else {
               ctx.fillRect(x, y, w, h);
            }
           
         }
         
      }

      _isVisible(x, y, w, h, cameraX, cameraY) {
         return true;
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