var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.port || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());


//db.connect. "db name"
//db. "collection name (games)".find() to see entries
mongoose.connect("mongodb://127.0.0.1:27017/gameEntries",{
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
    Game.find({}).then(function(game){
        //console.log({game});
        res.json({game});
    });
})

app.post("/deleteGame", function(req,res){
    console.log(`Game Deleted ${req.body.game._id}`);
    Game.findByIdAndDelete(req.body.game._id).exec();
    res.redirect('gameList.html');
})


app.use(express.static(__dirname+"/pages"));
app.listen(port, 
    function(){
        console.log(`Running on port ${port}`)
    }
)

