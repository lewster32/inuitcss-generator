var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
      proxy: 'localhost/inuitcss/',
      notify: false
    });

    gulp.watch("./css/**/*.scss", ['sass']);
    gulp.watch("./*.htm").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./css/**/*.scss")
        // .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("./."))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);