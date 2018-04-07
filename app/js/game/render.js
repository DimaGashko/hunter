;(function(global){
   "use strict"

   var startCount = 1;

   var DEF = {
      getRenderConfig: () => {}
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

      tik() {
         this.clear();
         this.render(this.options.getRenderConfig())
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