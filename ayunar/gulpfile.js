var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect');

function customPlumber(errTitle) {
    return plumber ({
        errorHandler: notify.onError({
            title: errTitle || "Error running gulp",
            message: "Error: <%= error.message %>"
        })
    });
}

var paths = {
  scripts: ['app/**/*.js', 'www/assets/js/**/*.js'],
  images:  ['assets/img/**/*'],
  sass: ['assets/css/app.scss', 'assets/css/scss/**/*.scss'],
  dist:['dist/']
};

/* --------------------- */

gulp.task('clean', function () {
 return gulp.src('dist', {read: false})
 .pipe(clean());
});

gulp.task('scripts', function() {
  // minify and uglify JS
  return gulp.src(paths.scripts)
    .pipe(customPlumber("Error Running JS"))
    .pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(gulp.dest(paths.dist + '/scripts'))
    .pipe(connect.reload());
});

gulp.task('jshint', function(){
    gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(connect.reload());
});

gulp.task('images', function() {
 return gulp.src(paths.images)
   .pipe(customPlumber("Error Running Sass"))
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(paths.dist + '/images'))
    .pipe(connect.reload());
});

gulp.task('stylesheet', function() {
  return gulp.src(paths.sass)
    .pipe(customPlumber("Error Running Sass"))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.dist + '/css'))
    .pipe(connect.reload());
});

gulp.task('watch', ['scripts', 'images', 'stylesheet'], function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.sass, ['stylesheet']);
});

gulp.task('serve', function() {
  connect.server({
    livereload: true,
    root:'templates'
  });
});

gulp.task('default', ['watch', 'serve']);
