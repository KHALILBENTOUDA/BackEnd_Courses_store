class AppError extends Error{
    constructor(message,statusText,statusCode){
        super()
        this.message=message
        this.status=statusText,
        this.statusCode=statusCode
        
    }
}
module.exports= AppError