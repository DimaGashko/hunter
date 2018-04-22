;(function(global){
   "use strict"

   var DEF = {
      isVisible: () => {
         return true;
      },
   }

   class Level {
      constructor(config, options = {}) {
         this._createParametrs(options);
         this.config = config;

         this._init();
      }

      _init() {
         this._createAllObjects();
         this.findVisible()
      }

      findVisible() {
         this._findVisibleBlocks('static');
         this._findVisibleBlocks('dinamic');
         this._findVisibleBlocks('decorates');
         this._findVisibleActors();
      }

      getObjectsToRender() {
         var objects = [this.player.person.convertToRender()];
      
         ['dinamic', 'static', 'decorates'].forEach(type => {
            this.objects.blocks[type].forEach((obj) => {
               objects.push(obj.convertToRender());
            });
         });

         this.objects.actors.forEach((obj) => {
            objects.push(obj.convertToRender()); 
         });

         return objects;

      }

      _createAllObjects() {
         this._createBlocks('static');
         this._createBlocks('dinamic');
         this._createBlocks('decorates');

         this._createActors();
         this._createPlayer();
      }

      _createBlocks(type) {
         var container = this.allObjects.blocks[type];

         this.config.blocks[type].forEach(chunk => {
            var res = {
               x: chunk.x,
               y: chunk.y,
               w: chunk.w,
               h: chunk.h,
               data: chunk.data.map(item => {
                  var Constr = this.objectTypes[item.type] || Game.Block;
                  //console.log(item)
                  return new Constr(item);
               }),
            }

            container.push(res);
         });
      }

      _createActors() {
         this.allObjects.actors = this.config.actors.map((item) => {
            var Constr = this.objectTypes[item.type] || Game.Actor;

            return new Constr(item, {
               tile: this.config.tile,
            });
         });
      }

      _createPlayer() {
         this.player = new Game.Player({
            personConfig: this.config.player,
         });
      }

      _findVisibleBlocks(type) {
         //console.log(this)
         var container = this.objects.blocks[type];
         var isVisible = this.options.isVisible;

         container.length = 0; //Очищаем массив
         
         this.allObjects.blocks[type].forEach((chunk) => {
            if (!isVisible(chunk) && 0) return;
         
            chunk.data.forEach((item) => {
               if (isVisible(item.convertToRender())) { 
                  container.push(item);
                  item.start();
               
               } else {
                  item.stop();
               }

               
            });
         });
      }

      _findVisibleActors(type) {
         var container = this.objects.actors;
         var isVisible = this.options.isVisible;

         container.length = 0; //Очищаем массив
         
         this.allObjects.actors.forEach((actor) => {
            if (!isVisible(actor.convertToRender()), 2) return;

            container.push(actor);
         });
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);

         this.allObjects = {
            blocks: {
               static: [],
               dinamic: [],
               decorates: []
            },
            actors: [],
         }

         this.objects = {
            blocks: {
               static: [],
               dinamic: [],
               decorates: []
            },
            actors: [],
         }

         this.objectTypes = {
            Player: Game.Player,
            Coin: Game.Coin,

            Block: Game.Block,
         }

      }

   }
   
   global.Game.Level = Level;   
   
}(window));