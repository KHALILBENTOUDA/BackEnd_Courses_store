const express = require('express');
const routes=express.Router()
const courseController=require('../controllers/courseController');
const tokenVerify = require('../middlewares/tokenVerify');
const userRole=require('../utils/userRole');
const AllowTo = require('../middlewares/AllowTo');

routes.route('/')
            .get(courseController.get_All_Courses)
            .post(tokenVerify,AllowTo(userRole.MANAGER),courseController.Create_Course)

routes.route('/:id')
            .get(courseController.get_Course)
            .patch(tokenVerify,courseController.update_Course)
            .delete(tokenVerify,AllowTo(userRole.ADMIN,userRole.MANAGER),courseController.Delete_Course)

module.exports=routes