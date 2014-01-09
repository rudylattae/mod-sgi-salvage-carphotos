var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    exec = require('exec'),
    bookmarklet = require('./gulp-bookmarklet');

var jsSrcFiles = 'src/**/*.js';
var jsBuiltFiles = 'build/**/*.js';

gulp.task('scripts', function() {
    // Minify and copy all JavaScript
    gulp.src( jsSrcFiles )
        .pipe( uglify() )
        .pipe( gulp.dest('build/') )
});

gulp.task('sandbox', function() {
    // Concat and copy JavaScript to sandbox
    gulp.src( jsSrcFiles )
        .pipe( concat('carPhotos.js') )
        .pipe( gulp.dest('sandbox/public/js/') )
});

gulp.task('bookmarklet', function() {
    // Convert to bookmarklet
    gulp.src( jsBuiltFiles )
        .pipe( concat('bookmarklet.js') )
        .pipe( bookmarklet() )
        .pipe( gulp.dest('dist/') );
});

gulp.task('docs', function() {
    // Build docs
    exec(['harp', 'compile', 'docs', '_gh-pages'], function(err, out, code) {
        if (err) throw err;
        process.stdout.write( out );
    });
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
