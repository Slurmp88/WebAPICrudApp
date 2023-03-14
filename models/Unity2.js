var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Schema = new Schema(
    {
        ScreenName:{
            type:String,
            required:true
        },
        HighScore:{
            type:Number,
            required:true
        }
    }
);
mongoose.model("unity2", Schema);