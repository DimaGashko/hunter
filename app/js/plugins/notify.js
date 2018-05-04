;(function(global){
   'use strict'
   
   var DEF = {
      autoHide: true, //Скрывать ли уведомление атоматически
      autoHideTime: 5000, //Если autoHide: true, то 
         //через какое время скрывать уведомление
      
      type: 'info' //тип уведомления: 
         //info - обычные уведомление
         //error - уведомление об ошибке
         //warning - предупреждение
   }
   
   /**
    * Notify - уведомления
    * 
    * use:
    * var notify =  new Notify();
    * notify.show('Текст уведомления');
    *  
    * @class
    * @param {object} options - настройки (по умолчанию DEF)
   */
   class Notify extends Events {
      constructor(options = {}) {
         super();

         this._createParametrs(options);
         this._init();
         this._initEvents();
      }

      /**
       * Показывает уведомление
       * Если передан title устанавливает его текстом уведомления
       * 
       * @param {string} title тест уведомления (необязательно)
       */
      show(title) { 
         if (title) this.setTitle(title);
         
         this.els.root.classList.add('notify-show');

         if (this.options.autoHide) { 
            if (this.autoHideTimer !== 0) { 
               clearTimeout(this.autoHideTimer);
            }

            this.autoHideTimer = setTimeout(() => {
               this.hide();
            }, this.options.autoHideTime);
         }
      }

      /**
       * Прячит уведомление
       */
      hide() { 
         this.els.root.classList.remove('notify-show');
      }

      /**
       * Устанавливает текст уведомления
       */
      setTitle(title) { 
         this.title = title;
         this._updateTitle();
      }  

      _init() {
         this._create();
         this._getElements();
      }

      /**
       * Создает DOM уведомления
       */
      _create() { 
         var r = this.els.root = document.createElement('div');
         r.className = `notify notify-${this.options.type}`;

         r.innerHTML = `
            <div class="notify__title"></div>
         `;

         document.body.appendChild(r);
      }
   
      //Иницилизирует DOM-события
      _initEvents() {
      
      }

      _getElements() { 
         var r = this.els.root;
         this.els.title = r.querySelector('.notify__title');
      }

      _updateTitle() { 
         this.els.title.innerHTML = this.title;
      }
   
      //Создает основные параметры испльзуемые конструктором
      //options - передаются из конструктора при иницилизации
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         
         this.els = {};
         this.title = '';

         this.autoHideTimer = 0;
      }
   

   }
   
   global.Notify = Notify;
   

}(window));
