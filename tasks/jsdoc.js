"use strict";

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports = function(options) {
   return function(cb) {
      return gulp.src(options.src, {read: false})  
         .pipe($.jsdoc3(cb));
   }
}