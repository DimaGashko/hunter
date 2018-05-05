;(function(global){
   "use strict"

   var DEF = {

      //Пути к картам
      levelsSrc: [
         "maps/_level_1.json",
         "maps/level_1.json",
         "maps/level_2.json",
         "maps/level_3.json",
         "maps/level_4.json",
         "maps/level_5.json",
         "maps/level_6.json",
         "maps/level_10.json",
         "maps/secret_level.json"
      ].map(item => item + '?' + Date.now()),

      tilesetSrc: "tilesets/tileset.json",

      //Текущий уровень
      curLevel: 0, 
   }


   class MapManager extends Events {
      constructor(options = {}) {
         super(options);

         this._createParametrs(options);
         this._init();
      }

      _init() {
         this._loadTileset().then((JSONTileset) => {
            this.tileset = JSON.parse(JSONTileset);
            this.trigger('tileset_loaded');
         }, () => { 
            console.error(`Не удалось загрузить ${this.options.tilesetSrc}`);
         });
      }

      _loadTileset() { 
         return new Promise((resolve, reject) => {
            var src = this.options.tilesetSrc;
            console.time('load tileset');

            if (src in localStorage) {
               resolve(localStorage[src]);
               console.timeEnd('load tileset');
               return;
            }

            var xhr = new XMLHttpRequest();
            xhr.open('GET', src, true);
            xhr.send();

            xhr.onreadystatechange = () => {
               if (xhr.readyState != 4) return;

               console.timeEnd('load tileset');

               if (xhr.status != 200) {
                  reject();
               }
               else {
                  localStorage[src] = xhr.responseText;
                  resolve(xhr.responseText);
               }
            }
         });
      }

      //Получение карты текущего уровня
      getLevel() {
         return new Promise((resolve, reject) => {
            this._loadMap().then((JSONMap) => {
               if (!this.tileset) {
                  this.addEvent('tileset_loaded', () => {
                     resolve(this.parser.parse(JSONMap, this.tileset));
                  })
               }
               else {
                  resolve(this.parser.parse(JSONMap, this.tileset));
               }
               
               this._loadNextLevel();
            }, () => {
               reject("Не удалось загрузить карту");
            });
         });
      } 
      
      nextLevel() { 
         this.curLevel = (this.curLevel + 1) % this.options.levelsSrc.length;
      }

      isLastMap() { 
         return this.curLevel === this.options.levelsSrc.length - 1;
      }

      //Загрузка карты текущего уровня (JSON)
      _loadMap(levelIndex, src) {
         return new Promise((resolve, reject) => {
            if (levelIndex === undefined) levelIndex = this.curLevel;
            src = this.options.levelsSrc[levelIndex || this.curLevel];

            console.time('load');
            if (src in localStorage) {
               resolve(localStorage[src]);
               console.timeEnd('load');
               return;
            }

            var xhr = new XMLHttpRequest();
            xhr.open('GET', src, true);
            xhr.send();

            xhr.onreadystatechange = () => {
               if (xhr.readyState != 4) return;

               console.timeEnd('load');

               if (xhr.status != 200) {
                  reject();
               }
               else {
                  localStorage[src] = xhr.responseText;
                  resolve(xhr.responseText);
               }
            }
         });
      } 

      _loadNextLevel() { 
         if (this.isLastMap()) return;
         
         this._loadMap(this.curLevel + 1);
      }

      get levelCount() { 
         return this.options.levelsSrc.length;
      }
      
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         this.curLevel = this.options.curLevel;

         this.parser = new Game.MapParser();

         this.tileset = null;
      }


   }  
   
   global.Game.MapManager = MapManager;   
   
}(window));