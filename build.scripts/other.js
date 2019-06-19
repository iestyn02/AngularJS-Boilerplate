var gutil = require('gulp-util');

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-add-src', 'del', 'merge-stream', 'gulp-src', 'gulp-angular-templatecache']
    })


gulp.task('other-assets', function () {

    var assets = gulp.src(['./src/assets/**/*.*', '!**/*.css', '!**/*.scss', '!./src/assets/js/custom.libs/modernizr/**.js', '!./src/assets/js/custom.libs/classie/**.js'], { base: '' })
        .pipe(gulp.dest('./dist/assets'));
    // var brandingcss = gulp.src(['./src/assets/branding/*/theme.css'], { base: '' }).pipe(gulp.dest('./dist/assets/branding'));
    var favicon = gulp.src('./src/favicon.ico')
        .pipe(gulp.dest('dist'));
    var flags = gulp.src('./bower_components/World-Flag-Sprites/flat/48/flags.png')
        .pipe(gulp.dest('dist'));
    return $.mergeStream(assets, favicon, flags);
});

gulp.task('html-inject', function () {
    return gulp.src('./src/index.aspx')
        .pipe(gulp.dest('./dist'));
});
