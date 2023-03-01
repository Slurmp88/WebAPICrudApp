var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Schema = new Schema(
    {
        ScreenName:{
            type:String,
            required:true
        },
        FirstName:{
            type:String,
            required:true
        },
        LastName:{
            type:String,
            required:true
        },
        Date:{
            type:String,
            required:true
        },
        Score:{
            type:Number,
            required:true
        }
    }
);
mongoose.model("unity", Schema);