'use strict';

var gulp = require('gulp');

/********************************
 ** Plugins
 ********************************/

var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var del = require('del');
var utils = require('gulp-util');
var spawn = require('child_process').spawn;
var runSequence = require('run-sequence');
var imagesMinify = require('gulp-imagemin');
var htmlMinify = require('gulp-minify-html');
var cssCompile = require('gulp-sass');
var cssPrefix = require('gulp-autoprefixer');
var cssUnused = require('gulp-purifycss');
var cssMinify = require('gulp-csso');
var postcss = require('gulp-postcss');
var deploy = require('gulp-gh-pages');

/********************************
 ** Helpers
 ********************************/

var error = function error(err) {
    utils.log(utils.colors.green(err));
};

/********************************
 ** Paths
 ********************************/

var paths = {
    src: './src',
    dist: './dist',
    npm: './node_modules'
};

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

/********************************
 ** Task: clean
 ********************************/

gulp.task('clean', del.bind(null, [paths.dist]));

/********************************
 ** Task: jekyll
 ********************************/

gulp.task('jekyll', function(callback) {
    return spawn('jekyll', ['build'], { stdio: 'inherit' }).on('close', callback);
});

/********************************
 ** Task: markup
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
 ** Task: images
 ********************************/

gulp.task('images', function() {
    return gulp.src(paths.images.src + '/**/*')
        .pipe(plumber({
            errorHandler: error
        }))
        .pipe(imagesMinify({
            interlaced: true,
            progressive: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest(paths.images.dest));
});

/********************************
 ** Task: styles
 ********************************/

gulp.task('styles', function() {
    return gulp.src(paths.styles.src + '/main.scss')
        .pipe(plumber({
            errorHandler: error
        }))
        .pipe(cssCompile({
            style: 'expanded',
        }))
        .pipe(postcss([
            require('postcss-font-magician')({})
        ]))
        .pipe(cssUnused([
            paths.markup.dest + '/**/*.html'
        ]))
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
 ** Task: fonts
 ********************************/

gulp.task('fonts', function() {
    return gulp.src([
            paths.fonts.src + '/*',
            paths.npm + '/font-awesome/fonts/*'
        ])
        .pipe(plumber({
            errorHandler: error
        }))
        .pipe(gulp.dest(paths.fonts.dest));
});

/********************************
 ** Task: build
 ********************************/

gulp.task('build', ['clean'], function(callback) {
    runSequence('jekyll', ['markup', 'images', 'styles', 'fonts'], callback);
});

/********************************
 ** Task: watch
 ********************************/

gulp.task('watch', function() {
    gulp.watch([paths.src + '/**/*.html', paths.src + '/**/*.md'], ['build']);
    gulp.watch([paths.styles.src + '/**/*.scss'],                  ['styles']);
    gulp.watch([paths.images.src + '/*'],                          ['images']);
    gulp.watch([paths.fonts.src + '/*'],                           ['fonts']);
});

/********************************
 ** Task: deploy
 ********************************/

gulp.task('deploy', ['build'], function() {
    return gulp.src([
            paths.dist + '/**/*',
            './CNAME'
        ])
        .pipe(deploy());
});

/********************************
 ** Task: default
 ********************************/

gulp.task('default', [
    'build',
    'watch'
]);
