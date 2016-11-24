/*
* @Author: suzhihui
* @Date:   2016-09-01 16:31:20
* @Last Modified by:   老苏
* @Last Modified time: 2016-10-12 16:46:25
*/

'use strict';
// 载入外挂
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    gulpCopy = require('gulp-file-copy'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    jade = require('gulp-jade'),
    livereload = require('gulp-livereload');

// 样式
gulp.task('styles', function() {
  return gulp.src(['src/skin/css/*.scss','bower_components/normalize-css/*.css'])
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0'],
      cascade: true,
      remove: true
    }))
    //.pipe(gulp.dest('dist/skin/css'))
    .pipe(rename({ suffix: '.min' }))
    // .pipe(minifycss())
    .pipe(gulp.dest('dist/skin/css'))
    // .pipe(notify({ message: 'Styles task complete' }));
});

// 脚本
gulp.task('scripts', function() {
  return gulp.src(['bower_components/jquery-qrcode/dist/jquery-qrcode.js','bower_components/jquery/dist/jquery.js','src/skin/js/*.js','bower_components/html5shiv/dist/html5shiv.js','bower_components/jquery-validation/dist/jquery.validate.js'])
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    // .pipe(concat('main.js'))
    // .pipe(gulp.dest('dist/skin/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/skin/js'))
    // .pipe(notify({ message: 'Scripts task complete' }));
});


//移到第三方
gulp.task('plugs',function () {
  return gulp.src(['src/skin/plugs/*','src/skin/plugs/**/*'])
    .pipe(gulp.dest('dist/skin/plugs'))
    // .pipe(notify({ message: 'Copy task complete' }));
})

//移动data模拟数据文件夹
gulp.task('data',function () {
  return gulp.src('src/data/*')
    .pipe(gulp.dest('dist/data'))
})

// 图片
gulp.task('images', function() {
  return gulp.src(['src/skin/img/*','src/skin/img/**/*'])
    // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/skin/img'))
    // .pipe(notify({ message: 'Images task complete' }));
});

//字体
gulp.task('font',function () {
  return gulp.src(['src/skin/fonts/*'])
    .pipe(gulp.dest('dist/skin/fonts'))
})

gulp.task('jade',function () {
  return gulp.src('src/*.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('dist'))
});

// 清理
gulp.task('clean', function() {
  return gulp.src(['dist/skin/css', 'dist/skin/js', 'dist/skin/img','dist/skin/plugs','dist/*.html','dist/skin/fonts','dist/data'], {read: false})
    .pipe(clean());
});

// 预设任务
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images','plugs','jade','font','data');
});

gulp.task('serve',function () {
  browserSync.init({
    server:{
      baseDir:'dist/'
    }
  });
  gulp.watch('src/data/*',['data'])
  gulp.watch('src/skin/css/*.scss',['styles']);
  gulp.watch(['src/*.jade','src/Shade/*.jade'],['jade']);
  gulp.watch('src/skin/js/*.js',['scripts']);
  gulp.watch(['src/skin/img/*','src/skin/img/**/*'],['images']);
  gulp.watch("*").on('change',browserSync.reload);
});

// var reload=browserSync.reload;
// gulp.task('watch'['browserSync','jade','styles'],function () {
//   gulp.watch('src/*.jade',['jade']);
//   gulp.watch('src/skin/css/**/*.scss',['styles']);
//   gulp.watch('src/skin/js/**/*.js',['scripts']);
//   gulp.watch('src/skin/img/**/*',['images']);
//   gulp.watch(['dist/**']).on('change',reload);
// })


