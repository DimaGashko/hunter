;(function(global){
   "use strict"

   var startCount = 1; //испльзутеся для корректного старта и паузы отрисовки 
      //(зашита от несколькоих stop/start за время одного кадра)

   var DEF = {
      scale: new Vector(24, 24), //масштаб игры по осям
      eachTik: () => {}, //будер выполнятся на каждом кадра (в tik())
   } 

  /**
    * Управление отрисовкой игры
    * 
    * @constructor 
    * @param {object} options настройки (по умолчанию DEF)
    * 
    * При рендере указываются реальные координаты
    * При работе с классом нужно следить за положением камеры (метод setCamera)
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
         var prevDilation = 0;

         requestAnimationFrame(function tik() {
            if (start == startCount) {
               var newTime = Date.now();

               //замедление времени от отклонения fps
               var dilation = Math.min((newTime - time) / 16, 2.5)
 
               //за один кадр замедление не должно 
               //сильно уменьшаться (но увеличиваться может)
               //dilation = Math.max(dilation, prevDilation * 0.9);

               self.tik(dilation); //вызываем в условии, что бы при 
                  //остановки не отрисовывались лишние кадры

               time = newTime;
               prevDilation = dilation;
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
       * @param {array} objects массив отрисовываемых объектов
       * Каждый объект должен иметь вид: {x, y, w, h, img, fillStyle}
       * Если есть свойство img, то fillStyle не используется
       * 
       */
      render(objects = []) {
        var ctx = this.ctx;
        
         //проверка количества отрисовываемых объектов
         //console.log(objects.length); 
         
         for (var i = objects.length - 1; i >= 0; i--) {
            var obj = this._getObjOnScreen(objects[i]);
            
            this.ctx.save();
            
            if (objects[i].img) {
               ctx.drawImage(objects[i].img, obj.x^0, obj.y^0, obj.w^0, obj.h^0);
            } else {
               ctx.fillStyle = objects[i].fillStyle || 'rgba(0,0,0,0.3)';
               ctx.fillRect(obj.x^0, obj.y^0, obj.w^0, obj.h^0);
            }

            this.ctx.restore();
           
         }
      }

      //Кадр анимации
      tik(dilation) {
         if (!this.status.start) return;
         
         this.clear();
         this.options.eachTik(dilation);
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
         
         this.canv.width = this.metrics.gameSize.x;
         this.canv.height = this.metrics.gameSize.y;

         //Для отключения сглаживания (очень важно)
         global.setCanvasSmoothing(this.ctx, false);
      }

      //Обновляет размеры используемые для расчетов
      updateMetrics() {
         var m = this.metrics;

         m.gameSize = new Vector(
            window.innerWidth,
            window.innerHeight
         );

         m.realGameSize = m.gameSize.diScale(this.options.scale);
      }

      //Очищает игровое поле
      clear() {
         this.ctx.clearRect(0, 0, this.metrics.gameSize.x, this.metrics.gameSize.y);
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
            x: (obj.x * scale.x) - this.camera.x + this.metrics.gameSize.x / 2,
            y: (obj.y * scale.y) - this.camera.y + this.metrics.gameSize.y / 2, 
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
               0, this.metrics.gameSize.x, 0, this.metrics.gameSize.y,
               obj.x, obj.x + obj.w, obj.y, obj.y + obj.h
            );
         }

         var gw = this.metrics.gameSize.x;
         var gh = this.metrics.gameSize.y;

         //Дополнительные размеры области
         k /= 2;

         var kw = gw * k;
         var kh = gh * k;
         
         return intersectRect(
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
            }, 16);
         });

         global.addEventListener('load', () => {
            this.resize();
            this.tik();
         });
      }

      //Создает основные параметры испльзуемые конструктором
      //options - передаются из конструктора при иницилизации
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);

         this.canv = null;
         this.ctx = null;
        
         this.camera = new Vector(0, 0);
         this.metrics = {};
      
         this.status = {
            start: false,
         }

      }
      
   }
   
   global.Game.Render = Render;   
   
}(window));