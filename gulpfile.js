const gulp = require('gulp'),
    clean = require('gulp-clean');
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass');

gulp.task('clean', function () {
    return gulp.src("src/css")
        .pipe(clean());
});

// Compile Sass
gulp.task('sass', ['clean'],() => {
    return gulp.src(["src/sass/*.scss"])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Watch & Serve
gulp.task('serve', ['sass'], () => {
    browserSync.init({
        server: './src'
    });

    gulp.watch(["src/sass/*.scss"], ['sass']);
    gulp.watch(['./src/**/*.html']).on('change', browserSync.reload);
});

// Default
gulp.task('default', ['serve']);
