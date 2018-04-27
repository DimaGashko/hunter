;(function(global){
   "use strict"
   
   var game = window.g = new Game();

   //fps
   var fpsEl = document.createElement('div');
   fpsEl.style.cssText = `
      position: fixed;
      top: 5px;
      right: 5px;
      color: red;
      font-size: 16px;
      z-index: 999999;
      font-family: arial;
   `;

   let frameCount = function _fc(timeStart) {
        
      let now = performance.now();
      let duration = now - timeStart;
      
      if(duration < 1000) {
          
          _fc.counter++;
          
      } else {
                    
          _fc.fps = _fc.counter;
          _fc.counter = 0;
          timeStart = now; 
         fpsEl.innerHTML = _fc.fps || '...';
 
      }
      requestAnimationFrame(() => frameCount(timeStart)); 
   }
  
   frameCount();

frameCount.counter = 0;
frameCount.fps = 0;

   document.body.appendChild(fpsEl);

}(window));