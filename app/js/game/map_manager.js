;(function(global){
   "use strict"

   var DEF = {

      //Пути к картам
      levelsSrc: [
         "maps/4.json",
         "maps/3.json",
         "maps/2.json",
         "maps/1.json",


         "maps/new_test.json",
      ],

      //Текущий уровень
      curLevel: 0, 
   }


   class MapManager {
      constructor(options = {}) {
         this._createParametrs(options);
      }

      //Получение карты текущего уровня
      getLevel() {
         return new Promise((resolve, reject) => {
            this._loadMap().then((JSONMap) => {
               resolve(this.parser.parse(JSONMap));
               
               this._loadNextLevel();
            }, () => {
               reject("Не удалось загрузить карту");
            });
         });
      }

      isLastMap() { 
         return this.curLevel === this.options.levelsSrc.length - 1;
      } 
      
      nextLevel() { 
         this.curLevel++;
      }

      //Загрузка карты текущего уровня (JSON)
      _loadMap(levelIndex) {
         return new Promise((resolve, reject) => {
            if (levelIndex === undefined) levelIndex = this.curLevel;

            if (this._saveLevel.index === levelIndex) { 
               resolve(this._saveLevel.JSONMap);
               console.log('save');
               return; 
            }

            var src = this.options.levelsSrc[levelIndex || this.curLevel];

            /*if (src in localStorage) {
               resolve(localStorage[src]);
               return;
            }*/

            //console.time('load');

            var xhr = new XMLHttpRequest();
            xhr.open('GET', src, true);
            xhr.send();

            xhr.onreadystatechange = () => {
               if (xhr.readyState != 4) return;

               //console.timeEnd('load');

               if (xhr.status != 200) {
                  reject();
               }
               else {
                  //localStorage[src] = xhr.responseText;
                  resolve(xhr.responseText);
               }
            }
         });
      } 

      _loadNextLevel() { 
         if (this.isLastMap()) return;

         var index = this.curLevel + 1;

         this._loadMap(index).then((JSONMap) => { 
            this._saveLevel.index = 1;
            this._saveLevel.JSONMap = JSONMap;
         });
      }
      
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         this.curLevel = this.options.curLevel;

         this.levels = [];

         this._saveLevel = {
            index: -1,
            JSONMap: '',
         }

         this.parser = new Game.MapParser();
      }


   }  
   
   global.Game.MapManager = MapManager;   
   
}(window));