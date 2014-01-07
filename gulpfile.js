var gulp = require('gulp'),
    uglify = require('gulp-uglify');

var jsSrcFiles = 'src/**/*.js';

gulp.task('scripts', function() {
    // Minify and copy all JavaScript
    gulp.src( jsSrcFiles )
        .pipe( uglify() )
        .pipe( gulp.dest('build/') );
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
