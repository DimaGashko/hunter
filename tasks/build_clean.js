"use strict";

const gulp = require('gulp');
const clean = require('gulp-clean')

module.exports = function(options) {
   return function () {
      try {
         return gulp.src(options.src, { read: false })
            .pipe(clean())
      } catch (e) { }
   }
}
