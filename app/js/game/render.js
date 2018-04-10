;(function(global){
   "use strict"

   var startCount = 1; //испльзутеся для корректного старта и паузы отрисовки 
      //(зашита от несколькоих stop/start за время одного кадра)

   var DEF = {
      scale: new Vector(64, 64), //масштаб игры по осям
      beforeRender: () => {}, //будер выполнятся перед каждой переросовкой
   }

  /**
    * Управление отрисовкой игры
    * 
    * @constructor 
    * @param {object} options - настройки (по умолчанию DEF)
    * 
    * Для начала отрисовки необходимо вызвать метод start()
    */
   class Render {
      constructor(options = {}) {
         this._createParametrs(options);
         this._init();
         this._initEvents();
      }

      _init() {
         this._getCanvas();
         this._getCtx();
         this.resize();
      }

      //Запускает отрисовку
      //На каждом кадре выполняет метод tik()
      start() {
         if (this.status.start) return;
         this.status.start = true;

         var self = this;
         var start = startCount;

         var time = Date.now();

         requestAnimationFrame(function tik() {
            if (start == startCount) {
               var newTime = Date.now();

               //искажение времени от отклонения fps
               var dilation = (newTime - time) / 16
               
               self.tik(dilation); //вызываем в условии, что бы при 
                  //остановки не отрисовывались лишние кадры

               time = newTime
               requestAnimationFrame(tik); 
            }
         });
      }

      //Останавливает отрисовку
      stop() {
         this.status.start = false;
         startCount++;
      }

      /**
       * Функция отрисовки объектов на экране
       * 
       * Отисовывает переданные объекты в обратном порятке 
       * (то есть первый объект в массиве будет отрисован последним,
       * и следовательно будет находится над другими)
       * 
       * Отрисовывает только прямоугольники
       * 
       * Также функция не проверяет, будет ли объект виден на экране
       * Это нужно проверять самостоятельно с помщью метода isVisible()
       * 
       * @param {array} objects - массив отрисовываемых объектов
       * Каждый объект должен иметь вид: {x, y, w, h, img, fillStyle}
       * Если есть свойство img, то fillStyle не используется
       * 
       */
      render(objects) {
         var ctx = this.ctx;

         //проверка количества отрисовываемых объектов
         //console.log(objects.length); 

         for (var i = objects.length - 1; i >= 0; i--) {
            var obj = this._getObjOnScreen(objects[i]);
            
            if (objects[i].img) {
               ctx.drawImage(objects[i].img, obj.x, obj.y, obj.w, obj.h);
            } else {
               ctx.fillStyle = objects[i].bgcolor || 'rgba(0,0,0,0.3)';
               ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
            }
           
         }
      }

      //Кадр анимации
      tik(dilation) {
         this.clear();
         this.options.beforeRender();
      }

      /**
       * Установить положение (координаты камеры)
       * @param {Vector} camera - вектор, сорержащий реальные координаты камеры
       */
      setCamera(camera) {
         this.camera = camera.scale(this.options.scale);
      }

      //Переопределение размеров игрового
      resize() {
         this.updateMetrics();

         this.canv.width = this.metrics.gameW;
         this.canv.height = this.metrics.gameH;
      }

      //Обновляет размеры используемые для расчетов
      //(не исопльзовать размеры получая их от DOM-элементов!)
      updateMetrics() {
         this.metrics.gameW = window.innerWidth;
         this.metrics.gameH = window.innerHeight;
      }

      //Очищает игровое поле
      clear() {
         this.ctx.clearRect(0, 0, this.metrics.gameW, this.metrics.gameH);
      }
      
      /**
       * По передонному объекту с реальными коондинатами
       * Возвращает объект координат и размеров прямоугольника на экране 
       * 
       * @param {object} obj 
       */
      _getObjOnScreen(obj) {
         var scale = this.options.scale;
         
         return {
            x: (obj.x * scale.x) - this.camera.x + this.metrics.gameW / 2,
            y: (obj.y * scale.y) - this.camera.y + this.metrics.gameH / 2,
            w: obj.w * scale.x,
            h: obj.h * scale.y,
         }
      }

      /**
       * Проверяет, будет ли отображатся переданным объект на экране
       * 
       * 
       * @param {object} realObj - объект вида {x, y, w, h} - 
       * все значения - реальные
       * 
       * @param {number} k - изменение реальной области экрана
       * если k = 0, то будут видимыми будут считаться только те объекты, 
       * которые действительно будут видны
       * 
       * если k > 0, то область будет увеличина в k раз
       * если k < 0, то область будет уменьшина в k раз
       */
      isVisible(realObj, k = 0.5) {
         var obj = this._getObjOnScreen(realObj);

         //делаем отдельно для k = 0, что бы при таком k
         //производительность метода была максимальной

         if (k === 0) {
            return isIntersectRect(
               0, this.metrics.gameW, 0, this.metrics.gameH,
               obj.x, obj.x + obj.w, obj.y, obj.y + obj.h
            );
         }

         var gw = this.metrics.gameW;
         var gh = this.metrics.gameH;

         //Дополнительные размеры области
         k /= 2;

         var kw = gw * k;
         var kh = gh * k;
         
         return isIntersectRect(
            -kw, gw + kw, -kh, gh + kh,
            obj.x, obj.x + obj.w, obj.y, obj.y + obj.h
         );
         
      }

      _getCtx() {
         this.ctx = this.canv.getContext('2d');
      }

      _getCanvas() {
         this.canv = document.querySelector('.game__main_canv');
      }

      //Иницилизирует необходимые DOM-события
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