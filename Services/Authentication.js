const JWT = require('jsonwebtoken')
const secret = "Superman@123"

function CreateTokenforUser(user){
   const payload ={
    id:user._id,
    email:user.email,
    name:user.fullname,
    profileImageUrl:user.ProfileimageUrl,
    role:user.role,
};

   const token = JWT.sign(payload,secret)
   return token
}

function validatetoken(token){
    const payload =JWT.verify(token,secret)
    return payload
}

module.exports={
    CreateTokenforUser,
    validatetoken
}