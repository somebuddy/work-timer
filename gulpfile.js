var gulp = require("gulp");
var del = require("del");

var browserSync = require('browser-sync').create();
var serveConfig = require('./configs/bs-config.js');

var karmaServer = require('karma').Server;

var excluded_files = [
  '!./node_modules/*',
  '!./.c9/*',
  '!./.git/*',
];

var templateFiles = ['./client/**/*.html'].concat(excluded_files);
var tsFiles = ['./client/**/*.ts'].concat(excluded_files);

var jsFiles = [
  './systemjs.config.js',
  './client/**/*.js'
].concat(excluded_files);

var sassFiles = ['./styles/**/*.sass', './styles/**/*.scss'].concat(excluded_files);
var cssFiles = ['./styles/**/*.css'].concat(excluded_files);

// Template preparing tasks
gulp.task('build:templates:clean', function() {
  return del(['./build/client/**/*.html']);
});

gulp.task('build:templates:copy', ['build:templates:clean'], function() {
  return gulp.src(templateFiles)
    .pipe(gulp.dest('./build/client'));
});

gulp.task('build:templates', ['build:templates:clean', 'build:templates:copy']);

// Preparing JavaScript files tasks
gulp.task('build:scripts:clean', function() {
  return del(['./build/client/**/*.js']);
});

gulp.task('build:ts', ['build:scripts:clean'], function() {
  var ts = require("gulp-typescript");
  var sourcemaps = require('gulp-sourcemaps');

  var tsProject = ts.createProject("tsconfig.json");

  return gulp.src(tsFiles)
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./build/client"));
});

gulp.task('build:js', ['build:scripts:clean'], function() {
  return gulp.src(jsFiles)
    .pipe(gulp.dest('./build/client'));
});

gulp.task('build:scripts', ['build:scripts:clean', 'build:ts', 'build:js']);

// Preparing styles

gulp.task('build:styles:clean', function() {
  return del(['./build/client/**/*.css']);
});

gulp.task('build:sass', ['build:styles:clean'], function() {
  var sass = require('gulp-sass');

  return gulp.src(sassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("./build/client/styles"));
});

gulp.task('build:css', ['build:styles:clean'], function() {
  gulp.src(cssFiles)
    .pipe(gulp.dest('./build/client/styles'));
});

gulp.task('build:styles', ['build:styles:clean', 'build:sass', 'build:css']);

// Test tasks
gulp.task('test:scripts', ['build:scripts'], function(done) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
  }, done).start();
});

// Watch tasks
gulp.task('watch:scripts', ['build:scripts', 'test:scripts'], browserSync.reload);
gulp.task('watch:templates', ['build:templates'], browserSync.reload);
gulp.task('watch:styles', ['build:styles'], browserSync.reload);

// Main tasks
gulp.task("serve", ['build:templates', 'build:scripts', 'build:styles', 'test:scripts'], function() {
  browserSync.init(serveConfig);
  gulp.watch(tsFiles, ['watch:scripts']);
  gulp.watch(jsFiles, ['watch:scripts']);
  gulp.watch(templateFiles, ['watch:templates']);
  gulp.watch(sassFiles, ['watch:styles']);
  gulp.watch(cssFiles, ['watch:styles']);
});

// Tests
gulp.task("test", ['build:templates', 'build:scripts', 'build:styles', 'test:scripts']);
gulp.task("coverage", ['test'], function() {
  var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');

  return gulp.src('build/coverage/coverage-final.json')
    .pipe(remapIstanbul({
      reports: {
          'json': './build/coverage/coverage.json',
          'html': './build/coverage/'
      }
    }));
});

gulp.task("default", ['serve']);
