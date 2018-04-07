"use strict";

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports = function(options) {
   return function() {
      return gulp.src(options.src)
         .pipe($.sass())
         .on('error', $.notify.onError((err) => {
            return {
               title: 'Sass',
               message: err.message,
            }
         }))
         .pipe($.autoprefixer('last 2 versions', '> 1 %', 'ie 9'))
         .pipe($.rename('main.css'))
         .pipe(gulp.dest(options.dst))
         .pipe($.connect.reload());
   }
}

