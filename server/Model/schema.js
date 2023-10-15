const mongoose =require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

})
const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true
    },
    used:{
        type:Boolean,
        required:true,
        default:false
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

const User = mongoose.model("User", userSchema);
const Otp = mongoose.model("Otp", otpSchema);

module.exports = { User, Otp };