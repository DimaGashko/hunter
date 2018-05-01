;(function(global) {
    "use strict"

/*
    var canvas = document.querySelector('.game__main_canv');

    canvas.width = 500;
    canvas.height = 500;

    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;  


    var cnv2 = document.createElement('canvas');
    cnv2.width = 64;
    cnv2.height = 64;
    cnv2.style['image-rendering'] = 'pixelated';
    var ctx2 = cnv2.getContext('2d');
    ctx2.imageSmoothingEnabled = false; 

    

    var img = new Image();

    img.onload = () => { 
        ctx2.drawImage(
            img,
            48, 0, 16, 16,
            0, 0, 64, 64
        )

        ctx.drawImage(
            cnv2,
            150, 150, 128, 128
        );
    }

    //img.src = 'img/sprite.png'
    img.src = 'img/minecraft-sprite-16.png'

    return;
*/
    var els = {
        fps: document.querySelector('.fps'),
        won: document.querySelector('.won'),
        earlyOnFinish: document.querySelector('.early_on_finish'),
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