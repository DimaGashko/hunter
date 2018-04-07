"use strict";

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports = function(options) {
   return function() {
      return gulp.src(options.src)
         .pipe($.pug({
            pretty: true,
         }))
         .on('error', $.notify.onError((err) => {
            return {
               title: 'Jade',
               message: err.message,
            }
         }))
         .pipe($.connect.reload())
         .pipe(gulp.dest(options.dst));
      
   }
}


