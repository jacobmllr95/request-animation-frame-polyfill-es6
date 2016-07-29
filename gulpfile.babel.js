'use strict';

import fs from 'fs';
import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const plugins = gulpLoadPlugins();
const pkg = JSON.parse(fs.readFileSync('./package.json'));

const GLOB_JS = '**/*.js';
const SCRIPT_NAME = 'request-animation-frame-polyfill-es6.js';
const PATHS = {
  src: './src/',
  dist: './dist/'
};

// Clean up `dist` directory
gulp.task('dist:clean', callback => {
  return del(`${PATHS.dist}*`, callback);
});

// Lint JavaScript files
gulp.task('dist:lint-js', ['dist:clean'], () => {
  return gulp.src(`${PATHS.src}${GLOB_JS}`)
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format());
});

// Compile ES6 JavaScript files to ES5
gulp.task('dist:js', ['dist:lint-js'], () => {
  return gulp.src(`${PATHS.src}${GLOB_JS}`)
      .pipe(plugins.babel())
      .pipe(plugins.concat(SCRIPT_NAME))
      .pipe(gulp.dest(PATHS.dist));
});

// Minify JavaScript files
gulp.task('dist:minify-js', ['dist:js'], () => {
  const BANNER = '/*! ' +
      `requestAnimationFrame Polyfill v${pkg.version} | ` +
      `${pkg.repository.url} | ` +
      `(c) 2016 ${pkg.maintainers[0].name} ` +
      '*/\n';

  return gulp.src(`${PATHS.dist}${GLOB_JS}`)
      .pipe(plugins.uglify())
      .pipe(plugins.header(BANNER))
      .pipe(plugins.rename({suffix: '.min'}))
      .pipe(gulp.dest(PATHS.dist));
});

// Watch source files to compile on change
gulp.task('watch', () => {
  return gulp.watch(`${PATHS.src}${GLOB_JS}`, ['dist']);
});

// Distribution task
gulp.task('dist', ['dist:clean', 'dist:lint-js', 'dist:js', 'dist:minify-js']);

// Default task (called when you run `gulp` from CLI)
gulp.task('default', ['dist']);
