;(function(global) {
    "use strict"

    var els = {
        game: document.querySelector('.game'),
        won: document.querySelector('.won'),
        menu: document.querySelector('.menu'),
        earlyOnFinish: document.querySelector('.early_on_finish'),
        fps: document.querySelector('.fps'),
    }
   
    startFpsMeter(els.fps);

    var game = window.g = new Game({
        startLevel: +localStorage['game-cur_level'] || 0,
    });

    game.startLevel();
   
    game.addEvent('win', () => { 
        els.won.classList.add('won-show');
    });

    game.addEvent('change_level', (newLevel) => { 
        localStorage['game-cur_level'] = newLevel;
    });

    (function () {
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

    (function initEvents() {

        els.game.addEventListener('click', (event) => {
            var targ = event.target;

            if (targ.classList.contains('game__resume')) {
                game.start();
            
            } else if (targ.classList.contains('game__level_restart')) {
                game.startLevel();
            
            } else if (targ.classList.contains('game__game_restart')) {
                game.restart();
            
            } else if (targ.classList.contains('game__open_secret_level')) {
                game.openSecterLevel();
            
            }
        });

        els.won.addEventListener('click', (event) => {
            var targ = event.target;

            if (targ.classList.contains('won__button')) {
                els.won.classList.remove('won-show');
            
            }
        });

        els.menu.addEventListener('click', (event) => {
            var targ = event.target;

            if (targ.classList.contains('menu__button')) {
                els.menu.classList.remove('menu-show');
            
            }
        });

    }());

}(window));