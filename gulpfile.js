var gulp = require('gulp');
var typescript = require('gulp-typescript');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var slim = require('gulp-slim');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var merge = require('event-stream').merge;
var plumber = require('gulp-plumber');

var tsProject = typescript.createProject({
  target: 'ES5',
  removeComments: true,
  sortOutput: true
});

gulp.task('clean', function(cb) {
  rimraf('dist', cb);
});

gulp.task('typescript', function() {
  return gulp.src(['src/ts/*.ts'])
                            .pipe(plumber())
                            .pipe(typescript(tsProject))
                            .js
                            .pipe(concat("app.js"))
                            .pipe(gulp.dest('dist/js/'));
});

gulp.task('compass', function() {
  return gulp.src('src/scss/*.scss')
                         .pipe(plumber())
                         .pipe(compass({
                          config_file: './config.rb',
                          comments: false,
                          css: 'dist/css/',
                          sass: 'src/scss/',
                          image: 'dist/imgs/'
                         }))
                         .pipe(gulp.dest('dist/css/'));
});

gulp.task('slim', function() {
  return gulp.src('src/slim/*.slim')
                         .pipe(plumber())
                         .pipe(slim({
                          pretty: true
                         }))
                         .pipe(gulp.dest('dist/'));
});

gulp.task('compress', function() {
  return gulp.src('dist/js/app.js')
                         .pipe(uglify())
                         .pipe(concat("app.min.js"))
                         .pipe(gulp.dest('dist/js/'));
});

gulp.task('copy', function() {
  return merge(
    gulp.src([
      './bower_components/underscore/underscore-min.js',
      './bower_components/jquery/dist/jquery.min.js',
      './bower_components/fastclick/lib/fastclick.js',
      './vendor/js/*.js'
    ]).pipe(gulp.dest('dist/js/')),

    gulp.src([
      './vendor/css/*.css'
    ]).pipe(gulp.dest('dist/css/'))
  );
});

gulp.task('assets', function() {
  return gulp.src([
    'assets/imgs/*.png',
    'assets/imgs/*.jpg',
    'assets/imgs/*.svg'
  ]).pipe(gulp.dest('dist/imgs/'))
});

gulp.task('webserver', function() {
  return gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('watch', ['build'], function() {
  gulp.watch(['src/slim/*.slim', 'src/ts/*.ts', 'src/scss/*.scss', 'assets/*.*'], ['build', 'assets']);
});

gulp.task('build', function() {
  runSequence(
    'typescript',
    'compress',
    'slim',
    'compass'
  );
});

gulp.task('default', function() {
  runSequence(
    'clean',
    ['copy', 'assets'],
    'watch',
    'webserver'
  );
});
