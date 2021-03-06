var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', async function () {

  // Bootstrap
  gulp.src([
    './node_modules/bootstrap/dist/**/*',
    '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
    '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
  ])
    .pipe(gulp.dest('./dist/vendor/bootstrap'))

  // Font Awesome
  gulp.src([
    './node_modules/font-awesome/**/*',
    '!./node_modules/font-awesome/{less,less/*}',
    '!./node_modules/font-awesome/{scss,scss/*}',
    '!./node_modules/font-awesome/.*',
    '!./node_modules/font-awesome/*.{txt,json,md}'
  ])
    .pipe(gulp.dest('./dist/vendor/font-awesome'))

  // jQuery
  gulp.src([
    './node_modules/jquery/dist/*',
    '!./node_modules/jquery/dist/core.js'
  ])
    .pipe(gulp.dest('./dist/vendor/jquery'))

  // jQuery Easing
  gulp.src([
    './node_modules/jquery.easing/*.js'
  ])
    .pipe(gulp.dest('./dist/vendor/jquery-easing'))

  // Magnific Popup
   gulp.src([
     './node_modules/magnific-popup/dist/*'
   ])
     .pipe(gulp.dest('./dist/vendor/magnific-popup'))

  // Scrollreveal
  gulp.src([
    './node_modules/scrollreveal/dist/*.js'
  ])
    .pipe(gulp.dest('./dist/vendor/scrollreveal'))

});

const imagemin = require('gulp-imagemin');
// Compress images
gulp.task('images', async function () {
  return gulp.src('assets/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets'))
}
);

// Compile SCSS
gulp.task('css:compile', async function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
});

// Minify CSS
gulp.task('css:minify', gulp.series('css:compile'), async function () {
  return gulp.src([
    './css/*.css',
    '!./css/*.min.css'
  ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', gulp.series('css:compile', 'css:minify'));

// Minify JavaScript
gulp.task('js:minify', async function () {
  return gulp.src([
    './js/*.js',
    '!./js/*.min.js'
  ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

var htmlmin = require('gulp-htmlmin');

gulp.task('minify-html', async function () {
  return gulp.src('./index.html')
    .pipe(htmlmin())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));
});

// JS
gulp.task('js', gulp.series('js:minify'));

// Default task
gulp.task('default', gulp.series('css', 'js', 'vendor', 'images', 'minify-html'));

// Configure the browserSync task
gulp.task('browserSync', async function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Configure the browserSync task
gulp.task('browserSyncBuild', async function () {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
});

// Dev task
gulp.task('dev', gulp.series('default', 'browserSync'), async function () {
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./*.html', browserSync.reload);
});

// Dev task
gulp.task('build', gulp.series('default', 'browserSyncBuild'), async function () {
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./*.html', browserSync.reload);
});

