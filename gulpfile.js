var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    autoprefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    batch = require('gulp-batch'),
    browserSync = require('browser-sync');

var config = {
    sassPath: './sass',
    htmlPath: './app/**/*.html',
    bowerDir: './app/bower_components'
}

gulp.task('sass', function() {
  return gulp.src([config.sassPath + '/base.scss'])
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

  jsWatcher.on('change', function (event) {
    console.log('Event type: ' + event.type); // added, changed, or deleted
    console.log('Event path: ' + event.path); // The path of the modified file
  });

  var sassWatcher = gulp.watch([
    config.sassPath + '/base.scss'
  ], ['sass']);

  sassWatcher.on('change', function (event) {
    console.log('Event type: ' + event.type); // added, changed, or deleted
    console.log('Event path: ' + event.path); // The path of the modified file
  });

  gulp.watch(config.htmlPath).on('change', function (event) {
    console.log('Event type: ' + event.type); // added, changed, or deleted
    console.log('Event path: ' + event.path); // The path of the modified file
    browserSync.reload();
  });
});

gulp.task('connect', function() {
  browserSync.init({
    server: {
      baseDir: "./app",
      port: 8080
    }
  });
});

gulp.task('build', ['js', 'sass']);
gulp.task('default', ['connect', 'watch']);
