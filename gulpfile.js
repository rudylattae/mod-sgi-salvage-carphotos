var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    bookmarklet = require('./gulp-bookmarklet');

var jsSrcFiles = 'src/**/*.js';
var jsBuiltFiles = 'build/**/*.js';

gulp.task('scripts', function() {
    // Minify and copy all JavaScript
    gulp.src( jsSrcFiles )
        .pipe( uglify() )
        .pipe( gulp.dest('build/') );
});

gulp.task('bookmarklet', function() {
    // Convert to bookmarklet
    gulp.src( jsBuiltFiles )
        .pipe( concat('bookmarklet.js') )
        .pipe( bookmarklet() )
        .pipe( gulp.dest('dist/') );
});

gulp.task('devcycle', function() {
    gulp.run('scripts');

    gulp.watch( jsSrcFiles , function() {
        gulp.run('scripts');
    });
});

gulp.task('default', function(){
    gulp.run('scripts');
});
