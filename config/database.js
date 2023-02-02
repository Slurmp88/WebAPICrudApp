const { mongo } = require("mongoose");

if(process.env.NODE_ENV === "production")
{
    module.exports = {mongoURI:"mongodb+srv://Slurmp8:admin@cluster0.hipvxid.mongodb.net/?retryWrites=true&w=majority"}
}
else
{
    module.exports = {mongoURI:"mongodb://127.0.0.1:27017/gameEntries"}
}