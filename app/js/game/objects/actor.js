;(function(global){
	"use strict"

   var DEF = {   
      fillStyle: 'rgba(0,255,0,0.5)', //Цвет при отсутствии tileset-a
		
		props: {
         health: 1000,
         painInterval: 250,
		}
   }
   
   /**
    * Базовый класс игрового персонажа
    * 
    * @class
    */
   class Actor extends Game.DinamicBlock {
      constructor(options = {}, collisions) {
         options = extend(true, {}, DEF, options);
         super(options, collisions);
		}
		
      pain(damage) {  
         var time = Date.now();
         if (time - this._prevPain < this._painInterval) { 
            return;
         }

         if (this._died) return;

			damage -= this.armor;
			if (damage < this.minDamage) return;

			this.health -= damage;

			if (this.health < 0) {
				this.health = 0;
			}

			this.trigger('pain');

			if (this.health === 0) {
				this.die();
         }
         
         this._prevPain = time;
		}

      die() { 
         if (this._died) return;
         this._died = true;

         setTimeout(() => { 
            globalEvents.trigger('actor_die', this);
         }, 200);
		}

      goToLeft() {
         if (this._died) return;

         if (this.ownSpeed.x > -this.speed.x) {
            this.speed.x = -this.ownSpeed.x;
         }
      }

      goToRight() {
         if (this._died) return;

         if (this.ownSpeed.x > this.speed.x) {
            this.speed.x = this.ownSpeed.x;
         } 
      }

      jump() {
         if (this._died) return;

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

      get fullHealth() { 
         return this.options.props.health;
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
         this._died = false;
         
			this.health = this.options.props.health || 0;

			this.ownSpeed = new Vector(0.12, 0.4);
			
         this.minDamage = 40;
         
         this._prevPain = 0;
         this._painInterval = this.options.props.painInterval;
      }
   }

   Object.defineProperty(Actor.prototype, 'type', {
      value: 'actor',
   });
   
   global.Game.Actor = Actor;   
   
}(window));