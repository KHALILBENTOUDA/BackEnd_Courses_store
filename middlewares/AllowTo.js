const AppError = require("../utils/AppError")
const HttpStatusText=require('../utils/HttpStatusText')


module.exports =(...roles)=>{

    return(req,res,next) =>{
        if(!roles.includes(req.curentUser.role)){
             return next(new AppError('this role in not authorized',HttpStatusText.FAIL,401))
        }

    }
}