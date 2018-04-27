;(function(global){
   "use strict"

   var DEF = {

      //Пути к картам
      levelsSrc: [
         "maps/test.json",
         "maps/test2.json",
         "maps/test3.json",
         "maps/new_test.json",
         "maps/new_test2.json",

         "maps/1.json",
      ],

      //Текущий уровень
      curLevel: 5,
   }


   class MapManager {
      constructor(options = {}) {
         this._createParametrs(options);
      }

      //Получение карты текущего уровня
      getLevel() {
         return new Promise((resolve, reject) => {
            this._loadMap().then((JSONMap) => {
               resolve( this.parser.parse(JSONMap) );
            }, () => {
               reject("Не удалось загрузить карту");
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
      
      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         this.curLevel = this.options.curLevel;

         this.levels = [];

         this.parser = new Game.MapParser();
      }


   }  
   
   global.Game.MapManager = MapManager;   
   
}(window));