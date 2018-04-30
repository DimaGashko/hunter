;(function(global){
   "use strict"
   
    var game = window.g = new Game();
   
    game.addEvent('win', () => { 
        alert('You won!');
    });

    startFpsMeter(document.querySelector('.fps'));

}(window));