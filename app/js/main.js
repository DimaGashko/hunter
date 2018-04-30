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
        game.pause();



        game.restart();
    }

    function initEvents() { 
        els.won.addEventListener('click', (event) => { 
            var targ = event.target;

            if (target.classList.contain('.won__resume')) {
                console.log('resume');
            }

            else if (target.classList.contain('.won__restart')) { 
                console.log('restart');
                
            }
        });
    };
}(window));