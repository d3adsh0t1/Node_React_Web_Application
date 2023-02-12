const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Schema for user database
const userSchema = new mongoose.Schema( {
   
    firstname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
   
})

// generte auth token 
userSchema.methods.generateAuthToken = async function(){

    const user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    

}

// searching user in database using email
userSchema.statics.findByCredentials = async(email,password) => {
    const user = await User.findOne({email})
   // console.log(user)
    if(!user)
     throw new Error('unable to login')
    
    const isMatch = await bcrypt.compare(password,user.password) 

    if(!isMatch)
    throw new Error('unable to login')
 
    return user 
} 

// hashing password
userSchema.pre('save',async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})

const User = mongoose.model('User',userSchema)
module.exports = User