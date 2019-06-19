var gutil = require('gulp-util');
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-sass', 'gulp-src', 'gulp-autoprefixer', 'gulp-concat', 'gulp-sourcemaps', 'gulp-if', 'merge-stream', 'gulp-debug', 'gulp-foreach', 'del']
  }),

  sources = {
    sassPaths: {
      "main": 'src/assets/scss/main.scss',
    }
  }

gulp.task('sass:compile', function () {
  var sassMainCore = gulp.src(sources.sassPaths.main, { base: '' })
    .pipe($.if(global.config.isLocal && global.config.sourceMapsEnabled, $.sourcemaps.init()))
    .pipe($.if(global.config.isLocal, $.sass({ errLogToConsole: false, outputStyle: 'expanded' })))
    .pipe($.autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe($.if(!global.config.isLocal, $.sass({ errLogToConsole: false, outputStyle: 'compressed' })))
    .pipe($.if(global.config.isLocal && global.config.sourceMapsEnabled, $.sourcemaps.write('.')))
    .pipe(gulp.dest('./dist'));
  return $.mergeStream(sassMainCore);
});
