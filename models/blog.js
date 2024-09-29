const {Schema,model } = require("mongoose")

const Blog_Schema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    ImageUrl:{
        type:String,
        required:false
    },
    createdby:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

const Blog = model('Blog',Blog_Schema)

module.exports=Blog