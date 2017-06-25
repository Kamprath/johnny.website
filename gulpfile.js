var browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    less = require('gulp-less');
    cleanCss = require('gulp-clean-css'),
    gulpNotify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),
    through = require('through2');

/**
 * Globs and directory paths
 */
var paths = {
    js: {
        entry: './src/js/app.js', 
        dest: './public/resources/js/',
        src: [
            './src/js/*.js', 
            './src/js/**/*.js'
        ]
    },
    less: {
        src: './src/less/**/*.less',
        dest: './public/resources/css/'
    }
};

/**
 * Display a notification indicating task completion
 *
 * Does not run on Linux due to the likelihood of being a non-GUI system which would cause errors.
 *
 * @param {string} taskName
 */
function notify(taskName) {
    if (process.platform === 'linux') {
        return through.obj();
    }

    return gulpNotify({
        title: 'gulp',
        message: taskName + ' task finished.',
        onLast: true
    });
}

/**
 * Lint unminified JS files using jshint
 */
gulp.task('lint', function() {
    return gulp.src(paths.js.src)
        .pipe(jshint({
            strict: false
        }))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'))
});

/**
 * Browserify, uglify, and produce source maps
 */
gulp.task('js', ['lint'], function() {
    // set up browserify instance on a task basis
    var b = browserify({
        entries: paths.js.entry,
        debug: true
    });

    return b.bundle()
        // prepare new file
        .pipe(
            source('app.js')
        ).pipe(buffer())

        // create sourcemaps
        .pipe(sourcemaps.init({
            loadMaps: true
        }))

        // uglify
        .pipe(uglify())
        .on('error', gutil.log)

        // write sourcemaps
        .pipe(
            sourcemaps.write('./')
        )

        // write output to file
        .pipe(
            gulp.dest(paths.js.dest)
        )

        // send notification
        .pipe(
            notify('JS')
        );
});

/**
 * Compile Less, produce source maps, and minify CSS
 */
gulp.task('css', function() {
    return gulp.src(paths.less.src)
        .pipe(
            less()
        )
        .pipe(
            autoprefixer()
        )
        .pipe(
            sourcemaps.init()
        )
        .pipe(
            cleanCss()
        )
        .pipe(
            sourcemaps.write('./')
        )
        .pipe(
            gulp.dest(paths.less.dest)
        )
        .pipe(
            notify('CSS')
        );
});

/**
 * Run tasks when files change
 */
gulp.task('watch', function() {
    gulp.watch(paths.less.src, ['css']);
    gulp.watch(paths.js.src, ['js']);
});

/**
 * Run build tasks by default
 */
gulp.task('default', ['js', 'css']);