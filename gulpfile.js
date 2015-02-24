'use strict';

var gulp = require('gulp');

/**
 * Plugins
 */

var error = function(err) { utils.log(utils.colors.green(err)); }
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var size = require('gulp-size');
var del = require('del');
var utils = require('gulp-util');
var spawn = require('child_process').spawn;
var glob = require('glob');
var runSequence = require('run-sequence');
var deploy = require("gulp-gh-pages");
var imagesminify = require('gulp-imagemin');
var htmlminify = require('gulp-minify-html');
var csscompile = require('gulp-sass');
var cssminify = require('gulp-csso');
var cssprefix = require('gulp-autoprefixer');
var cssunused = require('gulp-uncss');
var jslint = require('gulp-jshint');
var jsminify = require('gulp-uglify');

/**
 * Paths
 */

var paths = {
    src: './src',
    dist: './dist',
};

paths.bower = paths.src + '/_assets/bower_components';

paths.markup = {
    src: paths.dist,
    dest: paths.dist
};

paths.images = {
    src: paths.src + '/_assets/images',
    dest: paths.dist + '/assets/images'
};

paths.styles = {
    src: paths.src + '/_assets/styles',
    dest: paths.dist + '/assets/styles'
};

paths.scripts = {
    src: paths.src + '/_assets/scripts',
    dest: paths.dist + '/assets/scripts'
};

paths.fonts = {
    src: paths.src + '/_assets/fonts',
    dest: paths.dist + '/assets/fonts'
};

/**
 * Clean
 */

gulp.task('clean', del.bind(null, [paths.dist]));

/**
 * Jekyll
 */

gulp.task('jekyll', function(cb) {
    return spawn('jekyll', ['build'], { stdio: 'inherit' })
        .on('close', cb);
});

/**
 * Markup
 */

gulp.task('markup', function() {
    return gulp.src(paths.markup.src + '/**/*.html')
        .pipe(plumber({
            errorHandler: error
        }))
        .pipe(htmlminify({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.markup.dest));
});

/**
 * Images
 */

gulp.task('images', function() {
    return gulp.src(paths.images.src + '/*')
        .pipe(plumber({
            errorHandler: error
        }))
        .pipe(imagesminify({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(paths.images.dest));
});

/**
 * Styles
 */

gulp.task('styles', function() {
    return gulp.src(paths.styles.src + '/main.scss')
        .pipe(plumber({
            errorHandler: error
        }))
        .pipe(csscompile({
            style: 'expanded',
        }))
        // .pipe(cssunused({
        //     html: glob.sync(paths.markup.dest + '/**/*.html')
        // }))
        .pipe(cssprefix(
            'ie >= 10',
            'ie_mob >= 10',
            'ff >= 30',
            'chrome >= 34',
            'safari >= 7',
            'opera >= 23',
            'ios >= 7',
            'android >= 4.4',
            'bb >= 10'
        ))
        .pipe(cssminify())
        .pipe(gulp.dest(paths.styles.dest));
});

/**
 * Scripts
 */

gulp.task('scripts', function() {
    return gulp.src([
            paths.scripts.src + '/**/*.js',
        ])
        .pipe(plumber({
            errorHandler: error
        }))
        .pipe(jslint())
        .pipe(jslint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(jsminify())
        .pipe(gulp.dest(paths.scripts.dest));
});

/**
 * Fonts
 */

gulp.task('fonts', function() {
    return gulp.src([
            paths.fonts.src + '/*',
            paths.bower + '/fontawesome/fonts/*'
        ])
        .pipe(plumber({
            errorHandler: error
        }))
        .pipe(gulp.dest(paths.fonts.dest));
});

/**
 * Watch
 */

gulp.task('watch', function() {
    gulp.watch([paths.src + '/**/*.html', paths.src + '/**/*.md'], ['build']);
    gulp.watch(paths.styles.src + '/**/*.scss',                    ['styles']);
    gulp.watch(paths.scripts.src + '/**/*.js',                     ['scripts']);
    gulp.watch(paths.images.src + '/*',                            ['images']);
    gulp.watch(paths.fonts.src + '/*',                             ['fonts']);
});

/**
 * Build
 */

gulp.task('build', ['clean'], function(cb) {
    runSequence('jekyll', ['markup', 'images', 'styles', 'scripts', 'fonts'], cb);
});

/**
 * Default
 */

gulp.task('default', [
    'build',
    'watch'
]);

/**
 * Deploy
 */

gulp.task('deploy', ['build'], function() {
    return gulp.src(paths.dist + '/**/*')
        .pipe(deploy());
});
