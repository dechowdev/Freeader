var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean')
    //concat = require('gulp-concat'),
    //imagemin = require('gulp-imagemin'),
    //uglify = require('gulp-uglify');
    notify = require('gulp-notify'),
    csslint = require('gulp-csslint')
    cache = require('gulp-cache');


gulp.task('styles', function(){
    return gulp.src('assets/scss/**.scss')
    .pipe(sass({ style: 'expanded', compass: true}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('clean', function() {
  return gulp.src(['dist/**'], {read: false}) //return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
    .pipe(clean());
});

gulp.task('default',['clean'], function() {
    // place code for your default task here
    
    //SASS COMPILATION
    //JS COMPILATION
    //IMAGE MINIFICATION
    //ICON GENERATION
    gulp.start('styles');
    //return gulp.src('assets/js/**.js')
  
});

gulp.task('watch', function(){
    gulp.watch('assets/scss/**/*.scss', ['styles']);
});