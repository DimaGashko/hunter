;(function(global){
   "use strict"

   var DEF = {

      //Пути к картам
      levelsSrc: [
         "maps/1.json",
         "maps/2.json",
         "maps/3.json",
         "maps/4.json",
         "maps/5.json",

         "maps/new_test.json"
      ].map(item => item + '?0'),

      //Текущий уровень
      curLevel: 0, 
   }


   class MapManager {
      constructor(options = {}) {
         this._createParametrs(options);
      }

      //Получение карты текущего уровня
      getLevel() {
         console.log(this.curLevel);
         
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

            var src = this.options.levelsSrc[levelIndex || this.curLevel];
            console.time('load');
            if (src in localStorage && 0) {
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
      
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         this.curLevel = this.options.curLevel;

         this.parser = new Game.MapParser();
      }


   }  
   
   global.Game.MapManager = MapManager;   
   
}(window));