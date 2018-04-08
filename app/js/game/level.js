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
         this._clearConfig();
      }

      _init() {
         this._createAllObjects();
         this._createPlayer();
      }

      _createAllObjects() {
         this._createBlocks('blocks');
         this._createBlocks('decorates');
         this._createBlocks('actors');
      }
      
      _createPlayer() {
         if (!this.config.player) {
            throw new Error('Неполучены параметры игрока');

            this.config.player = {
               x: 0, y: 0,  w: 1, h: 1,
            }
         }

         this.player = new Game.Player(this.config.player, {
            tile: this.config.tile
         }); 
      }

      getAllObjects() {
         var objects = [this.player].concat(
            this._getLayerObjects(this.blocks), 
            this._getLayerObjects(this.decorates)
         );

         return objects;
      }

      _createBlocks(chunkName) {
         this.objects[chunkName] = this.config[chunkName].map(chunk => {
            return {
               x: chunk.x,
               y: chunk.y,
               data: chunk.data.map(item => {
                  return new Game.Block(item, {
                     tile:  this.config.tile,
                  }); 
               }),
            }
         });
      }

      _getLayerObjects(layer) {
         var objects = [];
         
         layer.forEach(chunk => {
            //Если сектор карты не виден
            var shunkObj = {
               x: chunk.x, 
               y: chunk.y, 
               w: this.config.chunk.w,
               h:  this.config.chunk.h
            }
            
            if (!this.options.isVisible(shunkObj)) return;
            //objects.push(shunkObj); //отрисовывать области секторов

            chunk.data.forEach((item) => {
               if (this.options.isVisible(item)) {
                  objects.push(item);
               }
            });
         });

         return objects;
      }

      _clearConfig() {
         this.config.blocks = {};
         this.config.actors = {};
         this.config.decorates = {};
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);

         this.objects = {
            blocks: [],
            decorates: [],
            actors: [],
         }
      }

   }
   
   global.Game.Level = Level;   
   
}(window));