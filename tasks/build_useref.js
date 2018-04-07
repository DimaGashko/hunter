"use strict";

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports = function(options) {
   return function() {
      return gulp.src(options.src)
         .pipe($.useref())
         .pipe($.if('*.js', $.babel({
            presets: ['es2015'],
         })))
         .pipe($.if('*.css', $.minifyCss()))
         .pipe(gulp.dest(options.dst));
   }
}


