const {Router} = require('express')
const User = require("../models/user")
const router = Router()

router.get('/signin',(req,res)=>{
    res.render('signin')
})

router.get('/signup',(req,res)=>{
    res.render('signup')
})

router.post ('/signup', async(req,res)=>{
    const {fullname,email,password} = req.body
    try {
        const user= await User.create({
            fullname,
            email,
            password
        })
        // console.log(user);
        res.render("signup",{
            msg:"ACOOUNT CREATED SUCESS"
        })
        // res.redirect('/')
    } catch (error) {
        res.render('signup',{
            msg:error
        })
    }
    
})

router.get('/signin',(req,res)=>{
    res.render('signin')
})
router.post('/signin',async (req,res)=>{
    const {email,password} = req.body
    try {
        const token = await User.matchpasswordandGenratetoken(email,password)
        // console.log(token);
        res.cookie('token',token).redirect("/")
    } catch (error) {
        // console.log(error);
        res.render('signin',{
            msg:error
        })
    }
    
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    res.redirect('/')
})
module.exports=router