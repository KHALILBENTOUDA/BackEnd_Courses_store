const express = require('express');
const routes=express.Router()
const userController=require('../controllers/userController')
const tokenVerify=require('../middlewares/tokenVerify')
const multer=require('multer')

const diskStorage=multer.diskStorage({
    destination:function(req,file,cb){
        console.log(file)
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        const ext=file.mimetype.split('/')[1];
        const fileName=`user-${Date.now()}.${ext}`
        cb(null,fileName)
    }
})

const filefilter=(req,file,cb)=>{
    const imageType=file.mimetype.split('/')[0];
    if(imageType =='image'){
        return cb(null,true)
    }else{
        return cb(new AppError('this file is not image',HttpStatusText.FAIL,400),false)
    }
}

const upload=multer({
    storage:diskStorage,
    filefilter
})

routes.route('/')
            .get(userController.getAllusers)
routes.route('/login')
            .get(userController.login)
routes.route('/register')
            .post(upload.single('avatar'),userController.register)

module.exports=routes