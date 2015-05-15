// import libraries
var express = require('express'),
    ejs     = require('ejs'),
    bodyParser = require('body-parser');

// import routes
var routes = require('./controller/index');
var hs_route = require('./controller/hs');
var sport_route = require('./controller/sport');
var player_route = require('./controller/player');
var coach_route = require('./controller/coach');
// initialize express web application framework
// http://expressjs.com/
var app = express();

// allow json data to be parsed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//configure template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// example of a global variable that can be passed to a template
app.set('subtitle', 'Project 02');

//configure routes
app.use('/', routes);
app.use('/hs', hs_route);
app.use('/sport', sport_route);
app.use('/player', player_route);
app.use('/coach', coach_route);

// configure static directory for javascript, css, etc.
app.use(express.static('public'));

app.set('port', 3000);  //use your own port
app.listen(app.get('port'));
console.log("Express server listening on port", app.get('port'));