var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    autoprefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    batch = require('gulp-batch'),
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
    gulpConfig = require('./gulpconfig.json');

var bowerDir = './app/bower_components',
    config = {
        sassPath: './assets/sass',
        htmlPath: './assets/html/*/*.html',
        bowerDir: bowerDir,
        jsSources: [
          bowerDir + '/angular/angular.js',
          bowerDir + '/angular-cookies/angular-cookies.js',
          bowerDir + '/angular-ui-utils/ui-utils.js',
          bowerDir + '/angular-ui-router/release/angular-ui-router.js',
          bowerDir + '/angular-resource/angular-resource.js',
          bowerDir + '/checklist-model/checklist-model.js',
          bowerDir + '/angular-xeditable/dist/js/xeditable.js',
          bowerDir + '/ng-file-upload-shim/ng-file-upload-shim.js',
          bowerDir + '/ng-file-upload/ng-file-upload.js',
          bowerDir + '/angular-permission/dist/angular-permission.js',
          bowerDir + '/sweetalert/dist/sweetalert.min.js',
          bowerDir + '/angular-sweetalert/dist/ngSweetAlert.js',
          './assets/javascript/**/*.js',
          '!./assets/javascript/**/*_test.js',
        ]
    }

gulp.task('sass', function() {
  return gulp
    .src(config.sassPath + '/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        style: 'compressed',
        loadPath: [
          './sass',
          config.bowerDir + '/bootstrap-sass/assets/stylesheets',
        ]
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
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('css', function() {
  return gulp.src([
    './assets/css/**/*.css'
    ])
    .pipe(gulp.dest('./app/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  gulp.src('./assets/config.js')
    .pipe(gulp.dest('./app/assets'));

  return gulp.src(config.jsSources)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./app/assets/javascript'));
})

gulp.task('templates', function () {
  gulp.src([
    './assets/javascript/**/*.html'
    ])
    .pipe(templateCache({
      root: '/'
    }))
    .pipe(gulp.dest('app'))
});

gulp.task('images', function () {
  gulp.src([
    './assets/images/**/*.jpg',
    './assets/images/**/*.jpeg',
    './assets/images/**/*.png',
    ])
  .pipe(gulp.dest('./app/assets/images'))
});
 
gulp.task('inject-html', function () {

  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src([
    './app/assets/css/base.css',
    './app/assets/config.js',
    './app/assets/javascript/all.js',
    './app/templates.js',
    ], {read: false});

  gulp.src('./assets/html/index.html')
    .pipe(inject(sources, {
      ignorePath: 'app'
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('watch', function () {
  gulp.watch('./assets/html/index.html', ['inject-html']).on('change', browserSync.reload);
  gulp.watch([
      './assets/javascript/**/*.js',
      '!./assets/javascript/**/*_test.js',
    ], ['js']).on('change', browserSync.reload);
  gulp.watch([config.sassPath + '/*.scss'], ['sass']);
  gulp.watch('./assets/css/**/*.css', ['css']);
  gulp.watch('./assets/javascript/**/*.html', ['templates']).on('change', browserSync.reload);
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

gulp.task('deploy:files', ['css'], function () {

  return Promise.all([
    new Promise(function(resolve, reject) {
      del('./dist/*');
      resolve();
    }),
    new Promise(function(resolve, reject) {
      // Move necessary files do /dist
      gulp.src(gulpConfig.deploy.files.templates.src)
        .on('error', reject)
        .pipe(templateCache(gulpConfig.deploy.files.templates.config))
        .pipe(rev())
        .pipe(gulp.dest(gulpConfig.deploy.files.templates.dest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(gulpConfig.deploy.files.templates.dest))
        .on('end', resolve);
    }),
    new Promise(function(resolve, reject) {
      gulp.src(gulpConfig.deploy.files.css.src)
        .on('error', reject)
        .pipe(rev())
        .pipe(gulp.dest(gulpConfig.deploy.files.css.dest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(gulpConfig.deploy.files.css.dest))
        .on('end', resolve);
    }),
    new Promise(function(resolve, reject) {
      gulp.src(gulpConfig.deploy.files.configjs.src)
        .on('error', reject)
        .pipe(rev())
        .pipe(gulp.dest(gulpConfig.deploy.files.configjs.dest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(gulpConfig.deploy.files.configjs.dest))
        .on('end', resolve);
    }),
    new Promise(function(resolve, reject) {
      gulp.src(gulpConfig.deploy.files.javascript.src)
        .on('error', reject)
        .pipe(concat('all.js'))
        .pipe(rev())
        .pipe(gulp.dest(gulpConfig.deploy.files.javascript.dest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(gulpConfig.deploy.files.javascript.dest))
        .on('end', resolve);
    }),
    new Promise(function(resolve, reject) {
      gulp.src(gulpConfig.deploy.files.images.src)
        .on('error', reject)
        .pipe(rev())
        .pipe(gulp.dest(gulpConfig.deploy.files.images.dest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(gulpConfig.deploy.files.images.dest))
        .on('end', resolve);
    })
  ]).then(function () {
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = gulp.src(gulpConfig.deploy.files.inject.files, {read: false});

    return gulp.src(gulpConfig.deploy.files.inject.src)
      .pipe(inject(sources, gulpConfig.deploy.files.inject.config))
      .pipe(gulp.dest(gulpConfig.deploy.files.inject.dest));
  });

});
/*
gulp.task('deploy:rev', function() {
  return gulp.src(gulpConfig.revision.src.assets, { base: gulpConfig.revision.src.base })
    .pipe(gulp.dest(gulpConfig.revision.dest.assets))
//    .pipe(rev())
//    .pipe(gulp.dest(gulpConfig.revision.dest.assets))
    .pipe(rev.manifest({ path: gulpConfig.revision.dest.manifest.name }))
    .pipe(gulp.dest(gulpConfig.revision.dest.manifest.path));
});
*/
gulp.task('deploy:rev:collect', ['deploy:files'], function() {
  // Need to timeout to wait for inject to be finished 
  setTimeout(function() {
    gulp.src(gulpConfig.collect.src)
    .pipe(collect())
    .pipe(gulp.dest(gulpConfig.collect.dest));
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
gulp.task('run-dist', ['deploy', 'connect-dist']);
gulp.task('build', ['images', 'templates', 'js', 'sass', 'css', 'inject-html']);
gulp.task('default', ['auto-reload']);
