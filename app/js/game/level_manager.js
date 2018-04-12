;(function(global){
   "use strict"

   var DEF = {

      //Пути к картам
      levelsSrc: [
         "maps/test.json",
         "maps/test2.json",
      ],

      //Текущий уровень
      curLevel: 0,
   }


   class LevelManager {
      constructor(options = {}) {
         this._createParametrs(options);
      }

      //Получение карты текущего уровня
      getLevel() {
         return new Promise((resolve, reject) => {
            this._loadMap().then((JSONLelevel) => {
               var config = this.parser.parse(JSONLelevel);
               resolve(config);
            }, () => {
               reject("Не удалось загрузить уровень");
            });
         });
      }

      //Загрузка карты текущего уровня (JSON)
      _loadMap() {
         return new Promise((resolve, reject) => {
            var src = this.options.levelsSrc[this.curLevel];

            /*if (src in localStorage) {
               resolve(localStorage[src]);
               return;
            }*/

            console.time('load');
            var xhr = new XMLHttpRequest();
            xhr.open('GET', src, true);
            xhr.send();

            xhr.onreadystatechange = () => {
               if (xhr.readyState != 4) return;
               console.timeEnd('load');
               if (xhr.status != 200) reject();
               else {
                  localStorage[src] = xhr.responseText;
                  resolve(xhr.responseText);
               }
            }
         });
      }
      
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         this.curLevel = this.options.curLevel;

         this.levels = [];

         this.parser = new Game.LevelParser();
      }


   }  
   
   global.Game.LevelManager = LevelManager;   
   
}(window));