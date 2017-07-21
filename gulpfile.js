var gulp = require('gulp');
var connect = require('gulp-connect');
var templateCache = require('gulp-angular-templatecache');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var angularFilesort = require('gulp-angular-filesort');
var concatCss = require('gulp-concat-css');

var config = {
    templates: './src/**/*.html',
    styles: './src/**/*.css',
    scripts: './src/**/*.js',
    templatesRoot: '/src/',
    tmpDest: './.tmp',
    dist: './.dist',
    scriptName: 'abctable.js',
    stylesName: 'abctable.css'
};

gulp.task('default', function (cb) {
    runSequence('templates-compile', 'server', ['watch:assets'], cb)
});

gulp.task('server', function () {
    connect.server({
        livereload: true
    });
});

gulp.task('templates-compile', function () {
    return gulp.src(config.templates)
        .pipe(templateCache({ standalone: true, moduleSystem: 'IIFE', root: config.templatesRoot }))
        .pipe(gulp.dest(config.tmpDest));
});

gulp.task('reload-scripts', function () {
    gulp.src(config.scripts)
        .pipe(connect.reload());
});

gulp.task('reload-styles', function () {
    gulp.src(config.styles)
        .pipe(connect.reload());
});

gulp.task('reload-templates', function () {
    gulp.src(config.tmpDest)
        .pipe(connect.reload());
});

gulp.task('watch:assets', function () {
    gulp.watch(config.templates, ['templates-compile', 'reload-templates']);
    gulp.watch(config.scripts, ['reload-scripts']);
    gulp.watch(config.styles, ['reload-styles']);
});

gulp.task('build', function (cb) {
    runSequence('templates-compile', ['build-scripts', 'build-styles'], cb)
});

gulp.task('build-scripts', function () {
    gulp.src([config.scripts, config.tmpDest + '/*.js'])
        .pipe(angularFilesort())
        .pipe(concat(config.scriptName))
        .pipe(gulp.dest(config.dist));
});

gulp.task('build-styles', function () {
    gulp.src(config.styles)
        .pipe(concatCss(config.stylesName))
        .pipe(gulp.dest(config.dist));
});