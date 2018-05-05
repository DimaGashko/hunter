"use strict";

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const fs = require('fs');
/*
module.exports = function(options) {
   return function() {
      return gulp.src(options.src)
         .pipe($.htmlmin({
            collapseWhitespace: true}
         ))
         .pipe(gulp.dest(options.dst));
   }
}*/

module.exports = function(options) {
   return function() {
      return gulp.src(options.src)
         .pipe($.htmlmin({
            collapseWhitespace: true
         }))
         .pipe($.replace('<link rel="stylesheet" href="css/main.css">', function (str) {
            return `<style>${fs.readFileSync(this.file.dirname + '\\css\\main.css', 'utf8')}</style>`;
         }))
         .pipe($.replace('<script src="js/main.js"></script>', function(str) {
            return `<script>${fs.readFileSync(this.file.dirname + '\\js\\main.js', 'utf8')}</script>`;
         }))
         
         .pipe(gulp.dest(options.dst));
      }
   }

