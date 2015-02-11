var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    autoprefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch');

var config = {
    sassPath: './sass',
    bowerDir: './app/bower_components'
}

gulp.task('sass', function() {
    return gulp.src(config.sassPath + '/base.scss')
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
        .pipe(gulp.dest('./app/css'));
});

gulp.task('js', function() {
  return gulp.src([
      config.bowerDir + '/angular/angular.js',
      config.bowerDir + '/angular-ui-router/release/angular-ui-router.js',
      config.bowerDir + '/angular-resource/angular-resource.js',
      config.bowerDir + '/ng-table/dist/ng-table.js',
      './app/components/**/*.js',
      '!./app/components/**/*_test.js',
      './app/shared/**/*.js',
      '!./app/shared/**/*_test.js',
      './app/app.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./app/'))
})

gulp.task('watch', function () {
    var watcher = gulp.watch([
      './app/components/**/*.js',
      '!./app/components/**/*_test.js',
      './app/shared/**/*.js',
      '!./app/shared/**/*_test.js',
      './app/app.js'
    ], ['js']);

watcher.on('change', function (event) {
   console.log('Event type: ' + event.type); // added, changed, or deleted
   console.log('Event path: ' + event.path); // The path of the modified file
});
    watch([
      './sass/base.scss'
    ], batch(function () {
        gulp.start('js');
    }));
});