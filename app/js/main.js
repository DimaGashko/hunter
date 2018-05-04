﻿(function (global) {
    "use strict"

    var els = {
        game: document.querySelector('.game'),
        won: document.querySelector('.won'),
        menu: document.querySelector('.menu'),
        openMenu: document.querySelector('.open_menu'),
        instruction: document.querySelector('.instruction'),
        fps: document.querySelector('.fps'),
    }

    var modals = {
        won: new Modal(els.won),
        menu: new Modal(els.menu),
        instruction: new Modal(els.instruction),
    }

    var game = window.g = new Game({
        startLevel: +localStorage['game-cur_level'] || 0,
    });    

    game.startLevel();

    var infoNotify = new Notify({
        autoHideTime: 3000,
    });

    var errorNotify = new Notify({
        autoHideTime: 3000,
        type: 'error',
    });
   
    game.addEvent('win', () => { 
        won.show()
    });

    game.addEvent('change_level', (newLevel) => { 
        localStorage['game-cur_level'] = newLevel;
    });

    game.addEvent('early_on_finish', () => {
        infoNotify.show('Соберите все предметы!');
    });    
    
    game.addEvent('error_level_load', () => { 
        errorNotify.show('Не удалось загрузить уровень');
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
            
            } else if (targ.classList.contains('open_instruction')) {
                modals.instruction.show();
                
            }
        });

        els.won.addEventListener('click', (event) => {
            var targ = event.target;

            if (targ.classList.contains('won__button')) {
                modals.won.show();
            
            }
        });

        els.menu.addEventListener('click', (event) => {
            var targ = event.target;

            if (targ.classList.contains('menu__button')) {
                modals.menu.hide();
            
            }
        });

        els.openMenu.addEventListener('click', () => { 
            modals.menu.show();
        });

        document.addEventListener('keyup', (event) => {
            if (event.keyCode === 27) {
                modals.won.hide();
                modals.instruction.hide();
                modals.menu.toggle();
            }
        })

        els.instruction.addEventListener('click', (even) => { 
            var targ = event.target;
            
            if (targ.classList.contains('instruction__exit')) { 
                modals.instruction.hide();
            }
        });

    }());

    var fpsMeter = new FPSMeter();
    fpsMeter.addEvent('change', () => { 
        els.fps.innerHTML = fpsMeter.fps;
    });

}(window));