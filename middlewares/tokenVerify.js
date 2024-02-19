const jwt=require('jsonwebtoken')
const HttpStatusText=require('../utils/HttpStatusText')
const AppError = require('../utils/AppError')

const tokenVerify=(req,res,next)=>{
    const authheader=req.headers['Authorization'] || req.headers['authorization']
    if(!authheader){
        return next(new AppError('token is require',HttpStatusText.FAIL,401))
        // return res.status(401).json({
        //     status:HttpStatusText.FAIL,
        //     message:'token is required'
        // })
    }
    const token=authheader.split(' ')[1];
    try{
        // verify token for login
        jwt.verify(token,process.env.JWT_SECRET_KEY)

    }catch(e){
        return next(new AppError('invalid token',HttpStatusText.FAIL,401))
        // return res.status(401).json({
        //     status:HttpStatusText.ERORR,
        //     message:'invalid token'
            
        // })
    }
    next()
}
module.exports=tokenVerify