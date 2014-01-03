var express = require('express'),
    harp = require('harp'),
    app = express();


// simple logger
app.use(express.logger());

app.use(express.static(__dirname + '/public'));
app.use(harp.mount( __dirname + '/public'));

app.get('/lcgi/salvage_bid_site/comp_details.cgi', function( req, res ) {
    console.log( req.query );
    res.send('Item details here.');
});

app.listen( 3000 );