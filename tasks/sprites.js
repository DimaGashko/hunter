"use strict";

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports = function(options) {
   return function() {

      //img and sass
      var spriteData = gulp.src(options.src)
         .pipe($.spritesmith({
            imgName: 'sprite.png',
            imgPath: 'img/sprite.png',
            cssName: '_sprite.sass',
            cssFormat: 'sass',
            algorithm: 'binary-tree',
         }));
         
      spriteData.img.pipe(gulp.dest(options.dstImg));
      spriteData.css.pipe(gulp.dest(options.dstSass));

      //json
      spriteData = gulp.src(options.src)
         .pipe($.spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprites_config.js',

            cssTemplate: (data) => {
               var spritesObj = {};

               data.sprites.forEach((sprite) => {
                  spritesObj[sprite.name] = {
                     x: sprite.x,
                     y: sprite.y,
                     w: sprite.width,
                     h: sprite.height,
                  };
               });

               return `var SPRITES = ${JSON.stringify(spritesObj, 0, 3)}`;
            }
         }));

      spriteData.css.pipe(gulp.dest(options.dstJS));

      return spriteData;
      
   }
}
