"use strict";

var gulp         = require("gulp");
var sass         = require("gulp-sass");
var sourcemaps   = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var plumber      = require('gulp-plumber');

var target = {
  stylesheet_src  : "./assets/stylesheets/**/*.scss",
  stylesheet_dist : "./stylesheets/",

  images_src      : "./assets/images/*",
  images_dist     : "./images/",
}

gulp.task("stylesheets", function () {
  gulp.src(target.stylesheet_src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(target.stylesheet_dist))
});

gulp.task("images", function () {
  return gulp.src(target.images_src)
    .pipe(plumber())
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(target.images_dist));
});

gulp.task("watch", function() {
  gulp.watch(target.stylesheet_src, ["stylesheets"]);
});

gulp.task("default", ["stylesheets", "watch"]);