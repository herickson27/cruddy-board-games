var express = require('express');
var methodOverride = require('method-override');
var app = express();
var db = require('./models')//adding in our own data, link the path to our models. 

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded());
app.use(methodOverride('_method'));

//data
app.get('/', function(req, res){
    res.render('index');
});
//Get All/index page//
app.get('/games', function(req, res){ //we need to get all the games through this route. We don't need to modify anything, just need to get all the records of games
    //try and get all records
    db.game.findAll().then(function(games){
        //find data within data object 
        console.log(games);
        res.render('games/index', {games}); //need to do inside the callback bc the data is retrieved and passed into GAMES only when its fully loaded. if res.render is kept outside that funtion, it will take too long and conintues reading adn res.renders whether or not the function has retrieved the data. 
    });
    //once data is found, send response to the page through res.render into the ejs page
});

//get one game / showpage//
app.get('/games/:id', function(req, res){
    db.game.findById(parseInt(req.params.id)).then(function(game){
        res.render('games/show', {game});
    })
})

//get new form /newpage //

//post create //
app.listen(3000);
