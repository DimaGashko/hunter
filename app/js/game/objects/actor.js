;(function(global){
   "use strict"

   var DEF = {   
      fillStyle: 'rgba(255,0,0,0.5)', //Цвет при отсутствии tileset-a

   }
   
   /**
    * Базовый класс игрового персонажа
    */
   class Actor extends Game.DinamicBlock {
      constructor(options = {}) {
         options = extend(true, {}, DEF, options);
         super(options);
      }

      goToLeft() {
         if (this.moveStatus.goToLeft) {
            this.moveStatus.goToLeft = false;
            if (this.maxSpeed.x > -this.speed.x) {
               this.speed.x -= 0.1;
            }
         }
      }

      goToRight() {
         if (this.moveStatus.goToRight) {
            this.moveStatus.goToRight = false;
            if (this.maxSpeed.x > this.speed.x) {
               this.speed.x += 0.1;
            }   
         }
      }

      jump() {
         if (this.moveStatus.jump) {
            this.moveStatus.jump = false;
            if (this.maxSpeed.y > -this.speed.y) {
               this.speed.y -= 0.4;
            }   
         }
         
      }

      /**
       * (Game.DinamicBlock.fn.updateCoords)
       */
      updateCoords() {
         super.updateCoords.apply(this, arguments);

         
      }

      /*
      _correctSpeed() {
         var speed = this.speed.scalarAbs();
         var max = this.maxSpeed;

         if (speed.x > max.x) speed.x = max.x;
         if (speed.y > max.y) speed.y = max.y;

         if (this.speed.x < 0) speed.x = -speed.x;
         if (this.speed.y < 0) speed.y = -speed.y;

         this.speed = speed;
      }*/

      _clearMoveStatus() {
         this.moveStatus.goToLeft = false;
         this.moveStatus.goToRight = false;
         this.moveStatus.jump = false;
      }
 
      _createParametrs() {
         super._createParametrs.apply(this, arguments);

         //Состояние перемещения персонажа
         //То есть, что он сейчас делает
         //Идет или прыгает и тп.
         //Используется, что бы во время взаимодействия с другими объектами
         //Понимать, что персонаж должен переместиться
         //(Block.fn.respondInteraction)
         this.moveStatus = {
            goToLeft: false,
            goToRight: false,
            jump: false,
         }

         this.maxSpeed = new Vector(0.1, 0.1);

      }
   }
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   /*
   class Actor extends Game.Block {
      constructor(config = {}, options = {}) {
         super({
            animation: [{
               duration: 0,
               id: 37,
               startX: 160,
               startY: 64
            }],
            x: config.x,
            y: config.y,
            w: 1,
            h: 1
         }, {
            tile: {w: 32, h: 32, src: "img/minecraft-sprite.png"}   
         });
      }

      goToLeft() {
         this.speed.x -= this.a.x;
         this.status.left = false;
      }

      goToRight() {
         this.speed.x += this.a.x;
         this.status.right = false;
      }

      jump() {
         this.speed.y -= this.a.y;
         this.status.jump = false;
      }

      jumpDown() {
         this.speed.y += this.a.y;
         this.status.jump = false;
      }

      //Наносит урон (этому объекту)
      pain(val) {
         if (val < this.minPain) return;
         
         this.life -= val;
         this._checkLife();

         console.log(`Был нанесен урон: ${val^0}`,  `Осталось: ${Math.round(((this.life > 0 ? this.life : 0)/this.startLife)*100)}%`);
      }

      _checkLife() {
         if (this.life < 0) {
            console.log('die');
         }
      }

      updateCoords(times = 1) {
         this.prevCoords = this.coords.copy();
         
         this._correctSpeed();
         //console.log(this.speed.x, this.speed.y);
         
         //this.speed.mul(times);
         this.coords = this.coords.plus(this.speed);
      }

      _correctSpeed() {
         var speed = this.speed;
         var max = this.maxSpeed;
         var min = this.minSpeed;

         if (speed.x > max.x) speed.x = max.x;
         else if (speed.x < min.x) speed.x = min.x;

         if (speed.y > max.y) speed.y = max.y;
         else if (speed.y < min.y) speed.y = min.y;
         
         //this.speed = this.speed.div(2);
      }

      _setFaceColor() { 
         this.fakeColor = 'rgba(255,0,0,0.5)';
      }

      clearStatus() {
         this.status = {
            left: false,
            right: false,
            jump: false,
         }
      }

      _createParametrs() {
         super._createParametrs.apply(this, arguments);

         this.speed = new Vector(0, 0);

         this.startLife = 1000;
         this.life = this.startLife;
         this.minPain = 50;

         this.maxSpeed = new Vector(8/60, 100/60);
         this.minSpeed = new Vector(-8/60, -100/60);

         this.a = new Vector(0.2, 0.4);

         this.status = {
            left: false,
            right: false,
            jump: false,
         }
      }

   }*/

   Object.defineProperty(Actor.prototype, 'type', {
      value: 'actor',
   });
   
   global.Game.Actor = Actor;   
   
}(window));