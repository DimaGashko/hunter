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

         //Результат обработки
         var parsed = {
            bg: config.backgroundcolor,
            
            blocks: {
               static: [],
               dinamic: [],
               decorates: [],
            },
            actors: [],
            player: null,
         }

         //Перебор слоев
         config.layers.forEach(layer => {
            if (layer.type === 'tilelayer') {
               //Блоки (tiles)
               this._parseBlocks(config, parsed, layer);
               
            } else if (layer.type === 'objectgroup') {
               //Объекты (actors)
               this._parseObjects(config, parsed, layer);
           
            }
         });

         return parsed;
      }

      /**
       * Парсит переданный слой блоков. 
       * Результат заносит в parsed.blocks
       * 
       * @param {object} config разпарсенная карта
       * @param {object} parsed результат обработки
       * @param {object} layer обрабатываемый слой
       */
      _parseBlocks(config, parsed, layer) {
         var name = layer.name;

         //Каждый слой блоков состоит из отдельных блоков (chunks)
         parsed.blocks[name] = layer.chunks.map(chunk => {
            var chunkResult = {
               x: chunk.x,
               y: chunk.y,
               w: chunk.width,
               h: chunk.height,
               data: [], //Сами блоки
            };

            //Перебираем, не map-ом, так как многие элементы нужно отбрасывать
            chunk.data.forEach((item, i) => {
               if (item === 0) return;

               var obj = this._parseObjByTileIndex(config, item - 1, chunk, i);
               chunkResult.data.push(obj);
            });

            return chunkResult;
         });
      }

      /**
       * Парсит переданный объектов. 
       * Результат заносит в parsed.actors или в parsed.player
       * 
       * @param {object} config разпарсенная карта
       * @param {object} parsed результат обработки
       * @param {object} layer обрабатываемый слой
       */
      _parseObjects(config, parsed, layer) { 
         if (layer.name === 'player') {
            //Слой плеера
            parsed.player = this._parseActor(config, layer.objects[0]);
         
         } else {
            //Слой персонажей
            parsed[layer.name] = layer.objects.map((actor) => {
               return this._parseActor(config, actor);
            });
         }
      }

      _parseActor(config, actor) { 
         var result = (actor.gid) ?
            this._parseObjByTileIndex(config, actor.gid) : {}
         
         result.x = actor.x;
         result.y = actor.y;
         result.name = actor.name;
         result.type = actor.type;

         return result;
      }

      /**
       * По индексу тайла возвращает объект параметров этого тайла
       * 
       * @param {object} config разпарсеная карта
       * @param {number} item индекс тайла в тайлсете
       * @param {object} chunk часть карты, на которой находится объект
       * @param {number} index индекс тайла в часте (chunk) карты
       * 
       * chunk передается только при обработке тайлов
       */
      _parseObjByTileIndex(config, item, chunk, index) { 
         var tileParam = config.tilesets[0].tiles[item] || {};

         var itemResolt = {
            w: 1,
            h: 1,
            type: tileParam.type || '',
            props: config.tilesets[0].tileproperties[item] || {},
            animation: [],
         }

         if (chunk) { 
            itemResolt.x = chunk.x + (index % chunk.width);
            itemResolt.y = chunk.y + Math.floor(index / chunk.width);
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

         return itemResolt;
      }

      /**
       * Возвращает объект параметров карты
       * 
       * @param {object} config разпарсенная карта
       * @param {object} cadr параметры кадра инимации из карты
       */
      _getCadrParam(config, cadr) {
         var columns = config.tilesets[0].columns;

         return {
            metrics: {
               x: config.tilewidth * (cadr.tileid % columns),
               y: config.tileheight * Math.floor(cadr.tileid / columns),
               w: config.tilewidth,
               h: config.tileheight,
            },
            duration: cadr.duration || 0,
         }
      }














































/*
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
     */ 
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         
      }

   }  
   
   global.Game.MapParser = MapParser;   
   
}(window));