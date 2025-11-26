const express=require('express')
const routes=express.Router()

routes.get('/',(req,res)=>{
    res.send("<h1>Hello world</h1>")
})

const auth=(req,res,next) =>{
    console.log("I am inside auth wala middle weare")
    req.user ={userId:1,role:"admin"}
    if(req.user){
        next()
    }
    else{
        res.json({
            success:false,
            message:"Not a valid user"
        })
    } 
}

const isStudent= (req,res,next)=>{
    console.log("I am inside studentwala middleeware")

    if(req.user.role =="student"){
        next()
    }
    else{
        res.json({
            success:false,
            message:"access denied,this rout is only for student"
        })
    }
}

const isAdmin = (req,res,next)=>{
    console.log("I am inside Adminwala middleware")
    if(req.user.role =="admin"){
        next()
    }
    else{
        res.json({
            success:false,
            message:"Access denied:THis route is only for admin"
        })
    }
}

routes.get('/student',auth,isStudent,(req,res)=>{
    console.log("I am inside student route")
    res.send("Student Specific Page")
})
routes.get('/admin',auth,isAdmin,(req,res)=>{
    console.log("I am inside Admin route")
    res.send("Admin Specific Page")
})
routes.use((err,req,res,next)=>{
  console.log("Error:", err.message)
  res.status(500).json({
    success:false,
    message:err.message
  })
})


module.exports=routes