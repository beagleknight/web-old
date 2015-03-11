var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    jade         = require('gulp-jade'),
    connect      = require('gulp-connect'),
    stylus       = require('gulp-stylus'),
    jeet         = require('jeet'),
    JADE_FILES   = ['src/views/*.jade'],
    STYLUS_FILES = ['assets/styles/*.styl'],
    JS_FILES     = ['assets/scripts/*.js'],
    PUBLIC_FILES = ['public/**/*'];

gulp.task('views', function () {
    gulp.src(JADE_FILES)
        .pipe(plumber())
        .pipe(jade())
        .pipe(gulp.dest('public'))
});

gulp.task('styles', function () {
    gulp.src('assets/styles/index.styl')
        .pipe(plumber())
        .pipe(stylus({
            use: [jeet()]
        }))
        .pipe(gulp.dest('public/css'))
});

gulp.task('scripts', function () {
    gulp.src(JS_FILES)
        .pipe(plumber())
        .pipe(gulp.dest('public/js'))
});

gulp.task('watch', function () {
    gulp.watch(JADE_FILES   , ['views']);
    gulp.watch(STYLUS_FILES , ['styles']);
    gulp.watch(JS_FILES     , ['scripts']);
    gulp.watch(PUBLIC_FILES , ['reload']);
});

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        livereload: true
    });
});

gulp.task('reload', function () {
    gulp.src(PUBLIC_FILES)
        .pipe(connect.reload());
});

gulp.task('build', ['views', 'styles', 'scripts']);
gulp.task('default', ['build', 'watch', 'connect']);
