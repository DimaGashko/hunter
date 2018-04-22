;(function(global){
   "use strict"

   //Кеширование tileset-ов
   //Содержит поля у который ключ - это путь к картинке
   //А значение - либо DOM элемент tileset-a (Image)
   //Либо null если картинку с таким адресом загрузить не удалось
   var loadedTilests = {} 

   var DEF = {
      tileset: 'tileset.png', //Путь к тайлсету со спрайтами

      size: new Vector(32, 32), //Размеры элемента канваса/спрайта

      //Объект, сореджащий кадры анимаций по типам
      //Тип передается при вызове метода start
      //И испльзуется для выбора кадров, которые стоит отрисовывать
      cadrs: {

         //Каждый тип - этом массив, содержащий объекты вида:
         base: [{
            metrics: {
               //x, y - точки на tileset-e с которых начинается кадр
               //w, h - ширина и высота тайла

               x: 0, 
               y: 0,
               w: 32,
               h: 32,
            },

            //Трансформации спрайта
            transforms: {
               mirrorX: true, //Отзеркаливать ли по горизонтали
               mirrorY: true, //Отзеркаливать ли по вертикали
            },
            
            //Длительность показа данного кадра
            duration: 0,
         }],
      },
   }

   /**
    * Класс для работы со спрайтами и их анимациями
    * 
    * Конструктор получает объект настроек в формате DEF
    * 
    * Порядок работы:
    * - содание екземпляра
    * - вызов метода start(type), когда нужно начать анимацию нужного типа
    * - вызов метода stop(), когда нужно остановить анимацию
    * 
    * - - - - -
    * Класс Sprite наследует от Events
    * Поэтому у него есть методы события
    * (addEvent, trigger...)
    * 
    * Поддерживаемые события:
    * "tileset_load" - вызывается, после загрузки тайлсета
    */
   class Sprite extends Events {
      constructor(options = {}) {
         super();
         
         this._createParametrs(options);
         this._init();
      }

      _init() {
         this._loadTileset().then(() => {
            this._createCanvas();
            this._setSize(); 

            this.trigger('tileset_load', this);

         }, () => {
            
         });
      }

      /**
       * Начинает анимацию спрайта переданного типа
       * 
       * @param {string} type типа анимации
       * Праметры типа - options.cadrs[type]
       * Параметры должны содержать параметры хотя бы одного кадра
       * 
       * Пока не загружен tileste ничего не делает.
       */
      start(type) {
         if (this.tileset === null) return;
         
         if (!type) {
            console.error(
               'Неправильный тип анимации (', type,
               '). Будет использован тип "base"'
            );

            type = 'base';
         }

         //Таже анимация
         if (type === this.curAnimateType) {
            return;
         }

         this.curAnimateType = type;

         //Если какая-то анимация уже запущена
         if (this.timer != 0) {
            this.stop();
         }

         var config = this.options.cadrs[type];

         if (!config || config.length === 0) {
            console.error('Нет кадров в анимации типа', type);
            return;
         }

         if (config.length === 1) {
            this._draw(
               config[0].metrics,
               config[0].transforms
            );
            
            return;
         }

         var self = this;
         var cadrIndex = 0;

         this.timer = setTimeout(function drawNext() { 
            self._draw(
               config[cadrIndex].metrics,
               config[cadrIndex].transforms
            );

            cadrIndex = (cadrIndex  + 1) % config.length;

            self.timer = setTimeout(drawNext, config[cadrIndex].duration);
         }, config[cadrIndex].duration);
      }

      //Останавливает анимацию
      stop() {
         clearTimeout(this.timer);
         this.curAnimateType = '';
         this.timer = 0;
      }

      /**
       * Меняет размеры канваса/спрайта
       * 
       * @param {Vector} newSize новый размер
       * 
       * Все что нарисовано на спрайте будет стерто
       */
      changeSize(newSize) {
         this.options.size = newSize;
         this._setSize();
      }

      /**
       * Загружает tileset по адресу из options.tileset
       * 
       * Кеширует tileset-ы, которые удалось и не удалось загрузить 
       * 
       * Возвращает промис
       */
      _loadTileset() {
         var src = this.options.tileset;

         return new Promise((resolve, reject) => {
            //Проверка закешированных tileset-ов
            var loaded = loadedTilests[src];
            
            //Закешированно, но не было загруженно
            if (loaded === null) {
               reject();

               return;
            
            //Закешированно и удачно загруженно
            } else if (loaded instanceof Image) {
               this.tileset = loaded;
               
               resolve();

               return;
            }
               
            var tileset = new Image();

            tileset.onload = () => {
               loadedTilests[src] = tileset; //кешируем tilest
               this.tileset = tileset;

               resolve();
            }

            tileset.onerror = () => {
               //Проверка обязательно должно произмодиться не через 
               //Логическое преобразование(так как в проверяемом объекте 
               //Могут содержатсья занчения null, которые тоже нужно учитывть)
               if ( !(src in loadedTilests) ) { 
                  console.error(
                     'Не удалось загрузить tileset: "',
                     this.options.tileset, '"'
                  );

                  loadedTilests[src] = null; //кешируем, что такого tileset-a нет
               } 
               
               reject();
            }

            tileset.src = src;

         });
      }

      /**
       * Рисует кадр спрайта
       * 
       * @param {Object} metrics положение и размеры спрайта в tileset-e
       * @param {Vector} transform трансформации (формат из options.cadr)
       * 
       * Очищает холст перед рисованием очищает
       */
      _draw(metrics, transforms) {
         //Проверки
         if (this._isSameCadr(metrics, transforms)) {
            return;
         }

         this._clear();

         this.ctx.save();
         
         if (transforms) {
            if (transforms.mirrorX) {
               this.ctx.translate(this.options.size.x, 0);
               this.ctx.scale(-1, 1);
            }
   
            if (transforms.mirrorY) {
               this.ctx.translate(0, this.options.size.y);
               this.ctx.scale(1, -1);
            }
         }
         
         this.ctx.drawImage(
            this.tileset,

            metrics.x,
            metrics.y,
            metrics.w,
            metrics.h,

            0,
            0,
            this.options.size.x,
            this.options.size.y
         );

         this.ctx.restore();

         this.prevDrawCofig.metrics = metrics;
         this.prevDrawCofig.transforms = transforms;
      }

      /**
       * Возвращает true, если переданны парамеры кадра 
       * Точно такие же как и у предыдущего
       * 
       * @param {object} metrics метрики кадра 
       * @param {object} transforms трансформации кадра
       */
      _isSameCadr(metrics, transforms) {
         return (
            this.prevDrawCofig.metrics === metrics &&
            this.prevDrawCofig.transforms === transforms
         );   
      }

      //Очищает канвас спрайта
      _clear() {
         if (!this.ctx) return;

         this.ctx.clearRect(
            0,
            0,
            this.options.size.x,
            this.options.size.y
         );
      }

      _setSize() {
         if (!this.sprite) return;

         this.sprite.width = this.options.size.x;
         this.sprite.height = this.options.size.y;
      }

      _createCanvas() {
         this.sprite = document.createElement('canvas');
         this.ctx = this.sprite.getContext('2d');
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         this.timer = 0; //Таймер, используемый для setTimeout

         this.tileset = null;
         this.sprite = null; //canvas содержащий спрайт
         this.ctx = null;

         this.curAnimateType = ''; //Текущий тип анимации


         //Параметры последнего отрисованного кадра
         //Используется, что бы не отрисовывать подряд одинковые кадры
         this.prevDrawCofig = {
            metrics: {},
            transforms: {},
         }
      }
   }
    
   global.Game.Sprite = Sprite;   
   
}(window));