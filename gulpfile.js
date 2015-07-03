'use strict';

var gulp = require('gulp');

/********************************
 ** HELPERS
 ********************************/

var error = function(err) { utils.log(utils.colors.green(err)); }

/********************************
 ** PLUGINS
 ********************************/

var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var del = require('del');
var utils = require('gulp-util');
var spawn = require('child_process').spawn;
var glob = require('glob');
var runSequence = require('run-sequence');
var deploy = require("gulp-gh-pages");
var imagesMinify = require('gulp-imagemin');
var htmlMinify = require('gulp-minify-html');
var cssCompile = require('gulp-sass');
var cssMinify = require('gulp-csso');
var cssPrefix = require('gulp-autoprefixer');
var cssUnused = require('gulp-uncss');
var jsLint = require('gulp-jshint');
var jsMinify = require('gulp-uglify');

/********************************
 ** PATHS
 ********************************/

var paths = {
    root: {
        src: './src',
        dist: './dist',
    }
};

paths.bower = paths.root.src + '/_assets/bower_components';

paths.markup = {
    src: paths.root.dist,
    dest: paths.root.dist
};

paths.images = {
    src: paths.root.src + '/_assets/images',
    dest: paths.root.dist + '/assets/images'
};

paths.styles = {
    src: paths.root.src + '/_assets/styles',
    dest: paths.root.dist + '/assets/styles'
};

paths.scripts = {
    src: paths.root.src + '/_assets/scripts',
    dest: paths.root.dist + '/assets/scripts'
};

paths.fonts = {
    src: paths.root.src + '/_assets/fonts',
    dest: paths.root.dist + '/assets/fonts'
};

/********************************
 ** TASK: CLEAN
 ********************************/

gulp.task('clean', del.bind(null, [paths.root.dist]));

/********************************
 ** TASK: JEKYLL
 ********************************/

gulp.task('jekyll', function(callback) {
    return spawn('jekyll', ['build'], { stdio: 'inherit' })
        .on('close', callback);
});

/********************************
 ** TASK: MARKUP
 ********************************/

gulp.task('markup', function() {
    return gulp.src(paths.markup.src + '/**/*.html')
        .pipe(plumber({
            errorHandler: error
        }))
        .pipe(htmlMinify({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.markup.dest));
});

/********************************
 ** TASK: IMAGES
 ********************************/

gulp.task('images', function() {
    return gulp.src(paths.images.src + '/*')
        .pipe(plumber({
            errorHandler: error
        }))
        .pipe(imagesMinify({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(paths.images.dest));
});

/********************************
 ** TASK: STYLES
 ********************************/

gulp.task('styles', function() {
    return gulp.src(paths.styles.src + '/main.scss')
        .pipe(plumber({
            errorHandler: error
        }))
        .pipe(cssCompile({
            style: 'expanded',
        }))
        .pipe(cssUnused({
            html: glob.sync(paths.markup.dest + '/**/*.html')
        }))
        .pipe(cssPrefix(
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
        .pipe(cssMinify())
        .pipe(gulp.dest(paths.styles.dest));
});

/********************************
 ** TASK: SCRIPTS
 ********************************/

gulp.task('scripts', function() {
    return gulp.src([
            paths.scripts.src + '/**/*.js',
        ])
        .pipe(plumber({
            errorHandler: error
        }))
        .pipe(jsLint())
        .pipe(jsLint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(jsMinify())
        .pipe(gulp.dest(paths.scripts.dest));
});

/********************************
 ** TASK: FONTS
 ********************************/

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

/********************************
 ** TASK: BUILD
 ********************************/

gulp.task('build', ['clean'], function(callback) {
    runSequence('jekyll', ['markup', 'images', 'styles', 'scripts', 'fonts'], callback);
});

/********************************
 ** TASK: WATCH
 ********************************/

gulp.task('watch', function() {
    gulp.watch([paths.root.src + '/**/*.html', paths.root.src + '/**/*.md'], ['build']);
    gulp.watch(paths.styles.src + '/**/*.scss',                    ['styles']);
    gulp.watch(paths.scripts.src + '/**/*.js',                     ['scripts']);
    gulp.watch(paths.images.src + '/*',                            ['images']);
    gulp.watch(paths.fonts.src + '/*',                             ['fonts']);
});

/********************************
 ** TASK: DEPLOY
 ********************************/

gulp.task('deploy', ['build'], function() {
    return gulp.src([
            paths.root.dist + '/**/*',
            './CNAME'
        ])
        .pipe(deploy());
});

/********************************
 ** TASK: DEFAULT
 ********************************/

gulp.task('default', [
    'build',
    'watch'
]);
