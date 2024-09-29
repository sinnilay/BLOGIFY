const {validatetoken} = require("../Services/Authentication")

function CheckForSignin(cookiename){
    return (req,res,next)=>{
        const tokenvalue = req.cookies[cookiename];
        if (!tokenvalue)  return next()
        try {
            const payload=validatetoken(tokenvalue)
            req.user=payload
            return next()
        } catch (error) {
            
        }
       return next()
    }
}

module.exports=CheckForSignin;