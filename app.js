var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.port || 3000;
var db = require("./config/database");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());


//db.connect. "db name"
//db. "collection name (games)".find() to see entries
mongoose.connect(db.mongoURI,{
    useNewUrlParser:true
}).then(function(){
    console.log("Connected to Mongo DB database");
}).catch(function(err){
    console.log(err);
});

require("./models/Game");
var Game = mongoose.model("game");

//example routes

app.get("/", function(req, res){
    res.redirect("gameList.html");
})

app.post("/saveGame", function(req, res)
{
    console.log(req.body);
                            //Promise statement
    new Game(req.body).save().then(
        function()
        {
            res.redirect("gameList.html");
            //res.send(req.body);
    });
})


app.get("/getGames", function(req,res){
    Game.find({}).sort({game: 1}).then(function(game){
        //console.log({game});
        res.json({game});
    });
})

var Query = "";
app.post("/searchGame", function(req,res){
    //console.log(req.body.Query);
    Query = req.body.Query;
    res.redirect("searchPage.html")
})

app.get("/searchGames", function(req,res){
    Game.find({game:Query}).then(function(game){
        //console.log({game});
        res.json({game});
    });
})


app.post("/deleteGame", function(req,res){
    console.log(`Game Deleted ${req.body.game._id}`);
    Game.findByIdAndDelete(req.body.game._id).exec();
    res.redirect('gameList.html');
})

//UPDATE
app.post("/updateGame", function(req, res){
    console.log(req.body);
    Game.findByIdAndUpdate(req.body.id, {game:req.body.game}, function(){
        res.redirect('gameList.html');
    });
})

//Irrelevent
app.get("/getID::id", function(req, res){
    //console.log(`Id Requested ${req.body.game._id}`);
    //res.redirect(`updatePage.html?id=${req.params.id} + "&name=` + req.params.body.game);
})



app.use(express.static(__dirname+"/pages"));
app.listen(port, 
    function(){
        console.log(`Running on port ${port}`)
    }
)

