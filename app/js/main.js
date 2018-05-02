;(function(global) {
    "use strict"

    var els = {
        game: document.querySelector('.game'),
        won: document.querySelector('.won'),
        menu: document.querySelector('.menu'),
        openMenu: document.querySelector('.open_menu'),
        earlyOnFinish: document.querySelector('.early_on_finish'),
        fps: document.querySelector('.fps'),
    }

    var game = window.g = new Game({
        startLevel: +localStorage['game-cur_level'] || 0,
    });    

    game.startLevel();

    var notify = new Notify({
        autoHideTime: 3000,
    });
   
    game.addEvent('win', () => { 
        els.won.classList.add('won-show');
        els.menu.classList.remove('menu-show');
    });

    game.addEvent('change_level', (newLevel) => { 
        localStorage['game-cur_level'] = newLevel;
    });

    game.addEvent('early_on_finish', () => {
        notify.show('Соберите все предметы!');
    });    

    game.addEvent('error_level_load', () => { 
        game.restart();
    });

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

        els.openMenu.addEventListener('click', () => { 
            els.menu.classList.add('menu-show');
        });

        document.addEventListener('keyup', (event) => {
            if (event.keyCode === 27) {
                els.menu.classList.toggle('menu-show');
                els.won.classList.remove('won-show');
            }
        })

    }());

    startFpsMeter(els.fps);

}(window));