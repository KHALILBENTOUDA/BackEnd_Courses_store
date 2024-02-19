const Course=require('../models/Course')
const HttpStatusText=require('../utils/HttpStatusText')
const asyncWapper=require('../middlewares/asyncRapper')
const AppError = require('../utils/AppError')




const get_All_Courses=asyncWapper(async(req,res)=>{

    const query=req.query
    const limit=query.limit || 8;
    const page=query.page || 1;
    const skip=(page-1)*limit;
    const courses=await Course.find({},{'__v':false}).limit(limit).skip(skip)

    if(!courses){
        return next(new AppError('there is no course',HttpStatusText.FAIL,400))
    }

    res.status(200).json({
        status:HttpStatusText.SUCCESS,
        data:{courses},
        code:200
    })
}
)


const get_Course=asyncWapper(async(req,res,next)=>{
        const course = await Course.findById(req.params.id);
        if(!course){ 
            return next(new AppError('course not found',HttpStatusText.FAIL,400))
        }

        res.status(200).json({
            status:HttpStatusText.SUCCESS,
            data:{course},
            code:200
        })
    }
)


const Create_Course=asyncWapper(async(req,res)=>{
    const newCourse= new Course(req.body)
    await newCourse.save()
    res.status(201).json({
        status:HttpStatusText.SUCCESS,
        data:{course:newCourse},
        code:201
    })
}
)


const update_Course=asyncWapper(async(req,res)=>{
        
            const courseid=req.params.id
            const update=await Course.updateOne({_id:courseid},{$set:{...req.body}})

            if(!update){
                return next(new AppError('update is not complet',HttpStatusText.FAIL,400))
            }

            return res.status(200).json(
                {
                    status:HttpStatusText.SUCCESS,
                    code:200,
                    data:{update},
                    
                }
            )
    }
)


const Delete_Course=asyncWapper(async(req,res)=>{
    await Course.deleteOne({_id:req.params.id})
    res.status(200).json({
        status:HttpStatusText.SUCCESS,
        data:null
    })
}
)



module.exports={
    get_All_Courses,
    get_Course,
    Create_Course,
    update_Course,
    Delete_Course,
}