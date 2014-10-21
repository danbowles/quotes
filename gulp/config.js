var src  = './src';
var dest = './dist';

module.exports = {
  browserify: {
    // Enable source maps
    debug: true,
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/scripts/app.js',
      dest: dest + '/assets/js',
      outputName: 'app.js'
    }]
  },
  browserSync: {
    server: {
      // We're serving the src folder as well
      // for sass sourcemap linking
      baseDir: [dest, src]
    },
    files: [
      dest + "/**",
      // Exclude Map files
      "!" + dest + "/**.map"
    ]
  },
  jade: {
    src: src + '/templates/*.jade',
    dest: dest
  },
  sass: {
    src: src + '/styles/*.scss',
    dest: dest + '/assets/css'
  }
};