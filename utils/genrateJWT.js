const jwt=require('jsonwebtoken')
module.exports=async(paylod)=>{
    console.log(paylod)
    const token=await jwt.sign(
        paylod,
        process.env.JWT_SECRET_KEY,
       {expiresIn:'10m'}
       )
    return token;
}