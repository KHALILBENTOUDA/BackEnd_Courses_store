const User=require('../models/User')
const HttpStatusText=require('../utils/HttpStatusText')
const asyncWpper=require('../middlewares/asyncRapper')
const jwt=require('jsonwebtoken')
const crypto=require('bcrypt')
const generateJWT=require('../utils/genrateJWT')
const AppError = require('../utils/AppError')



const getAllusers=asyncWpper(async(req,res,next)=>{

        const query=req.query
        const limit=query.limit || 8;
        const page=query.page || 1;
        const skip=(page-1)*limit;
        const users=await User.find({},{'__v':false,"password":false}).limit(limit).skip(skip)
    
        if(!users){
            return next(new AppError('ser not found!',HttpStatusText.FAIL,400))
        }

        res.status(200).json({
            status:HttpStatusText.SUCCESS,
            data:{users},
            code:200
        })
    }
)

const register=asyncWpper(async(req,res,next)=>{
    const {firstName,lastName,email,password,role}=req.body;

    const olduser=await User.findOne({email:email},{})

    if(olduser){
        const error=new AppError('user already exists',HttpStatusText.FAIL,400)
        return next(error)
    }

    const hashPassword=await crypto.hash(password,10)

    const newUser=new User({
        firstName,
        lastName,
        email,
        password:hashPassword,
        role,
        // avatar:req.file.filename
    })
    
    const token=await generateJWT({email:newUser.email,id:newUser._id,role:newUser.role})
    newUser.token=token;
    await newUser.save()


    res.status(201).json({
        status:HttpStatusText.SUCCESS,
        data:{user:newUser}
    })
    
}
)

const login=asyncWpper(async(req,res,next)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return next (new AppError('email and password are required',HttpStatusText.FAIL,400))
    }

    const user= await User.findOne({email:email})

    if(!user){
        return next(new AppError('user not found',HttpStatusText.FAIL,400))
    }

    // match

    const pass=user.password
    const matchpassword= await crypto.compare(password,pass)

    if(email && matchpassword){
        const token=await generateJWT({email:user.email,id:user._id,role:user.role})
        return res.status(200).json({
            status:HttpStatusText.SUCCESS,
            data:{
                token:token
            },
            code:200
        })
    }else{
        return next( new AppError(' email or password is not correct',HttpStatusText.FAIL,500))
    }
}
)
module.exports={
    getAllusers,
    login,
    register,
}