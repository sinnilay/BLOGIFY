const {Router} = require('express')
const User = require("../models/user")
const router = Router()
const sendmail = require("../Services/SendMail.js")
const validator = require('validator');

router.get('/signin',(req,res)=>{
    res.render('signin')
})

router.get('/signup',(req,res)=>{
    res.render('signup')
})

// router.post ('/signup', async(req,res)=>{
//     const {fullname,email,password} = req.body
//     try {
//         const user= await User.create({
//             fullname,
//             email,
//             password
//         })
//         // console.log(user);
//         res.render("signup",{
//             msg:"ACOOUNT CREATED SUCCESSFULLY"
//         })
//         // res.redirect('/')
//     } catch (error) {
//         res.render('signup',{
//             msg:error
//         })
//     }
    
// })
router.post('/signup', async (req, res) => {
    const { fullname, email, password } = req.body;

    // Validate email format
    if (!validator.isEmail(email)) {
        return res.render('signup', {
            msg: "Invalid email format",
        });
    }

    try {
        // Attempt to send the email
        await sendmail(email);

        // If email is sent successfully, create the user
        const user = await User.create({
            fullname,
            email,
            password,
        });

        console.log(user);
        res.render("signup", {
            msg: "ACCOUNT CREATED SUCCESSFULLY",
        });
    } catch (error) {
        // Handle any errors (either from sendmail or user creation)
        console.error("Error:", error);
        res.render('signup', {
            msg: error.message || "An error occurred",
        });
    }
});

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