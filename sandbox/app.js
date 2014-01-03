var express = require('express'),
    harp = require('harp'),
    app = express();


app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(harp.mount( __dirname + '/public'));
});

app.listen( 3000 );