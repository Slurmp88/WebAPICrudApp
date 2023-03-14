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

require("./models/Unity");
var Unity = mongoose.model("unity");

require("./models/Unity2");
var Unity2 = mongoose.model("unity2");

app.get("/", function(req, res){
    res.redirect("unityFile.html");
})
//example routes
//#region JavaScript

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
//#endregion

//#region UNITY
app.post("/addUnityEntry", function(req, res)
{
    console.log(req.body);
                            //Promise statement
    new Unity(req.body).save().then(
        function()
        {
            console.log("Success")
    });
})

app.post("/deleteUnityEntry", function(req,res){
    console.log(`Game Deleted ${req.body._id}`);
    Unity.findByIdAndDelete(req.body._id).exec();
    res.redirect('gameList.html');
})

app.get("/unityFetchEntries", function(req,res){
    Unity.find({}).sort({ScreenName: 1}).then(function(entry){
        console.log({entry});
        res.json({entry});
    });
})

app.post("/unityUpdateEntry", function(req, res){
    console.log(req.body);
    Unity.findByIdAndUpdate(req.body._id, {ScreenName:req.body.ScreenName, FirstName:req.body.FirstName, 
        LastName:req.body.LastName, Date:req.body.Date, Score:req.body.Score}, function(){
    });
})

var Query2 = "";
app.post("/unitySearchSet", function(req,res){
    console.log(req.body.Query);
    Query2 = req.body.Query;
    res.redirect("searchPage.html")
})

app.get("/unitySearchEntry", function(req,res){
    Unity.find({ScreenName:Query2}).then(function(entry){
        console.log({entry});
        res.json({entry});
    });
})
//#endregion

//Final
app.get("/unityFetchPlayers", function(req,res){
    Unity2.find({}).sort({HighScore: -1}).then(function(entry){
        console.log({entry});
        res.json({entry});
    });
})

app.post("/addUnityPlayer", function(req, res)
{
    console.log(req.body);
                            //Promise statement
    new Unity2(req.body).save().then(
        function()
        {
            console.log("Success")
    });
})

app.post("/updateUnityName", function(req, res){
    console.log(req.body);
    Unity2.findByIdAndUpdate(req.body.id, {ScreenName:req.body.ScreenName}, function(){
        res.redirect('unityFile.html');
    });
})

app.post("/deleteScore", function(req,res){
    console.log(`Game Deleted ${req.body.entry._id}`);
    Unity2.findByIdAndDelete(req.body.entry._id).exec();
    res.redirect('unityFile.html');
})

app.use(express.static(__dirname+"/pages"));
app.listen(port, 
    function(){
        console.log(`Running on port ${port}`)
    }
)



