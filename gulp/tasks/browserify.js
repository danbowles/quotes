var browserify = require('browserify');
var watchify = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var gulp = require('gulp');
var handleErrors = require('../util/handleErrors');
var source = require('vinyl-source-stream');
var config = require('../config').browserify;

gulp.task('browserify', function(callback) {
  var bundleQueue = config.bundleConfigs.length;

  var browserifyThis = function(bundleConfig) {
    var bundler = browserify({
      // Required watchify args
      cache: {}, packageCache: {}, fullPath: true,
      // Specifiy the entry point of your app
      entries: bundleConfig.entries,
      //Add file extensions to make optoinal in your requires
      extensions: config.extensions,
      // Enable source maps
      debug: config.debug
    });

    var bundle = function() {
      bundleLogger.start(bundleConfig.outputName);

      return bundler
        .bundle()
        // Report Errors
        .on('error', handleErrors)
        // Make stream gulp-compatible
        .pipe(source(bundleConfig.outputName))
        .pipe(gulp.dest(bundleConfig.dest))
        .on('end', reportFinished);
    };

    if (global.isWatching) {
      bundler = watchify(bundler);

      bundler.on('update', bundle);
    }

    var reportFinished = function() {
      bundleLogger.end(bundleConfig.outputName)

      if (bundleQueue) {
        bundleQueue--;
        if (bundleQueue === 0) {
          // If queue is empty, let gulp know
          callback();
        }
      }
    };

    return bundle();
  };

  // Start bundling
  config.bundleConfigs.forEach(browserifyThis);
});