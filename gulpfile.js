'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

//DEV
lrTask('css', './tasks/css', {
   src: 'app/sass/main.sass',
   dst: 'app/css',
});

lrTask('html', './tasks/html', {
   src: 'app/jade/index.jade',  
   dst: 'app/',
});

lrTask('connect', './tasks/connect', {
   servOpt: {
      root: 'app',
      livereload: true,
      port: 8002,
   }
});

lrTask('sprites', './tasks/sprites', {
   src: 'app/img/icons/*.*',
   dstImg: 'app/img/',
   dstSass: 'app/sass/',
   dstJS: 'app/js/',
});

lrTask('js', './tasks/js', {
   src: 'app/js/**/*.js',
   dst: 'app/js/',
});

lrTask('map', './tasks/js', {
   src: 'app/maps/**/*.json',
});

//BUILD
lrTask('build:useref', './tasks/build_useref', {
   src: 'app/index.html',
   dst: 'dist/',
});

lrTask('build:clean', './tasks/build_clean', {
   src: 'dist',
});

lrTask('build:img', './tasks/build_img', {
   src: ['app/**/*.{png,jpg,bmp,gif}'],
   dst: 'dist/',
});

lrTask('build:svgmin', './tasks/svgSprite', {
   src: 'dist/img/**/*.svg',
   dst: 'app/img/'
})

lrTask('build:html', './tasks/build_html', {
   src: 'dist/**/*.html',
   dst: 'dist/',
});

lrTask('build:connect', './tasks/build_connect', {
   servOpt: {
      root: 'dist/',
      livereload: false,
      port: 8888,
   }
});

gulp.task('build', gulp.series(
   'build:clean',
   gulp.parallel(gulp.series('build:useref', 'build:html'), 'build:img')
));

//WATCH
gulp.task('watch', () => {
   gulp.watch('app/sass/**/*.sass', gulp.parallel('css'));
   gulp.watch('app/jade/**/*.jade', gulp.parallel('html'));
   gulp.watch('app/js/**/*.js', gulp.parallel('js'));
   gulp.watch('app/maps/**/*.json', gulp.parallel('js'));

   gulp.watch('app/img/icons/*.*', gulp.parallel('sprites'));
});

//DEFAULT
gulp.task('default', gulp.series(
   gulp.parallel('css', 'html', 'js', 'sprites'),
   gulp.parallel('connect', 'watch'),
));

//SYSTEM
function lrTask(taskName, path, options) {
   options = options || {};
   options.taskName = taskName;
   
   gulp.task(taskName, function(callback) {
      let task = require(path).call(this, options);
      return task(callback);
   });
}