;(function(global) {
    "use strict"
   
    startFpsMeter(document.querySelector('.fps'));

    var game = window.g = new Game();
   
    game.addEvent('win', () => { 
        alert('You won!');
    });

}(window));