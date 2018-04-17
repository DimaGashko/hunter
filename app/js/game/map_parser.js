;(function(global){
   "use strict"

   var DEF = {

   }

   /**
    * Разбирает карту из формата json в необходимый игре формат
    * 
    * @constructor
    */
   class MapParser {
      constructor(options = {}) {
         this._createParametrs(options);
      }

      /**
       * Возвращает разпарсенную карту в нужном игре формате
       * 
       * @param {JSON string} JSONMap - строка карты в формате JSON
       */
      parse(JSONMap) {
         var config = JSON.parse(JSONMap);

         var parsed = {
            tile: {
               w: config.tilewidth,
               h: config.tileheight,
               src: config.tilesets[0].image.slice(3),
            },
            blocks: {
               static: [],
               dinamic: [],
               decorates: [],
            },
            actors: [],
            player: null,
         }

         config.layers.forEach(layer => {
            if (layer.type === 'tilelayer') {
               this._parseBlocks(config, layer, parsed.blocks);

            } else if (layer.type === 'objectgroup') {
               if (layer.name === 'player') {
                  parsed.player = this._parseObject(layer.objects[0]);
               
               } else {
                  parsed[layer.name] = layer.objects.map((object) => {
                     return this._parseObject(object);
                  });
               }
           
            }
         });
         
         return parsed;
      }

      _parseBlocks(config, layer, blocks) {
         var name = layer.name; 
         var container = blocks[name] = blocks[name] || [];

         layer.chunks.forEach(chunk => {
            var chunkResult = {
               x: chunk.x,
               y: chunk.y,
               w: chunk.width,
               h: chunk.height,
               data: [],
            };

            container.push(chunkResult);
            var data = chunkResult.data;

            chunk.data.forEach((item, i) => {
               if (item === 0) return;
               item--;
               
               var tileParam = config.tilesets[0].tiles[item] || {};
               var type = tileParam.type;

               var itemResolt = {
                  x: chunk.x + (i % chunk.width),
                  y: chunk.y + Math.floor(i / chunk.width),
                  w: 1,
                  h: 1,
                  type: type || '',
                  animation: [],
                  props: config.tilesets[0].tileproperties[item] || {},
               }

               if (!tileParam.animation || tileParam.animation.length == 0) {
                  itemResolt.animation[0] = this._getCadrParam(config, {
                     tileid: item,
                  });
               } else {
                  itemResolt.animation = tileParam.animation.map(cadr => {
                     return this._getCadrParam(config, cadr);
                  });
               }

               data.push(itemResolt); 
            });
         });
      }

      _parseObject(obj) {
         return {
            x: obj.x,
            y: obj.y,
            name: obj.name,
            rotation: obj.rotation,
            type: obj.type,
         }
      }

      _getCadrParam(config, cadr) {
         var columns = config.tilesets[0].columns;

         return {
            duration: cadr.duration || 0,
            startX: config.tilewidth * (cadr.tileid % columns),
            startY: config.tileheight * Math.floor(cadr.tileid / columns),
            id: cadr.tileid,
         }
      }
      
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         
      }

   }  
   
   global.Game.MapParser = MapParser;   
   
}(window));