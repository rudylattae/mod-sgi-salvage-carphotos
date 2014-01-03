var express = require('express'),
    harp = require('harp'),
    path = require('path'),
    util = require('util'),
    url = require('url'),
    fs = require('fs');


var app = express();


var publicDir = path.join( __dirname, 'public' ),
    compDetailsDir = path.join( publicDir, 'lcgi', 'salvage_bid_site' );


app.use(express.logger());
app.use(express.static( publicDir ));
app.use(harp.mount( publicDir ));

app.get('/lcgi/salvage_bid_site/comp_details.cgi', function( req, res ) {
    var stockNumber = req.query.stock_num,
        store = req.query.store.replace(' ', '_'),
        filePathTemplate = path.join( compDetailsDir, "comp_details.cgi--stock_num%sstore%s.html"),
        filePath = util.format(filePathTemplate, stockNumber, store);

    fs.exists(filePath, function( yes ) {
        if ( yes )
            res.sendfile( filePath );
        else
            res.status(404).send('Not found');
    });
});

app.listen( 3000 );