
var gutil = require('gulp-util');
var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-src', 'gulp-autoprefixer', 'gulp-plumber', 'gulp-notify', 'gulp-concat', 'merge-stream', 'gulp-uglify', 'gulp-minify', 'gulp-if', 'gulp-foreach', 'gulp-debug', 'del', 'gulp-sourcemaps', 'gulp-add-src', 'gulp-if', 'gulp-ng-annotate', 'gulp-angular-templatecache']
}),
  sources = {
    coreVendor: [
      "./node_modules/auth0-js/build/auth0.min.js",
      "./node_modules/angular/angular.min.js",
      "./node_modules/angular-ui-router/release/angular-ui-router.min.js",
      "./node_modules/oclazyload/dist/ocLazyLoad.min.js",
      "./node_modules/angular/dist/angular.min.js",
      "./node_modules/angular-auth0/dist/angular-auth0.min.js",
      "./node_modules/angular-animate/angular-animate.min.js",
      "./node_modules/angular-cookies/angular-cookies.min.js",
      "./node_modules/angular-popeye/release/popeye.min.js",
      "./node_modules/angular-loading-bar/build/loading-bar.min.js"
    ],

    //this vendor file is loaded when a user is authenticated and the app is loaded, the rest (core libraries i.e. angular js) are loaded via cdn js
    appVendor: [
      // "./node_modules/angular-vs-repeat/src/angular-vs-repeat.min.js"
    ],
    appLoad: [
      "src/app/auth0.variables.js",
      "src/app/index.module.js",
      "src/app/**/*.module.js",
      "src/app/index.*.js",
      "src/app/shared/services/auth/*.provider.js",
      "src/app/shared/services/auth/*.service.js",
      "src/app/modules/**/*.service.js", //need service modules to be injected in the resolve functions in some routes
      "!src/app/index.*.*.js"
    ],
    appCore: [
      "src/app/shared/*/shared.*.js",
      "src/app/shared/**/*.*.js",
      "src/app/modules/**/*.*.js",
      "!src/app/shared/services/auth/*.provider.js",
      "!src/app/shared/services/auth/*.service.js",
      "!src/app/**/*.module.js",
      "!src/app/modules/home/*.*.js",
      "!src/app/modules/**/*.service.js",
    ],
    loadTemplates: [
      "src/app/modules/home/**/*.html",
      "src/app/shared/**/*.html"
    ],
    appTemplates: [
      "!src/app/modules/home/**/*.html",
      "src/app/modules/**/*.html"
    ],
    moduleSets: []
  };

gulp.task('watch:core', function () {
  gulp.watch(sources.coreapp, ['app:core']);
});

gulp.task('app:vendorboot', function () {
  return gulp.src(sources.coreVendor)
    // .pipe($.uglify())
    .pipe($.concat('vendor_6c6f6164.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('app:load', function () {
  return gulp.src(sources.loadTemplates)
    .pipe($.plumber({
      errorHandler: function (err) {
        $.notify.onError({
          title: "App bootstrap Module Error " + err.plugin,
          message: err.toString()
        })(err);
      }
    }))
    .pipe($.angularTemplatecache({
      module: 'loadTpls',
      standalone: true,
      base: 'src/',
      transformUrl: function (url) {
        var u = url;
        var i = u.indexOf("app");
        return u.substring(i);
      },
    }))
    .pipe($.addSrc.append(sources.appLoad))
    .pipe($.if(global.config.isLocal, $.addSrc.append('./src/app/index.api.js')))
    .pipe($.if(!global.config.isLocal, $.addSrc.append('./src/app/index.api.production.js')))
    // .pipe($.if(global.config.isLocal && global.config.sourceMapsEnabled, $.sourcemaps.init()))
    .pipe($.ngAnnotate())
    // .pipe($.if(global.config.isLocal && global.config.sourceMapsEnabled, $.sourcemaps.write()))
    .pipe($.concat('app_6c6f6164.js'))
    // .pipe($.if(!global.config.isLocal, $.uglify()))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('app:core', function () {
  return gulp.src(sources.appTemplates)
    .pipe($.plumber({
      errorHandler: function (err) {
        $.notify.onError({
          title: "Gulp error in " + err.plugin,
          message: err.toString()
        })(err);
      }
    }))
    .pipe($.angularTemplatecache({
      module: 'appTpls',
      standalone: true,
      base: 'src/',
      transformUrl: function (url) {
        var u = url;
        var i = u.indexOf("app");
        return u.substring(i);
      },
    }))
    .pipe($.addSrc.append(sources.appVendor))
    .pipe($.addSrc.append(sources.appCore))
    //.pipe($.jshint())
    //.pipe($.debug())
    //.pipe($.jshint.reporter(require('jshint-stylish')))
    // .pipe($.if(global.config.isLocal && global.config.sourceMapsEnabled, $.sourcemaps.init()))
    //.pipe($.if(!global.config.isLocal, $.uglify()))
    // .pipe($.uglify())
    .pipe($.ngAnnotate())
    // .pipe($.if(global.config.isLocal && global.config.sourceMapsEnabled, $.sourcemaps.write()))
    // .pipe($.addSrc.append())
    //.pipe($.if(!global.config.isLocal, $.uglify()))
    .pipe($.concat('app_636f7265.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('app:compile', ['app:load', 'app:core']);
