/**
 * FPS meret - реализует простой счетчик FPS
 * 
 * Для использования, необходимо написать:
 * 
 * startFpsMeter(el) - где el - dom-элемент
 */

(function (global) {
   var started = false; 
   var roots = []; //Элементы, в которых нужно обновлять значение fps

   var fps = 0; 

   //Запускает FpsMeter для переданного элемента
   function startFpsMeter(root) { 
      if ( !(root instanceof HTMLElement) ) { 
         console.error('Передан не DOM-элемент');
      }

      start();

      roots.push(root);
   }

   //Непосредственно запускает и считает fps
   function start() { 
      if (started) return;
      
      var started = true;

      var timeStart = performance.now();
      var counter = 0
      fps = 0;

      requestAnimationFrame(function tik() { 
         var now = performance.now();
         var time = now - timeStart;
         
         if (time < 1000) {
            counter++;
            
         } else {
            fps = counter;
            counter = 0;
            timeStart = now;
            update();
         }

         requestAnimationFrame(tik);
      });
   }

   //Обновляет значения fps для всех элементов
   function update() { 
      roots.forEach((root) => { 
         root.innerHTML = fps;
      });
   }

   global.startFpsMeter = startFpsMeter;

}(window));
         

         