;(function(global){
   "use strict"

   //Кеширование tileset
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
            //x, y - точки на tileset-e с которых начинается кадр
            //w, h - ширина и высота тайла
            //duration - длительность показа данного кадра

            x: 0, 
            y: 0,
            w: 32,
            h: 32,
            duration: 0,
         }],
      },

      //Выполнится после загрузки tileset-a
      onTilesetLoaded: () => {
         
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
    */
   class Sprite {
      constructor(options = {}) {
         this._createParametrs(options);
         this._init();
      }

      _init() {
         this._loadTileset().then(() => {
            this._createCanvas();
            this._setSize(); 

            this.options.onTilesetLoaded();

         }, () => {
            console.error(
               'Не удалось загрузить tileset:',
               this.options.tileset
            );
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

         //Если какая-то анимация уже запущена
         if (this.timer != 0) {
            //И она такого-же типа
            if (this.curAnimateType === type) {
               return;
            }

            //И если нет, то останавливаем предыдущюю анимацию
            this.stop();
         }

         var config = this.options.cadrs[type];

         if (!config || config.length === 0) {
            console.error('Нет кадров в анимации типа', type);
            return;
         }

         if (config.length === 1) {
            this._draw(config[0]);
            return;
         }

         var self = this;
         var cadrIndex = 0;

         this.timer = setTimeout(function drawNext() { 
            self._draw(config[cadrIndex]);

            cadrIndex = (cadrIndex  + 1) % config.length;

            selft.timer = setTimeout(drawNext, config[cadrIndex].duration);
         }, config[cadrIndex].duration);
      }

      //Останавливает анимацию
      stop() {
         clearTimeout(this.timer);
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
               loadedTilests[src] = null; //кешируем, что такого tileset-a нет
               
               reject();
            }

            tileset.src = src;

         });
      }

      /**
       * Рисует кадр спрайта
       * 
       * @param {Object} config парамерты карда
       * (из options.cadrs[type][index])
       * 
       * Очищает холст перед рисованием очищает
       */
      _draw(config) {
         _clear();

         this.ctx.drawImage(
            this.tileset,

            config.x,
            config.y,
            config.w,
            config.h,

            0,
            0,
            this.options.size.x,
            this.options.size.y
         );
      }

      _clear() {
         if (!this.ctx) return;

         this.ctx.clearRect(
            0,
            0,
            this.options.w,
            this.options.h
         );
      }

      _setSize() {
         if (!this.canv) return;

         this.canv.width = this.options.w;
         this.canv.height = this.options.h;
      }

      _createCanvas() {
         this.canv = document.createElement('canvas');
         this.ctx = this.canv.getContext('2d');
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         this.timer = 0; //Таймер, используемый для setTimeout

         this.tileset = null;
         this.canvas = null;
         this.ctx = null;

         this.curAnimateType = null; //Текущий тип анимации
      }
   }
    
   global.Sprite = Sprite;   
   
}(window));