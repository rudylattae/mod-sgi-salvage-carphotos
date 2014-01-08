var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    Task = require('shell-task'),
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

gulp.task('docs', function() {
    // Build and publish docs
    new Task('harp compile docs _gh-pages')
            .then('cd _gh-pages')
            .then('git add .')
            .then('git commit -m "Update docs"')
            .then('git push')
            .run(function success() {

            }, function error( err ) {
                throw err;
            });
    // exec(['harp', 'compile', 'docs', '_gh-pages'], function(err, out, code) {
    //     if (err) throw err;
    //     process.stdout.write( out );
    // });
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
