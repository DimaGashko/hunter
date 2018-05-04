/**
 * FPS meter - реализует простой счетчик FPS
 */

(function (global) {
   var events = new Events();
   var started = false; 
   var fps = 0; 

   //Непосредственно запускает и считает fps
   function start() { 
      if (started) return;
      var started = true;

      var timeStart = performance.now();
      var counter = 0
      fps = 0;

      requestAnimationFrame(function tik() { 
         var now = performance.now();
         var time = now - timeStart;
         
         if (time < 1000) {
            counter++;
            fps = (1000 / time) * counter
            
         } else {
            fps = counter;
            counter = 0;
            timeStart = now;
            
            events.trigger('change');
         }

         requestAnimationFrame(tik);
      });
   }

   /**
    * 
    *  
    * @class
    * @param {object} options - настройки (по умолчанию DEF)
   */
   class FPSMeter extends Events {
      constructor() {
         super();

         this._createParametrs();
         this._init();
         this._initEvents();
      }

      _init() {
         start();
      }

      _initEvents() { 
         events.addEvent('change', () => {
            this.trigger('change', this.fps);
         });
      }

      get fps() { 
         return fps;
      }
      
      _createParametrs() {
         
      }


   }

   global.FPSMeter = FPSMeter;

}(window));
         

         