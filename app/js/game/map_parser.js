;(function(global){
   "use strict"

   var DEF = {

   }

   /**
    * Разбирает карту из формата json в необходимый игре формат
    * 
    * @class
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
               //Слои блоков (tiles)
               this._parseBlocks(config, parsed, layer);
               
            } else if (layer.type === 'objectgroup') {
               //Слои объектов (actors)
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
       * Парсит переданный слой объектов. 
       * Результат заносит в parsed.actors или в parsed.player
       * (В зависимости от имени слоя)
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

      /**
       * Парсит переданый объект Actor-а
       * 
       * @param {object} config разпарсенная карта
       * @param {object} actor параметры actor-a
       */
      _parseActor(config, actor) { 
         var result = (actor.gid) ?
            this._parseObjByTileIndex(config, actor.gid - 1) : {};
         
         //Координаты и размеры на карте указаны в пикселях. 
         //Поэтому их нужно перевести в реальные 
         //(Перевод происходит делением на tilewidth/tileheight)
         result.x = actor.x / config.tilewidth; 
         result.y = actor.y / config.tileheight;
         
         if (actor.point) { 
            result.w = 1;
            result.h = 1;
         } else {
            result.w = actor.width / config.tilewidth;
            result.h = actor.height / config.tileheight;
         }
         
         result.name = actor.name;
         result.type = actor.type;
         result.tileW = config.tilewidth;
         result.tileH = config.tileheight;

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
         var tileset = config.tilesets[0];
         var tileParam = tileset.tiles[item] || {};

         var itemResolt = {
            w: 1,
            h: 1,
            type: tileParam.type || '',
            props: tileset.tileproperties[item] || {},
            tileset: tileset.image.slice(3),
            animation: [],
            tileW: config.tilewidth,
            tileH: config.tileheight,
         }

         if (chunk) { 
            //Координаты (определяются по положению в объекте сектора карты)
            itemResolt.x = chunk.x + (index % chunk.width);
            itemResolt.y = chunk.y + Math.floor(index / chunk.width);
         }

         //Обработка парaметров анимации
         if (!tileParam.animation || tileParam.animation.length == 0) {
            //Если анимации нет, то добавляем хотя бы один кадр, который 
            //Будет состоять самого текущего тайла
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

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         
      }

   }  
   
   global.Game.MapParser = MapParser;   
   
}(window));