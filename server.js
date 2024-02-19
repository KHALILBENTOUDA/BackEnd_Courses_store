require('dotenv').config()
const express = require('express');
const courseRoutes=require('./routes/CourseRoutes')
const userRoutes=require('./routes/UserRoutes')
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const HttpStatusText=require('./utils/HttpStatusText')
const AppError=require('./utils/AppError')
const cors=require('cors');
const path = require('path');
const app=express()

const url= process.env.MONGO_URL
const port=process.env.PORT

app.use(express.json())
app.use(cors())

app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/api/course',courseRoutes)
app.use('/api/user',userRoutes)

mongoose.connect(url).then(()=>{
    console.log('database is connected secsessfuly!')
})

// globall error for not found
app.all('*',(req,res,next)=>{
    next(new AppError('This ressource is not available',HttpStatusText.ERORR,404))
})

// global error handler

app.use((error,req,res,next)=>{
    res.status(error.statusCode || 500).json({
        status:error.status,
        message:error.message,
        statusCode:error.statusCode,
    })
})

app.listen(port,()=>{
    console.log('servre runing in prort',port)
})