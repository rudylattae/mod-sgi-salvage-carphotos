var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    exec = require('exec'),
    bookmarklet = require('./gulp-bookmarklet');

var jsSrcFiles = 'src/**/*.js';
var jsBuiltFiles = 'build/**/*.js';

gulp.task('scripts', function() {
    // Minify and copy all JavaScript
    return gulp.src( jsSrcFiles )
        .pipe( uglify() )
        .pipe( gulp.dest('build/') )
});

gulp.task('bookmarklet', function() {
    // Convert to bookmarklet
    return gulp.src( jsBuiltFiles )
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

gulp.task('sandbox', function() {
    // Concat and copy JavaScript to sandbox
    return gulp.src( jsSrcFiles )
        .pipe( concat('carPhotos.js') )
        .pipe( gulp.dest('sandbox/public/js/') )
});

gulp.task('dev', function() {
    gulp.run('default');

    gulp.watch( jsSrcFiles , function() {
        gulp.run('default');
    });
});

gulp.task('default', function() {
    gulp.run('scripts');
    gulp.run('sandbox');
});

gulp.task('package', function(){
    gulp.run('scripts', function() {
        gulp.run('bookmarklet', function() {
            gulp.run('docs');
        });
    });
});
