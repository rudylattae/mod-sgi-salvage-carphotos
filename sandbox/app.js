var express = require('express'),
    app = express();


app.use(function(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});

app.use( express.static(__dirname + '/static') );

app.get('/hello', function(req, res) {
    res.send('Hello you!');
});

app.listen( 3000 );