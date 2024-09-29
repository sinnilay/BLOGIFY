const {Schema,model} = require("mongoose")
const {createHmac, randomBytes} = require('crypto')
const {CreateTokenforUser} = require('../Services/Authentication')
const UserSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
       type:String,
      
    },
    password:{
        type:String,
        unique:true,
        required:true
    },
    ProfileimageUrl:{
        type:String,
        default:"/images/default.png"
    },
    role:{
        type:String,
        enum:["USER","ADMIN"]
    }
  


},{timestamps:true})



UserSchema.pre('save',function (next){
    const user = this
    if(!user.isModified('password')) return

    const salt =randomBytes(16).toString()
    const hashedPassword = createHmac('sha256',salt)
    .update(user.password)
    .digest("hex")

    this.salt=salt;
    this.password=hashedPassword

    next()

})

UserSchema.static('matchpasswordandGenratetoken',async function (email,password) {
    const user= await this.findOne({email})
    if (!user) throw new Error("USER NOT FOUND")
    const salt = user.salt
    const hashedPassword=user.password
    
    const userprovidedpassword=createHmac('sha256',salt)
    .update(password)
    .digest("hex")

    if(userprovidedpassword!==hashedPassword) throw new Error("PASSWORD NOT MATCHED")
  
    else {
        const token = CreateTokenforUser(user)
        return token
    }
})
const User=model('user',UserSchema)

module.exports=User