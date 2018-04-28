;(function(global){
	"use strict"

   var DEF = {   
      fillStyle: 'rgba(0,255,0,0.5)', //Цвет при отсутствии tileset-a
		
		props: {
			health: 1000,
		}
   }
   
   /**
    * Базовый класс игрового персонажа
    */
   class Actor extends Game.DinamicBlock {
      constructor(options = {}, collisions) {
         options = extend(true, {}, DEF, options);
         super(options, collisions);
		}
		
		pain(damage) { 
			damage -= this._armor;
			if (damage < this.minDamage) return;

			this._health -= damage;
			console.log(damage, this._health);
		}

      goToLeft() {
         if (this.ownSpeed.x > -this.speed.x) {
            this.speed.x -= this.ownSpeed.x;
         }
      }

      goToRight() {
            if (this.ownSpeed.x > this.speed.x) {
               this.speed.x += this.ownSpeed.x;
            } 
      }

      jump() {
         if (this.moveStatus.jump) {
            this.moveStatus.jump = false;
            if (this.ownSpeed.y > -this.speed.y) {
               this.speed.y -= this.ownSpeed.y;
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

      clearMoveStatus() {
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
         
			this._health = this.options.props.health || 0;

			this.ownSpeed = new Vector(0.12, 0.4);
			
			this.minDamage = 40;
      }
   }
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   /*

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

   }*/

   Object.defineProperty(Actor.prototype, 'type', {
      value: 'actor',
   });
   
   global.Game.Actor = Actor;   
   
}(window));