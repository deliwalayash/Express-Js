const jwt=require('jsonwebtoken')
const auth = (req,res,next)=>{

    try{
        const authHeader= req.headers.authorization
        if(!authHeader){
            return res.status(500).json({
               success:false,
               message:"No toekn Provided" 
            })
        }

        const token =authHeader.split(" ")[1]
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user=decoded
        next()
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Invalid or expired Token"
        })

    }
}

module.exports = auth