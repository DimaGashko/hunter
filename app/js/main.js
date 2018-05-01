;(function(global) {
    "use strict"

    var els = {
        fps: document.querySelector('.fps'),
        won: document.querySelector('.won'),
        earlyOnFinish: document.querySelector('.early_on_finish'),
    }
   
    startFpsMeter(document.querySelector('.fps'));

    var game = window.g = new Game();
    game.startLevel();
   
    game.addEvent('win', () => { 
        won();
    });

    ; (function () {
        var timer = 0;

        game.addEvent('early_on_finish', () => { 
            els.earlyOnFinish.classList.add('early_on_finish-show');
            
            if (timer !== 0) { 
                clearTimeout(timer);
            }

            timer = setTimeout(() => { 
                els.earlyOnFinish.classList.remove('early_on_finish-show');
            }, 3000);
        });
    }());

    function won() { 
        els.won.classList.add('won-show');
    }

    ; (function initEvents() {

        els.won.addEventListener('click', (event) => {
            var targ = event.target;

            if (targ.classList.contains('won__resume')) {
                els.won.classList.remove('won-show');
            
            } else if (targ.classList.contains('won__restart')) {
                els.won.classList.remove('won-show');
                game.restart();
            
            } else if (targ.classList.contains('won__secret_level')) {
                els.won.classList.remove('won-show');
                game.openSecterLevel();
            
            }
        });

    }());

}(window));