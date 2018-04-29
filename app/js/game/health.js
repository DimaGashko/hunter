;(function(global){
   'use strict'
   
   const HEARTS_COUNT = 10 //количество сердечек-жизней
   const ONE_HEART = 100 / HEARTS_COUNT; //проент жизний одного сердечка

   var DEF = {
      
   }
   

   /**
    * Health
    *
    * @class
    * @param {object} options - настройки (по умолчанию DEF)
   */
   class Health {
      constructor(options = {}) {
         this._createParametrs(options);
         this._init();

         console.log('Helth');
         
      }

      /**
       * Устанавливает actor, за жизнями которого нужно следить
       * 
       * @param {Actor} actor 
       */
      setObject(actor) { 
         this.actor = actor;

         this._initActorEvents();
         this.update('noAnimate');
      }

      /**
       * Обновляет значение жизней actor-а
       */
      update(noAnimate) {
         this.els.prev.innerHTML = this.els.real.innerHTML
         this.els.real.innerHTML = this._getHTML();

         if (!noAnimate) this.startBlink();
      }

      startBlink() { 
         var blinkCount = 0;

         if (this.blinkCount !== 0) { 
            clearTimeout(this.blinkTimer);
            this.blinkTimer = 0;
         }

         this.els.real.classList.add('health__real-blink');

         this.blinkTimer = setTimeout(() => { 
            this.els.real.classList.remove('health__real-blink');
         }, 1000);
      }

      _getHTML() { 
         var hearts = this.getHealthPercent() / ONE_HEART;
         
         var full = hearts ^ 0;
         var half = (hearts - (hearts ^ 0) > 0) ? 1 : 0;
         var empty = HEARTS_COUNT - full - half;
         console.log(full, half, empty)
         var html = this._getHeartHtml('full', full);

         if (half) { 
            html += this._getHeartHtml('half', 1);
         }

         html += this._getHeartHtml('empty', empty);
         //console.log(html)
         return html;
      }

      getHealthPercent() { 
         return Math.round(this.actor.health / this.actor.fullHealth * 100)
      }

      _init() {
         this._getHTMLElements();
      }  

      _getHTMLElements() { 
         var r = this.els.root = document.querySelector('.health');
         this.els.real = r.querySelector('.health__real');
         this.els.prev = r.querySelector('.health__prev');
      }
   
      //Иницилизирует события
      _initActorEvents() {
         this.actor.addEvent('pain', () => { 
            this.update();
         })
      }
      
      _getHeartHtml(type = 'full', count = 1) { 
         var one = `<div class="health__heart health__heart-${type}"></div>`;
         return new Array(count + 1).join(one);
      }

      //Создает основные параметры испльзуемые конструктором
      //options - передаются из конструктора при иницилизации
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
      
         this.els = {};

         this.actor = null;

         this.blinkTimer = 0;

      }
   

   }
   
   global.Game.Health = Health;

}(window));
