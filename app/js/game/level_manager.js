;(function(global){
   "use strict"

   var DEF = {
      levelsSrc: [
         "maps/test.json",
      ],
      curLevel: 0,
   }

   class LevelManager {
      constructor(options = {}) {
         this._createParametrs(options);
      }

      //Получение карты текущего уровня
      getLevel() {
         return new Promise((resolve, reject) => {
            if (this.levels[this.curLevel]) {
               resolve(this.levels[this.curLevel]);
               return;
            }

            this._loadMap().then((JSONLelevel) => {
               this._parseLevel(JSONLelevel);
               resolve(this.levels[this.curLevel]);
            }, () => {
               reject("Не удалось загрузить уровень");
            });
         });
      }

      //Загрузка карты текущего уровня (JSON)
      _loadMap() {
         return new Promise((resolve, reject) => {
            console.time('load');
            var xhr = new XMLHttpRequest();
            xhr.open('GET', this.options.levelsSrc[this.curLevel], true);
            xhr.send();

            xhr.onreadystatechange = () => {
               if (xhr.readyState != 4) return;
               console.timeEnd('load');
               if (xhr.status != 200) reject();
               else resolve(xhr.responseText);
            }
         });
      }

      _parseLevel(JSONLelevel) {
         var config = JSON.parse(JSONLelevel);
         global.config = config;

         var parsed = {
            tile: {
               w: config.tilewidth,
               h: config.tileheight,
               src: config.tilesets[0].image,
            },
            chunk: {
               w: config.layers[0].chunks[0].width,
               h: config.layers[0].chunks[0].width,
            },
            blocks: [],
            decorates: [],
            player: null,
         }

         config.layers.forEach(layer => {
            var name = layer.name; 
            var container = parsed[name] = parsed[name] || [];

            layer.chunks.forEach(chunk => {
               var chunkResult = {
                  x: chunk.x,
                  y: chunk.y,
                  data: [],
               };

               container.push(chunkResult);
               var data = chunkResult.data;

               chunk.data.forEach((item, i) => {
                  if (item === 0) return;
                  item--;
                  
                  var tileParam = config.tilesets[0].tiles[item] || {};
                  var type = (tileParam.type || '').toLowerCase();

                  var itemResolt = {
                     x: chunk.x + (i % chunk.width),
                     y: chunk.y + Math.floor(i / chunk.width),
                     w: 1,
                     h: 1,
                     type: type,
                     animation: [],
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

                  if (!type) data.push(itemResolt);
                  else parsed[type] = itemResolt;
               });
            });

         });

         this.levels[this.curLevel] = parsed;
      }

      _getCadrParam(config, cadr) {
         var columns = config.tilesets[0].columns;

         return {
            duration: cadr.duration || 0,
            startX: config.tilewidth * Math.floor(cadr.tileid / columns),
            startY: config.tileheight * (cadr.tileid % columns),
            id: cadr.tileid,
         }
      }
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         this.curLevel = this.options.curLevel;

         this.levels = [];
      }


   }  
   
   global.Game.LevelManager = LevelManager;   
   
}(window));