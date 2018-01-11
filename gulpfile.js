const gulp = require("gulp"),
    gulpsync = require('gulp-sync')(gulp);
    clean = require("gulp-clean");
    browserSync = require("browser-sync").create(),
    sass = require("gulp-sass");
    imagemin = require('gulp-imagemin');
    autoprefixer = require("gulp-autoprefixer");

const paths = {
    src: "./src",
    build: "./build",

    srcSass: ["./src/sass/*.scss"],
    srcImg: ["./src/images/*"],
    srcHtml: "./src/index.html",

    buildCss: "./build/css",
    buildHtml: "./build/*.html",
    buildImg: "./build/images"

}

gulp.task("clean", () => {
    return gulp.src(paths.build)
        .pipe(clean());
});

// Compile Sass
gulp.task("sass",() => {
    return gulp.src(paths.srcSass)
        .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 3 versions", "> 1%", "IE 9", "IE 10", "IE 11", "Firefox ESR"],
            cascade: false
        }))
        .pipe(gulp.dest(paths.buildCss))
        .pipe(browserSync.stream());
});

// Imagemin images and ouput them in dist
gulp.task('imagemin', () => {
    gulp.src(paths.srcImg)
    .pipe(gulp.dest(paths.buildImg));
   });

// Copy index.html to dist directly
gulp.task('copyHtml', () => {
    // Copy html
    gulp.src(paths.srcHtml)
    .pipe(gulp.dest(paths.build))
});

// Watch & Serve
gulp.task("serve", ["sass", "copyHtml"], () => {
    browserSync.init({
        server: paths.build
    });

    gulp.watch(paths.srcSass, ["sass"]);
    gulp.watch(paths.srcHtml, ["copyHtml"]).on("change", browserSync.reload);
});

// Default
gulp.task("default", gulpsync.sync(["clean", "imagemin", "copyHtml", "serve"]));
