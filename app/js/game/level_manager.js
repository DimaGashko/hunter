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
            var xhr = new XMLHttpRequest();
            xhr.open('GET', this.options.levelsSrc[this.curLevel], true);
            xhr.send();

            xhr.onreadystatechange = () => {
               if (xhr.readyState != 4) return;
            
               if (xhr.status != 200) reject();
               else resolve(xhr.responseText);
            }
         });
      }

      _parseLevel(JSONLelevel) {
         var config = JSON.parse(JSONLelevel);

         var blocks = [];
         var decorate = [];

         

         console.log(level);
      }

      _createParametrs(options) {
         this.options = extend(true, {}, DEF, options);
         this.curLevel = this.options.curLevel;

         this.levels = [];
      }


   }  
   
   global.Game.LevelManager = LevelManager;   
   
}(window));