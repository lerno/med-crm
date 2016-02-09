var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    autoprefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    batch = require('gulp-batch'),
    browserSync = require('browser-sync'),
    templateCache = require('gulp-angular-templatecache'),
    inject = require('gulp-inject'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    atImport = require('postcss-import');

var config = {
    sassPath: './sass',
    htmlPath: './app/**/*.html',
    bowerDir: './app/bower_components'
}

gulp.task('sass', function() {
  return gulp
    .src([config.sassPath + '/base.scss'])
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
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});


gulp.task('js', function() {
  return gulp.src([
      config.bowerDir + '/angular/angular.js',
      config.bowerDir + '/angular-cookies/angular-cookies.js',
      config.bowerDir + '/angular-ui-utils/ui-utils.js',
      config.bowerDir + '/angular-ui-router/release/angular-ui-router.js',
      config.bowerDir + '/angular-resource/angular-resource.js',
      config.bowerDir + '/checklist-model/checklist-model.js',
      config.bowerDir + '/angular-xeditable/dist/js/xeditable.js',
      config.bowerDir + '/ng-file-upload-shim/ng-file-upload-shim.js',
      config.bowerDir + '/ng-file-upload/ng-file-upload.js',
      './app/components/**/*.js',
      '!./app/components/**/*_test.js',
      './app/shared/**/*.js',
      '!./app/shared/**/*_test.js',
      '!./app/config.json',
      './app/app.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./app/'))
    .pipe(browserSync.stream());
})
 
gulp.task('html', function () {
  gulp.src(config.htmlPath)
    .pipe(browserSync.reload);
});

gulp.task('watch', function () {
  var jsWatcher = gulp.watch([
    './app/components/**/*.js',
    '!./app/components/**/*_test.js',
    './app/shared/**/*.js',
    '!./app/shared/**/*_test.js',
    './app/app.js'
  ], ['js']);
/*
  jsWatcher.on('change', function (event) {
    console.log('Event type: ' + event.type); // added, changed, or deleted
    console.log('Event path: ' + event.path); // The path of the modified file
  });
*/
  var sassWatcher = gulp.watch([
    config.sassPath + '/base.scss'
  ], ['sass']);
/*
  sassWatcher.on('change', function (event) {
    console.log('Event type: ' + event.type); // added, changed, or deleted
    console.log('Event path: ' + event.path); // The path of the modified file
  });
*/
  gulp.watch(config.htmlPath).on('change', function (event) {
    console.log('Event type: ' + event.type); // added, changed, or deleted
    console.log('Event path: ' + event.path); // The path of the modified file
    browserSync.reload();
  });
});

gulp.task('connect', function() {
  var target = gulp.src('./app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src([
    './app/css/base.css',
    './app/config.js',
    './app/all.js'
    ], {read: false});

  target.pipe(inject(sources, {
    ignorePath: 'app'
  }))
    .pipe(gulp.dest('./app'));

  browserSync.init({
    server: {
      baseDir: "./app",
      port: 8080
    }
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

gulp.task('deploy', function () {
  return Promise.all([
    new Promise(function(resolve, reject) {
      // Move necessary files do /dist
      gulp.src([
        '!./app/index.html',
        './app/**/*.html'
        ])
        .on('error', reject)
        .pipe(templateCache({
          standalone: true,
          root: '/'
        }))
        .pipe(gulp.dest('dist'))
        .on('end', resolve);
    }),
    new Promise(function(resolve, reject) {
      gulp.src('./app/css/base.css')
        .on('error', reject)
        .pipe(gulp.dest('./dist/css'))
        .on('end', resolve);
    }),
    new Promise(function(resolve, reject) {
      gulp.src('./app/config.js')
        .on('error', reject)
        .pipe(gulp.dest('./dist'))
        .on('end', resolve);
    }),
    new Promise(function(resolve, reject) {
      gulp.src('./app/all.js')
        .on('error', reject)
        .pipe(gulp.dest('./dist'))
        .on('end', resolve);
    }),
  ]).then(function () {
    // Inject the files
    var target = gulp.src('./app/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = gulp.src([
      './dist/css/base.css',
      './dist/config.js',
      './dist/all.js',
      './dist/templates.js'
      ], {read: false});

    target
      .pipe(inject(sources, {
        ignorePath: 'dist'
      }))
      .pipe(gulp.dest('./dist'));
  });

});

gulp.task('run-dist', ['deploy', 'connect-dist']);
gulp.task('build', ['js', 'sass']);
gulp.task('default', ['connect', 'watch']);
