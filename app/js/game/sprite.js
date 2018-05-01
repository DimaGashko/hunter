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

            mirrorX: false, //Отзеркаливать по горизонтали (кадр)
            mirrorY: false, //Отзеркаливать по вертикали (кадр)

            //Длительность показа данного кадра
            duration: 0,
         }],
      },

      mirrorX: false, //Отзеркаливать по горизонтали (все кадры)
      mirrorY: false, //Отзеркаливать по вертикали (все кадры)
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
    * "before_chande_cadr" - вызывается перед смене кадра
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
       * @param {bool} requiredStart запустить в любом случае
       * 
       * Праметры типа - options.cadrs[type]
       * Параметры должны содержать параметры хотя бы одного кадра
       * 
       * Пока не загружен tileste ничего не делает.
       */
      start(type, requiredStart) {
         if (this.tileset === null || this.ctx === null) return;
         
         if (!type) {
            console.error(
               'Неправильный тип анимации (', type,
               '). Будет использован тип "base"'
            );

            type = 'base';
         }

         //Таже анимация
         if (type === this.curAnimateType) {            
            return; //убирает возможность многократного вызова аниации 
            //одного вида, из-за чего может зациклится первый кадр
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
            this._drawNext(config[0]);
            return;
         }

         var self = this;
         var cadrIndex = 0;
         
         this._drawNext(config[cadrIndex]);
         this.timer = setTimeout(function timerFunc() {           
            cadrIndex = (cadrIndex + 1) % config.length;
            self._drawNext(config[cadrIndex]);
               
            self.timer = setTimeout(timerFunc, config[cadrIndex].duration);
         }, config[cadrIndex].duration);

      }

      /**
       * Отрисовывает кадр, с переданными параметрами
       * Выполняя все необходыми дополнительные действия
       * (непосредственно рисует, и вызвает события)
       * 
       * @param {object} config 
       */
      _drawNext(config) { 
         var allow = true; //разрешение на рисование кадра


         //Вызывается событие "before_chande_cadr"
         //В hendlers передается 2 параметра
         //Первый - параметры кадра
         //Вротой - фукнция, для запрета отрисовки кадра
         //Для этого ее нужно вызвать:

         //sprite.addEvent('before_chande_cadr', (config, disallow) => {
         // disallow();
         //});
         
         this.trigger('before_chande_cadr', config, function disallow() { 
            allow = false;
         });

         if (allow) {
            this._draw(config.metrics, config.transforms);
         }
      };

      //Останавливает анимацию
      stop() {
         if (this.timer === 0) return; 

         clearTimeout(this.timer);
         this.timer = 0;
         
         this.curAnimateType = '';
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
         var config = this._getDrawConfig(metrics, transforms);
         
         if (this._isSameDrawConfig(config, this._prevDrawCofig)) {
            return;
         }
         
         this._prevDrawCofig = config;

         this._clear();
         if (!this.ctx) console.log(this.canvas)
         this.ctx.save();
         
         this._setMirror(config);

         this.ctx.drawImage(
            this.tileset,

            config.x^0,
            config.y^0,
            config.w^0,
            config.h^0,

            0,
            0,
            this.options.size.x^0,
            this.options.size.y^0
         );

         this.ctx.restore();
      }

      /**
       * Возвращает параметры кадра
       * 
       * @param {object} metrics метрики кадра
       * @param {object} transforms трансформации кадра
       */
      _getDrawConfig(metrics, transforms = {}) { 
         return {
            x: metrics.x,
            y: metrics.y,
            w: metrics.w,
            h: metrics.h,
            mirrorX: transforms.mirrorX ^ this.options.mirrorX,
            mirrorY: transforms.mirrorY ^ this.options.mirrorY,
         }
      
         /*
            Смысл использования XOR в даной фукцнии:

            Отзеркаливание в спрайтах можно применять непоследственно для 
            кадра, а также для всех кадров.
            При этом отзеркаливания налаживаются.

            Если кадр не отзеркален, при глобальном отзеркаливании
            он будет отзеркален, а если отзеркален, то он будет отзеркален 
            дважды - то есть он не будт отзеркален.
            Проанализировав можно сделать вывод, что это и есть XOR

            Если разные - то отзеркаливаем. Если одинаковые - то нет
         */
      }

      /**
       * Возвращает одинаковые ли переданные drawConfig-и
       * 
       * @param {object} config1 первый drawConfig
       * @param {object} config2 второй drawConfig
       */
      _isSameDrawConfig(config1, config2) { 
         if (!config1 || !config2) return;
         
         return (
            config1.x === config2.x &&
            config1.y === config2.y &&
            config1.w === config2.w &&
            config1.h === config2.h &&
            config1.mirrorX === config2.mirrorX &&
            config1.mirrorY === config2.mirrorY
         );
      }

      /**
       * Устанавливает отзеркаливание кадра
       * 
       * @param {object} config drawConfig кадра
       */
      _setMirror(config) { 
            if (config.mirrorX) {
               this.ctx.translate(this.options.size.x, 0);
               this.ctx.scale(-1, 1);
            }
   
            if (config.mirrorY) {
               this.ctx.translate(0, this.options.size.y);
               this.ctx.scale(1, -1);
            }
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

         this.ctx.imageSmoothingEnabled = false; 
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