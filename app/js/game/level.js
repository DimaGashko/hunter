;(function(global){
   "use strict"

   var DEF = {
      isVisible: () => {
         return true;
      },
   }

   class Level {
      constructor(game, config, options = {}) {
         this._createParametrs(options);
         this.config = config;
         this.game = game;

         this._init();
         this.config = {};
      }

      _init() {
         this._createAllObjects();
         this.findVisible()
      }

      /**
       * Возвращает все реальные (те которые учавствуют в коллизиях) объекты
       * (возвращаются только объекты, отобранные методом findVisible())
       */
      getRealObjects() { 
         return this.getDinamicObjects()
            .concat(this.objects.blocks.static);
      }

      /**
       * Возвращает все динамические (те на которые действует сила тяжести) 
       * объекты (возвращаются только объекты, отобранные методом findVisible())
       */
      getDinamicObjects() { 
         var objects =  this.objects.actors.concat(
            this.objects.blocks.dinamic || []
         );

         objects.push(this.player.person);
         
         return objects;
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
         this._createBlocks('dinamic', Game.DinamicBlock);
         this._createBlocks('decorates');

         this._createActors();
         this._createPlayer();
      }

      _createBlocks(type, defConstr) {
         var container = this.allObjects.blocks[type];

         this.config.blocks[type].forEach(chunk => {
            var res = {
               x: chunk.x,
               y: chunk.y,
               w: chunk.w,
               h: chunk.h,
               data: chunk.data.map(item => {
                  var Constr = this.objectTypes[item.type]
                     || defConstr || Game.Block;
                  
                  return new Constr(item, this.game.collisions);
               }),
            }

            container.push(res);
         });
      }

      _createActors() {
         this.allObjects.actors = this.config.actors.map((item) => {
            var Constr = this.objectTypes[item.type] || Game.Actor;

            return new Constr(item, this.game.collisions);
         });
      }

      _createPlayer() {
         var config = this.config.player;
         
         var Constr = this.objectTypes[config.name] || Game.Actor;
         var person = new Constr(config, this.game.collisions);

         this.player = new Game.Player(person, {});
      }

      _findVisibleBlocks(type) {
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
            if (isVisible(actor.convertToRender())) {
               container.push(actor);
               actor.start();

            } else {
               actor.stop();

            }

            
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
            Steve: Game.Steve,
            Actor: Game.Actor,
            Coin: Game.Coin,
            Block: Game.Block,
         }

      }

   }
   
   global.Game.Level = Level;   
   
}(window));