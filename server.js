let express = require('express');

let app = express();
let port = process.env.PORT || 3000;

app.use( express.static( "public" ) );

app.get('/', function(req, res) {
    res.render('accueilP.ejs');
});

app.get('/Snake', function(req, res) {
    res.render('snakeP.ejs');
});

app.get('/Demineur', function(req, res) {
    res.render('demineurP.ejs');
});

app.get('/Memory', function(req, res) {
    res.render('memoryP.ejs');
});

app.listen(port);