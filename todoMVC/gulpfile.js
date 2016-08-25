/*global require*/
var gulp   = require('gulp');
var runSequence=require('run-sequence');
var $ = require('gulp-load-plugins')();


var vinylfs=require('vinyl-fs');

gulp.task('lint', function() {
  return gulp.src('./js/*.jsx')
    .pipe($.jshint({ linter: require('jshint-jsx').JSXHINT }))
    .pipe($.jshint.reporter('default'));
});


gulp.task('copy', function () {
  return vinylfs.src([
    'js/**'
  ])
  .pipe(vinylfs.dest('dist'))
  .pipe($.size({
    title: 'copy',
    gzip:true,
    pretty:false,
    showFiles:true
  }));
});

gulp.task('html', function() {

    return gulp.src('*.html')
      .pipe($.useref())
      .pipe($.if('*.js',$.uglify()))
      .pipe($.if('*.css',$.minifyCss()))
      .pipe(gulp.dest('dist'))
      .pipe($.size({
        title: 'size',
        showFiles:true
      }));
});

gulp.task('default', function(cb) {
    runSequence(['link','copy'],'html',cb);
});
