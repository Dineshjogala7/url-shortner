const mongoose = require("mongoose")
function handleMongo(url){
    return mongoose.connect(url);
}

module.exports=handleMongo;