var through = require('through'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError;


const PLUGIN_NAME = 'gulp-bookmarklet';

function makeBookmarklet( source ) {
    return 'javascript:' + encodeURIComponent( source );
}

function gulpBookmarklet() {

    var stream = through(function( file ) {
        if ( file.isNull() ) 
            return this.queue( file );

        if ( file.isStream() )
            return this.emit( 'error', new PluginError(PLUGIN_NAME, 'Streams not supported yet') );

        if ( file.isBuffer() ) {
            file.contents = new Buffer( makeBookmarklet( file.contents.toString() ));
            return this.queue( file );
        }
    });

    return stream;
}

module.exports = gulpBookmarklet;