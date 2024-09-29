const mongoose=require("mongoose")

async function connection(URL){
    return mongoose.connect(URL)
}

module.exports= connection