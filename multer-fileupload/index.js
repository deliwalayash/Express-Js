const express = require('express')
const app = express()
const port = 3000
const multer  = require('multer')
const path=require('path')
 
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage})


app.get('/',(req,res)=>{
    res.render("form.ejs")
})

app.post('/submitform',upload.single('userfile'),(req,res)=>{
    res.send(req.file)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
