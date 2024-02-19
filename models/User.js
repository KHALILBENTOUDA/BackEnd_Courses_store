const mongoose=require('mongoose')
const validator=require('validator')
const userRole=require('../utils/userRole')

const schema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,'filed must be valid email adress']
    },
    password:{
        type:String,
        required:true,
    },
    token:{
        type:String,
    },
    role:{
        type:String,
        enum:[userRole.USER,userRole.ADMIN,userRole.MANAGER],
        default:userRole.USER
    },
    avatar:{
        type:String,
        default:'uploads/profile.png'
    }

})

module.exports= mongoose.model('User',schema)