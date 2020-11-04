/// <binding Clean='clean' />
require('dotenv').config()

var fs = require('fs');
var GulpSSH = require('gulp-ssh')
var requireDir = require('require-dir');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var historyFallback = require('connect-history-api-fallback');

requireDir('./build.scripts');

global.config = {
  isLocal: true,
  sourceMapsEnabled: true,
  deployType: ""
};

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp-add-src', 'del', 'merge-stream', 'require-dir']
  });

var gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: {
    host: process.env.SFTP_HOST,
    port: process.env.SFTP_PORT,
    username: process.env.SFTP_USERNAME,
    privateKey: fs.readFileSync(process.env.SFTP_SSH_KEY_PATH)
  }
});

gulp.task('deploy', function () {
  return gulp.src(['dist/**', 'dist/assets/**'])
    .pipe(gulpSSH.dest(process.env.SFTP_DEST_PATH))
});

gulp.task('html-inject', function () {
  return gulp.src('./src/index.html').pipe(gulp.dest('./dist'));
});

gulp.task('_clean', function () {
  $.del.sync('./dist');
});

gulp.task('_compile:assets', ['other-assets', 'html-inject']);

gulp.task('_prompt:build', function () {
  return gulp.src('*').pipe(
    $.prompt.prompt({
      type: 'list',
      name: 'method',
      message: 'AngularJS Boilerplate v1 Task Runner',
      choices: ['Build & Serve Locally', 'Build & Deploy App']
    }, function (res) {
      switch (res.method) {
        case "Build & Serve Locally":
          global.config.isLocal = true;
          runSequence('_clean', ['app:compile', 'app:vendorboot', 'sass:compile', '_compile:assets'], function () {
            runSequence('watch', function () {
              gulp.start('serve');
            })
          });
          break;
        case "Build & Deploy App":
          global.config.isLocal = false;
          runSequence('_clean', ['app:compile', 'app:vendorboot', 'sass:compile', '_compile:assets'], function () {
            gulp.start('deploy');
          });
          break;
      }
    }));
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.js', 'src/**/*.html'], ['app:compile']).on('change', browserSync.reload);
  gulp.watch('src/**/*.scss', ['sass:compile']).on('change', browserSync.reload);
  gulp.watch('src/index.html', ['html-inject']);
});


gulp.task('serve', function () {
  browserSync.init({
    "server": {
      "baseDir": "./dist/",
      "directory": false,
    },
    "port": 8468,
    "ui": {
      "port": 8469
    },
    "middleware": [
      historyFallback()
    ]
  });
});

gulp.task('default', ['_prompt:build']);
