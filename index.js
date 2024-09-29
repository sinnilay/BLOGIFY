require('dotenv').config()
const express = require('express')
const path = require("path")
const connection= require("./connection")
const cookieParser = require('cookie-parser')
const checkSignin = require("./middleware/CheckSignin")
const UserRouter = require("./routes/user")
const BlogRouter = require("./routes/blog")

const blog=require("./models/blog")
const app = express()
const PORT = process.env.PORT || 8000


app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkSignin('token'))


connection(process.env.MONGO_URL)
.then(()=>console.log("DB CONNECTED"))
.catch((e)=> console.log("ERROR: ",e))


app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs')

app.set('views',path.resolve('./views'))

app.get("/",async (req,res)=>{
  
    try {
        const allblog=await blog.find({createdby:req.user.id})
        // console.log(allblog);
        res.render("home",{
            user:req.user,
            data:JSON.stringify(req.user),
            blogs:allblog
            
           
        })
    } catch (error) {
        // console.log(error);
        const all_blog = await blog.find().populate("createdby")
        console.log(all_blog);
        
        res.render("home",{
            all_blog
        })
        
    }
   
    
    
   
})



app.use('/user',UserRouter)
app.use('/blog',BlogRouter)
app.listen(PORT,()=>{
    console.log("SERVOR IS UP AT PORT NUMBER ",PORT);
})

