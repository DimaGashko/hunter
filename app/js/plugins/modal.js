;(function(global){
   'use strict'
   
   var DEF = {
      exitButton: true, //показывать кнопку закрытия
      afterShow() { },
      afterHide() { },
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
            console.error('Первый параметр толжен быть html элементом');
            return;
         }

         this.content = content;

         this._createParametrs(options);
         this._init();
         this._initEvents();
      }

      show() {
         this.root.classList.add('modal-show');
         this.trigger('show');
         this.options.afterShow();
      }

      hide() { 
         this.root.classList.remove('modal-show');
         this.trigger('hide');
         this.options.afterHide();
      }

      toggle() { 
         if (this.root.classList.contains('modal-show')) {
            this.hide();
         
         } else { 
            this.show();

         }
      }
      
      _init() {
         this._create();
         this._getElements();
         this._addToDom();
      }
   
      //Иницилизирует DOM-события
      _initEvents() {
         this.root.addEventListener('click', (event) => { 
            var targ = event.target;

            if (targ.classList.contains('modal__overlay')) {
               this.hide();
            }
         });
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
         <div class="modal__overlay"></div>
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
