const express=require('express')
const routes=require('./routes/routes')
const app=express()

app.use('/api',routes)
app.get('/', (req, res) => {
    res.send("<h1>Hello world</h1>")
})

app.get("/crash", (req, res, next) => {
  next(new Error("Server crashed intentionally!"));
});

app.use((err,req,res,next)=>{
  console.log("Error:", err.message)
  res.status(500).json({
    success:false,
    message:err.message
  })
})





app.listen(8000)
