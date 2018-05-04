;(function(global){
   'use strict'

   var overlay = null; //оверлей-затемнение для модального окна
   
   var DEF = {
      exitButton: true //показывать кнопку закрытия

   }
   
   /**
    * Modal - уведомления
    * 
    * use:
    * var modal = new Modal(root, {
    *    . . .
    * });
    * 
    *  
    * @class
    * @param {object} options - настройки (по умолчанию DEF)
   */
   class Modal extends Events {
      constructor(root, options = {}) {
         super();

         if ( !(root instanceof HTMLElement) ) {
            throw new Error('Первый параметр толжен быть html элементом');
            return;
         }

         this.root = root;

         this._createParametrs(options);
         this._init();
         this._initEvents();
      }

      show() {
         this.root.classList.add('modal-show');
         overlay.classList.add('modal__overlay-show');
      }

      hide() { 
         this.root.classList.remove('modal-show');
         overlay.classList.remove('modal__overlay-show');
      }
      
      _init() {
         this._create();
         this._getElements();
      }
   
      //Иницилизирует DOM-события
      _initEvents() {
         
      }

      _create() { 
         this.root.classList.add('modal');

         this._createOverlay();
      }

      _createOverlay() { 
         if (overlay) return;

         overlay = document.createElement('div');
         overlay.classList.add('modal__overlay');
      }

      _getElements() { 
         
      }

   
      //Создает основные параметры испльзуемые конструктором
      //options - передаются из конструктора при иницилизации
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         
         this.els = {};
      }
   

   }
   
   global.Modal = Modal;

}(window));
