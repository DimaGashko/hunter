;(function(global) {
    "use strict"

    var els = {
        fps: document.querySelector('.fps'),
        won: document.querySelector('.won')
    }
   
    startFpsMeter(document.querySelector('.fps'));

    var game = window.g = new Game();
   
    game.addEvent('win', () => { 
        won();
    });

    function won() { 
        els.won.classList.add('won-show');
    }

    ; (function initEvents() {

        els.won.addEventListener('click', (event) => {
            var targ = event.target;

            if (targ.classList.contains('won__resume')) {
                els.won.classList.remove('won-show');
            }

            else if (targ.classList.contains('won__restart')) {
                els.won.classList.remove('won-show');
                game.restart();
            }
        });

    }());

}(window));