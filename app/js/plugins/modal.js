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
    * var modal = new Modal(content, {
    *    . . .
    * });
    * 
    *  
    * @class
    * @param {object} options - настройки (по умолчанию DEF)
   */
   class Modal extends Events {
      constructor(content, options = {}) {
         super();

         if ( !(content instanceof HTMLElement) ) {
            throw new Error('Первый параметр толжен быть html элементом');
            return;
         }

         this.content = content;

         this._createParametrs(options);
         this._init();
         this._initEvents();
      }

      show() {
         this.root.classList.add('modal-show');
      }

      hide() { 
         this.root.classList.remove('modal-show');
      }

      toggle() { 
         this.root.classList.toggle('modal-show');
      }
      
      _init() {
         this._create();
         this._getElements();
         this._addToDom();
      }
   
      //Иницилизирует DOM-события
      _initEvents() {
         
      }

      _create() { 
         this.root = document.createElement('div');
         this.root.className = 'modal';
         this.root.innerHTML = tmpl.root(this.options);
      }

      _addToDom() { 
         this.content.parentElement.appendChild(this.root);
         this.els.main.appendChild(this.content);
      }

      _getElements() { 
         this.els.main = this.root.querySelector('.modal__main');
      }
   
      //Создает основные параметры испльзуемые конструктором
      //options - передаются из конструктора при иницилизации
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         
         this.els = {};
      }  

   }

   var tmpl = {

      root: function (options) { 
         return (`
         <div class="modal__content">
            <div class="modal__head">
               ${(options.exitButton ? this.exitButton() : '')}
            </div>
            <div class="modal__main"></div>
         </div>
      `);    
      },
      
      exitButton: function () { 
         return `<div class="modal__exit"></div>`
      }

   }
   
   global.Modal = Modal;

}(window));
