var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-ruby-sass'),
    libsass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-csso'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    //imagemin = require('gulp-imagemin'),
    //cache = require('gulp-cache'),
    filter = require('gulp-filter'),
    // flatten = require('gulp-flatten'),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    jade = require('gulp-jade'),
    server = require('tiny-lr')(),
    path = require('path'),
    del = require('del');

// Helpers
function notifyLiveReload(event) {
  gutil.log('Notified!', event.path);
  var filename = require('path').relative(__dirname, event.path);

  server.changed({
    body: {
      files: [filename]
    }
  });
}

// Tasks
gulp.task('css', function() {
  var src   = 'src/styles/main.scss',
      dist  = 'dist/assets/css';

  return gulp.src(src)
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(dist))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(dist))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('libsass', function() {
  // todo
});

gulp.task('templates', function() {
  return gulp.src('src/templates/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
});

gulp.task('icons', function() {
    return gulp.src('bower_components/fontawesome/fonts/**.*')
      .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('js', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Clean
// Bower

gulp.task('bower', function() {
  var jsFilter = filter(['*', '!**/src/**/dist/*.js', '**/dist/*.js']);
  debugger;
  return bower()
    .pipe(jsFilter)
    .pipe(gulp.dest('dist/assets/js/lib'));
});

gulp.task('express', function() {
  var express = require('express');
  var app = express();

  app.use(require('connect-livereload')());
  app.use(express.static(path.resolve('./dist')));
  app.listen(3000);
});

gulp.task('default', ['js', 'css', 'templates', 'express', 'watch']);

gulp.task('watch', function () {
  gutil.log('Listening for changes.');
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err);
    }
  });

  gulp.watch('src/scripts/**/*.js', ['js']);
  gulp.watch('src/styles/**/*.scss', ['css']);  
  gulp.watch('src/templates/*.jade', ['templates']);

  gulp.watch('dist/assets/css/*.css', notifyLiveReload);
  gulp.watch('dist/assets/js/*.js', notifyLiveReload);
  gulp.watch('dist/*.*', notifyLiveReload);
});