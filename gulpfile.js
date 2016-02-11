var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    autoprefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    templateCache = require('gulp-angular-templatecache'),
    inject = require('gulp-inject'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    atImport = require('postcss-import'),
    argv = require('yargs').argv, // for args parsing
    spawn = require('child_process').spawn,
    rev = require('gulp-rev'),
    collect = require('gulp-rev-collector'),
    del = require('del'),
    config = require('./gulpConfig.json'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    gulpif = require('gulp-if');

gulp.task('sass', function() {
  return gulp
    .src(config.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
        style: 'compressed',
        loadPath: config.sass.src
      })
      .on("error", notify.onError(function (error) {
        console.log(error);
        return "Error: " + error.message;
      })))
    .pipe(autoprefix('last 2 version'))
    .pipe(postcss([
      atImport()
      ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.sass.dest));
});

gulp.task('css', function() {
  return gulp.src(config.css.src)
    .pipe(gulp.dest(config.css.dest));
});

gulp.task('js', function() {
  for (var i=0;i<config.js.length;i++) {
    gulp.src(config.js[i].src)
      .pipe(gulpif(config.js[i].concat, concat('all.js')))
      .pipe(gulp.dest(config.js[i].dest));
  }
});

gulp.task('templates', function () {
  gulp.src(config.templates.src)
    .pipe(templateCache({
      root: config.templates.root
    }))
    .pipe(gulp.dest(config.templates.dest))
});

gulp.task('images', function () {
  gulp.src(config.images.src)
  .pipe(gulp.dest(config.images.dest))
});
 
gulp.task('inject-html', function () {
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(config.injectHtml.files, {read: false});

  gulp.src(config.injectHtml.src)
    .pipe(inject(sources, config.injectHtml.config))
    .pipe(gulp.dest(config.injectHtml.dest));
});

gulp.task('watch', function () {
  for (var i=0;i<config.watch.length;i++) {
    var currentScope = config.watch[i],
        _cb = function() {
          if (currentScope.reload == true) {
            browserSync.reload();
          } else if (currentScope.stream) {
            browserSync.stream({
              match: currentScope.stream
            })
          }
        }
    gulp.watch(config.watch[i].src, config.watch[i].tasks).on('change', _cb);
  }
});

gulp.task('connect', function() {
  browserSync.init({
    server: {
      baseDir: "./app",
      port: 8080
    },
    open: false
  });
});

gulp.task('connect-dist', function() {
  browserSync.init({
    server: {
      baseDir: "./dist",
      port: 8080
    }
  });
})

gulp.task('clean-dist', function() {
  del('./dist/*');
});

gulp.task('deploy:files', ['css', 'clean-dist'], function () {

  return Promise.all([
    new Promise(function(resolve, reject) {
      // Move necessary files do /dist
      gulp.src(config.deploy.files.templates.src)
        .on('error', reject)
        .pipe(templateCache(config.deploy.files.templates.config))
        .pipe(rev())
        .pipe(gulp.dest(config.deploy.files.templates.dest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.deploy.files.templates.dest))
        .on('end', resolve);
    }),
    new Promise(function(resolve, reject) {
      gulp.src(config.deploy.files.css.src)
        .on('error', reject)
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest(config.deploy.files.css.dest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.deploy.files.css.dest))
        .on('end', resolve);
    }),
    new Promise(function(resolve, reject) {
      gulp.src(config.deploy.files.configjs.src)
        .on('error', reject)
        .pipe(rev())
        .pipe(gulp.dest(config.deploy.files.configjs.dest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.deploy.files.configjs.dest))
        .on('end', resolve);
    }),
    new Promise(function(resolve, reject) {
      gulp.src(config.deploy.files.javascript.src)
        .on('error', reject)
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(config.deploy.files.javascript.dest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.deploy.files.javascript.dest))
        .on('end', resolve);
    }),
    new Promise(function(resolve, reject) {
      gulp.src(config.deploy.files.images.src)
        .on('error', reject)
        .pipe(rev())
        .pipe(gulp.dest(config.deploy.files.images.dest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.deploy.files.images.dest))
        .on('end', resolve);
    })
  ]).then(function () {
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = gulp.src(config.deploy.files.inject.files, {read: false});

    return gulp.src(config.deploy.files.inject.src)
      .pipe(inject(sources, config.deploy.files.inject.config))
      .pipe(gulp.dest(config.deploy.files.inject.dest));
  });

});

gulp.task('deploy:rev:collect', ['deploy:files'], function() {
  // Need to timeout to wait for inject to be finished 
  setTimeout(function() {
    gulp.src(config.collect.src)
    .pipe(collect())
    .pipe(gulp.dest(config.collect.dest));
  }, 500);
});

gulp.task('auto-reload', function() {
  var p;

  gulp.watch('gulpfile.js', spawnChildren);
  spawnChildren();

  function spawnChildren(e) {
    // kill previous spawned process
    if(p) { p.kill(); }

    // `spawn` a child `gulp` process linked to the parent `stdio`
    p = spawn('gulp', ['build', 'connect', 'watch'], {stdio: 'inherit'});
  }
});

gulp.task('deploy', ['css', 'deploy:files', 'deploy:rev:collect']);
gulp.task('run-dist', ['connect-dist']);
gulp.task('build', ['images', 'templates', 'js', 'sass', 'css', 'inject-html']);
gulp.task('default', ['auto-reload']);
